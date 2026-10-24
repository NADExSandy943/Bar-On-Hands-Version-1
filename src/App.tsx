import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES, Product } from './data/catalog';
import { ScrollBottleHero } from './components/ScrollBottleHero';

interface CartItem extends Product {
  qty: number;
}

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(PRODUCTS.map(p => [p.id, 1]))
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const formatINR = (val: number) =>
    '₹' + val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (product: Product, customQty?: number) => {
    const qty = customQty ?? quantities[product.id] ?? 1;
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, qty }];
    });
    triggerToast(`Added ${qty} × ${product.name} to cart`);
  };

  const toggleWish = (id: string) => {
    setWishlist(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    if (!matchesSearch) return false;
    if (activeFilter === 'all') return p.section === 'deals' || Boolean(q);
    if (activeFilter === 'Deals') return p.section === 'deals' || Boolean(p.oldPrice);
    return p.category.toLowerCase() === activeFilter.toLowerCase();
  });

  const renderProductCard = (p: Product) => {
    const qty = quantities[p.id] || 1;
    const isWished = wishlist.includes(p.id);
    return (
      <div
        key={p.id}
        className="relative rounded-3xl border border-neutral-200 bg-white p-4 flex flex-col justify-between shadow-sm hover:shadow-xl transition"
      >
        {p.badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#E50914] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
            {p.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWish(p.id)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-sm"
        >
          {isWished ? '❤️' : '🤍'}
        </button>

        <div>
          {p.image ? (
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-2xl mb-3 bg-neutral-900" />
          ) : (
            <div className="w-full h-40 rounded-2xl mb-3 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-5xl">
              {p.emoji || '🥃'}
            </div>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{p.category}</span>
          <h3 className="font-bold text-sm text-neutral-900 mt-0.5 min-h-[40px]">{p.name}</h3>
          <div className="mt-2">
            {p.oldPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-neutral-400 line-through">{formatINR(p.oldPrice)}</span>
                <span className="text-base font-extrabold text-[#E50914]">{formatINR(p.price)}</span>
              </div>
            ) : (
              <div className="text-base font-extrabold text-neutral-900">{formatINR(p.price)}</div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 space-y-2.5">
          <div className="flex items-center justify-between border border-neutral-300 rounded-full px-3 py-1 text-xs font-bold text-neutral-900">
            <button
              type="button"
              onClick={() => setQuantities(q => ({ ...q, [p.id]: Math.max(1, (q[p.id] || 1) - 1) }))}
              className="w-6 h-6 rounded-full hover:bg-neutral-100"
            >
              −
            </button>
            <span>{qty}</span>
            <button
              type="button"
              onClick={() => setQuantities(q => ({ ...q, [p.id]: (q[p.id] || 1) + 1 }))}
              className="w-6 h-6 rounded-full hover:bg-neutral-100"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => addToCart(p)}
            className="w-full bg-black hover:bg-[#E50914] text-white font-bold py-2.5 rounded-full text-xs transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* 1. Top 4-Color Utility Strip */}
      <div className="w-full text-xs font-medium text-white grid grid-cols-1 md:grid-cols-4">
        <div className="bg-[#6B7F5E] px-4 py-2 flex items-center justify-center md:justify-start gap-4">
          <span>About Us</span>
          <span>|</span>
          <span>Customer Support: 8882529191</span>
        </div>
        <div className="bg-[#1F4E5B] px-4 py-2 text-center">Late-Night Express Delivery</div>
        <div className="bg-[#D95338] px-4 py-2 text-center">
          Shop on the go, download our app.{' '}
          <button type="button" onClick={() => scrollToSection('#app-download-section')} className="underline font-semibold">
            Details
          </button>
        </div>
        <div className="bg-[#F29F67] text-neutral-900 px-4 py-2 flex items-center justify-center md:justify-end gap-4 font-semibold">
          <button
            type="button"
            onClick={() => setReducedMotion(!reducedMotion)}
            className="px-2.5 py-0.5 rounded-full bg-black/15 text-[11px]"
          >
            {reducedMotion ? 'Scroll Anim: REDUCED' : 'Scroll Anim: ON'}
          </button>
          <span>Log In</span>
        </div>
      </div>

      {/* 2. Sticky Header & White Nav */}
      <header className="sticky top-0 z-50 shadow-2xl">
        <div className="bg-black text-white border-b border-neutral-800 px-4 lg:px-10 py-3.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center gap-2 text-xs"
              >
                <span>🛒 Cart</span>
                <span className="bg-[#E50914] text-white font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
              </button>
              <span className="text-xs text-neutral-400">❤️ {wishlist.length}</span>
            </div>

            <a href="#hero-scroll-section" className="text-2xl md:text-3xl font-extrabold tracking-wider uppercase font-cinzel">
              Bar On Hands
            </a>

            <div className="w-full sm:w-auto max-w-xs flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a nice booze for yourself"
                className="w-full bg-neutral-900 text-white placeholder-neutral-400 text-sm rounded-full px-4 py-2 border border-neutral-700 focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>
        </div>

        <nav className="bg-white text-neutral-900 border-b border-neutral-200 px-4 py-2.5 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-6 md:gap-8 text-xs md:text-sm font-semibold whitespace-nowrap">
            {['Deals', 'all', 'Liquor', 'Food', 'Snacks', 'Beverages', 'Smokes'].map(f => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setActiveFilter(f);
                  scrollToSection('#best-deals-section');
                }}
                className={`hover:text-[#E50914] transition ${activeFilter === f ? 'text-[#E50914] font-extrabold' : ''}`}
              >
                {f === 'all' ? 'Shop All' : f}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* 3. Scroll-Driven Bottle Animation Hero */}
      <ScrollBottleHero
        reducedMotion={reducedMotion}
        onAddReserveBottle={() => addToCart(PRODUCTS[0], 1)}
        onScrollToSection={scrollToSection}
      />

      {/* 4. Best Deals Section */}
      <section id="best-deals-section" className="bg-white text-neutral-900 py-14 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8">Best Deals on Liquor and More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredProducts.map(renderProductCard)}
          </div>
        </div>
      </section>

      {/* 5. Explore Our Categories (2x4 Arched Grid) */}
      <section className="bg-neutral-50 text-neutral-900 py-16 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Explore Our Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  setActiveFilter(cat.filter);
                  scrollToSection('#best-deals-section');
                }}
                className="group text-center flex flex-col items-center"
              >
                <div className="w-full overflow-hidden category-arch shadow-md border-2 border-neutral-200 group-hover:border-[#E50914] transition">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-full h-44 object-cover category-arch" />
                  ) : (
                    <div className="w-full h-44 category-arch bg-neutral-900 flex items-center justify-center text-6xl">
                      {cat.emoji}
                    </div>
                  )}
                </div>
                <h3 className="font-extrabold text-base text-neutral-900 mt-3">{cat.name}</h3>
                <p className="text-xs text-neutral-500">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Most Popular Items */}
      <section id="most-popular-section" className="bg-white text-neutral-900 py-16 px-4 lg:px-10 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-[#E50914]">Best sellers</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1 mb-10">Most Popular Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PRODUCTS.filter(p => p.section === 'popular').map(renderProductCard)}
          </div>
        </div>
      </section>

      {/* 7. Shop Fresh Finds */}
      <section className="bg-neutral-50 text-neutral-900 py-16 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">Shop Fresh Finds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PRODUCTS.filter(p => p.section === 'fresh').map(renderProductCard)}
          </div>
        </div>
      </section>

      {/* 8. App Download Banner */}
      <section id="app-download-section" className="bg-[#FACC15] text-neutral-900 py-14 px-4 lg:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest">Shop Easy and Convenient</p>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-1 mb-4">Download Our App Now</h2>
          <p className="max-w-2xl mx-auto text-neutral-800 mb-6">
            Get access to our exclusive deals and discounts, and shop from the comfort of your home or on the go.
          </p>
        </div>
      </section>

      {/* 9. Premium Subscription Banner */}
      <section className="relative bg-black text-white py-20 px-4 lg:px-10 overflow-hidden text-center">
        <img
          src="/assets/images/bar_shelves.webp"
          alt="Bar Shelves"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#A3E635]">Subscribe to Our Premium Version</h2>
          <div className="text-5xl md:text-7xl font-black text-[#A3E635] my-2">20% off</div>
          <p className="text-xl font-semibold mb-6">Your Next Order</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              triggerToast(`Subscribed ${subscribedEmail} for 20% OFF!`);
              setSubscribedEmail('');
            }}
            className="max-w-md mx-auto flex gap-3"
          >
            <input
              type="email"
              required
              value={subscribedEmail}
              onChange={(e) => setSubscribedEmail(e.target.value)}
              placeholder="Enter your email here *"
              className="flex-1 bg-black/80 text-white px-4 py-3 rounded-full border border-neutral-600 text-sm"
            />
            <button type="submit" className="bg-[#E50914] text-white font-bold px-6 py-3 rounded-full text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-[#2B2B2B] text-neutral-300 py-10 px-4 text-center text-xs">
        <p className="font-bold text-white text-base mb-2">Bar On Hands — Helpline: 8882529191</p>
        <p className="mb-2">Accepted Payments: Mastercard • Google Pay • UPI • PhonePe • Discover • VISA • CRED • Cash On Delivery</p>
        <p>© 2024 by Bar On Hands.</p>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
          <div className="bg-neutral-950 text-white w-full max-w-md h-full p-6 flex flex-col justify-between border-l border-neutral-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <h3 className="text-lg font-extrabold">Your Cart ({totalItems})</h3>
                <button type="button" onClick={() => setCartOpen(false)}>✕</button>
              </div>
              <div className="my-4 space-y-3 max-h-[65vh] overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-neutral-900 p-3 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-bold">{item.name}</h4>
                      <p className="text-xs text-amber-400">{formatINR(item.price)} × {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-neutral-800 pt-4">
              <div className="flex justify-between font-extrabold text-lg mb-4">
                <span>Total</span>
                <span className="text-amber-400">{formatINR(totalPrice)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCart([]);
                  setCartOpen(false);
                  triggerToast('Order placed! Express Night Delivery dispatched.');
                }}
                className="w-full bg-[#E50914] py-3.5 rounded-full font-bold text-sm"
              >
                Place Instant Night Order
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-900 text-white border border-amber-500/50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold">
          {toast}
        </div>
      )}
    </div>
  );
}
