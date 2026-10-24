import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 60;

interface ScrollBottleHeroProps {
  reducedMotion: boolean;
  onAddReserveBottle: () => void;
  onScrollToSection: (selector: string) => void;
}

export const ScrollBottleHero: React.FC<ScrollBottleHeroProps> = ({
  reducedMotion,
  onAddReserveBottle,
  onScrollToSection
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [renderMode, setRenderMode] = useState<'canvas' | 'video'>('canvas');

  // Preload 60 WebP frames extracted from the 1080p reference animation
  useEffect(() => {
    const loaded: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, '0');
      img.src = `/assets/frames/frame_${padded}.webp`;
      img.onload = () => {
        if (i === 1) drawFrame(0);
      };
      loaded.push(img);
    }
    imagesRef.current = loaded;
  }, []);

  const drawFrame = (index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    setCurrentFrame(clamped);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[clamped];
    if (ctx && img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    if (reducedMotion || renderMode === 'video') {
      ScrollTrigger.getAll().forEach(t => t.kill());
      drawFrame(TOTAL_FRAMES - 1);
      return;
    }

    const playhead = { frame: 0 };
    const ctx = gsap.context(() => {
      const tween = gsap.to(playhead, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        onUpdate: () => drawFrame(playhead.frame)
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: '+=2800',
        pin: true,
        scrub: 0.35,
        animation: tween
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [reducedMotion, renderMode]);

  const progressPct = Math.round((currentFrame / (TOTAL_FRAMES - 1)) * 100);
  const activeStage = progressPct < 25 ? 0 : progressPct < 52 ? 1 : progressPct < 78 ? 2 : 3;

  return (
    <section id="hero-scroll-section" className="relative w-full bg-[#040404]">
      <div
        ref={wrapperRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
      >
        {renderMode === 'canvas' ? (
          <canvas
            ref={canvasRef}
            width={960}
            height={540}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src="/assets/whiskey_bottle_animation_1080p.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Cinematic Vignettes */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/65" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Interactive Animation Control HUD */}
        <div className="absolute top-4 left-4 right-4 md:right-auto z-20 glass-panel rounded-2xl px-4 py-3 max-w-md">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold">
              Scroll-Driven 3D Sequence
            </span>
            <span className="text-[11px] font-mono text-neutral-300 bg-white/10 px-2 py-0.5 rounded">
              Frame {String(currentFrame + 1).padStart(2, '0')} / {TOTAL_FRAMES} ({progressPct}%)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={TOTAL_FRAMES - 1}
              value={currentFrame}
              onChange={(e) => drawFrame(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-neutral-700 rounded-lg"
            />
            <button
              type="button"
              onClick={() => setRenderMode(renderMode === 'canvas' ? 'video' : 'canvas')}
              className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs whitespace-nowrap transition"
            >
              {renderMode === 'canvas' ? '1080p Video Mode' : 'Scroll Scrub Mode'}
            </button>
          </div>
        </div>

        {/* Stage 0 (0-25%): Opening Box & Main Hero Headline */}
        {activeStage === 0 && (
          <div className="absolute inset-x-4 md:left-12 md:right-auto bottom-14 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 max-w-lg">
            <div className="glass-panel p-6 md:p-8 rounded-3xl amber-glow">
              <p className="text-amber-400 text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-2">
                Introducing Bar On Hands
              </p>
              <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                Your One-Stop Shop for Late-Night Liquor, Eatables, Smokes &amp; Hookahs
              </h1>
              <p className="text-neutral-300 text-sm md:text-base mb-6">
                Get the Best Deals on Your Favorite Brands — featuring our signature{' '}
                <strong className="text-amber-300">Bar On Hands 12-Year Aged Reserve</strong>.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onScrollToSection('#best-deals-section')}
                  className="bg-[#E50914] hover:bg-[#C40710] text-white font-bold px-7 py-3 rounded-full text-sm transition shadow-lg"
                >
                  Shop Now
                </button>
                <button
                  type="button"
                  onClick={onAddReserveBottle}
                  className="bg-white/10 hover:bg-white/20 border border-amber-400/40 text-amber-300 font-semibold px-5 py-3 rounded-full text-sm transition"
                >
                  Reserve 12Y Bottle — ₹4,800
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 1 (26-52%): Uncaged Craftsmanship */}
        {activeStage === 1 && (
          <div className="absolute inset-x-4 md:left-auto md:right-12 bottom-14 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 max-w-md">
            <div className="glass-panel p-6 md:p-7 rounded-3xl border-amber-500/30">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                01 // Uncaged Craftsmanship
              </span>
              <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-2">
                3D Silver Stag Emblem &amp; Twin-Wing Vault
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                As the matte obsidian presentation doors sweep back, atmospheric smoke and warm golden embers frame the heavy-base decanter and its sculpted metallic antler crest.
              </p>
            </div>
          </div>
        )}

        {/* Stage 2 (53-78%): Dynamic Levitation */}
        {activeStage === 2 && (
          <div className="absolute inset-x-4 md:left-12 md:right-auto bottom-14 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 max-w-md">
            <div className="glass-panel p-6 md:p-7 rounded-3xl border-amber-500/30">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                02 // Suspended in Amber Light
              </span>
              <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-2">
                Dynamic 22° Levitation &amp; Liquid Refraction
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Lifting off the reflective obsidian plinth, light refracts through the deep mahogany spirit while volumetric smoke ribbons curl in slow motion behind the bottle.
              </p>
            </div>
          </div>
        )}

        {/* Stage 3 (79-100%): Macro Label Close-up */}
        {activeStage === 3 && (
          <div className="absolute inset-x-4 md:left-auto md:right-12 bottom-14 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 max-w-md">
            <div className="glass-panel p-6 md:p-7 rounded-3xl amber-glow">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                03 // The Signature Label
              </span>
              <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-2">
                BAR ON HANDS — Aged 12 Years
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed mb-5">
                Macro close-up on the brushed parchment neck and belly labels. Ready for instant late-night doorstep delivery alongside our full catalog below.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onAddReserveBottle}
                  className="bg-[#E50914] hover:bg-[#C40710] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition"
                >
                  Add 12Y Reserve (₹4,800)
                </button>
                <button
                  type="button"
                  onClick={() => onScrollToSection('#best-deals-section')}
                  className="bg-white text-black hover:bg-neutral-200 font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition"
                >
                  Explore Full Store ↓
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-4 inset-x-4 md:inset-x-12 z-20 flex items-center justify-between gap-4">
          <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-[#E50914] to-amber-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => onScrollToSection('#best-deals-section')}
            className="text-xs text-neutral-300 hover:text-white bg-black/60 px-3 py-1.5 rounded-full border border-white/15"
          >
            Skip to Catalog ↓
          </button>
        </div>
      </div>
    </section>
  );
};
