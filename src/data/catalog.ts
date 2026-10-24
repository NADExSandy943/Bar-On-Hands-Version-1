export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number | null;
  section: 'deals' | 'popular' | 'fresh';
  category: 'Liquor' | 'Snacks' | 'Beverages' | 'Smokes' | 'Food';
  badge?: string | null;
  image?: string;
  emoji?: string;
}

export interface CategoryItem {
  name: string;
  filter: string;
  desc: string;
  image?: string;
  emoji?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'bar-on-hands-12y',
    name: 'Bar On Hands 12Yr Reserve Scotch (Presentation Box)',
    price: 4800.00,
    oldPrice: 5400.00,
    section: 'deals',
    category: 'Liquor',
    badge: 'Signature 12Y',
    image: '/assets/images/bottle_closeup.webp'
  },
  {
    id: 'lays-flamin-hot',
    name: "Lay's Flamin' Hot",
    price: 20.00,
    oldPrice: null,
    section: 'deals',
    category: 'Snacks',
    badge: null,
    emoji: '🌶️🥔'
  },
  {
    id: 'sprite-can-300',
    name: 'Sprite Can 300ml',
    price: 50.00,
    oldPrice: null,
    section: 'deals',
    category: 'Beverages',
    badge: null,
    emoji: '🥤🍋'
  },
  {
    id: 'pepsi-2l',
    name: 'Pepsi 2L',
    price: 100.00,
    oldPrice: null,
    section: 'deals',
    category: 'Beverages',
    badge: null,
    emoji: '🍾🧊'
  },
  {
    id: 'black-dog-750',
    name: 'Black Dog 750ml',
    price: 2250.00,
    oldPrice: 2500.00,
    section: 'deals',
    category: 'Liquor',
    badge: 'Save ₹250',
    image: '/assets/images/bottle_box_open.webp'
  },
  {
    id: 'ballantines-750',
    name: "Ballantine's Blended Scotch Whisky 750ml.",
    price: 3500.00,
    oldPrice: null,
    section: 'deals',
    category: 'Liquor',
    badge: null,
    image: '/assets/images/bottle_closeup.webp'
  },
  // Most Popular Items
  {
    id: 'golden-maple-hookah',
    name: 'Golden Maple Hookah Premium',
    price: 2500.00,
    oldPrice: null,
    section: 'popular',
    category: 'Smokes',
    badge: 'Best Seller',
    image: '/assets/images/hookah_promo.webp'
  },
  {
    id: 'organic-smokes',
    name: 'Organic Smokes',
    price: 488.70,
    oldPrice: 543.00,
    section: 'popular',
    category: 'Smokes',
    badge: '10% Off',
    emoji: '🌿🚬'
  },
  {
    id: 'preroll-pack',
    name: 'Joint 👌😤☁️',
    price: 1000.00,
    oldPrice: null,
    section: 'popular',
    category: 'Smokes',
    badge: 'Popular',
    emoji: '👌☁️'
  },
  {
    id: 'gold-flake-lights',
    name: 'Gold Flake Lights',
    price: 320.00,
    oldPrice: null,
    section: 'popular',
    category: 'Smokes',
    badge: null,
    emoji: '✨🚬'
  },
  {
    id: 'rich-mond-cigs',
    name: 'Rich Mond Cigarettes',
    price: 500.00,
    oldPrice: null,
    section: 'popular',
    category: 'Smokes',
    badge: null,
    emoji: '🎩🚬'
  },
  // Shop Fresh Finds
  {
    id: 'dairy-milk-35',
    name: 'Dairy Milk Bar 35%',
    price: 50.00,
    oldPrice: null,
    section: 'fresh',
    category: 'Food',
    badge: 'Most Popular',
    emoji: '🍫✨'
  },
  {
    id: 'dark-choc-35',
    name: 'Dark Chocolate Bar 35%',
    price: 145.50,
    oldPrice: 150.00,
    section: 'fresh',
    category: 'Food',
    badge: 'Sale',
    emoji: '🍫🌙'
  },
  {
    id: 'ice-cream-5pc',
    name: 'Ice Cream Variety Pack, 5 pc.',
    price: 250.00,
    oldPrice: null,
    section: 'fresh',
    category: 'Food',
    badge: null,
    emoji: '🍨🍧'
  },
  {
    id: 'navel-orange-1lb',
    name: 'Navel Orange - 1lb',
    price: 50.00,
    oldPrice: null,
    section: 'fresh',
    category: 'Food',
    badge: 'Most Popular',
    emoji: '🍊🍃'
  },
  {
    id: 'banana-bunch-1lb',
    name: 'Banana Bunch - 1lb',
    price: 30.00,
    oldPrice: null,
    section: 'fresh',
    category: 'Food',
    badge: null,
    emoji: '🍌🌴'
  }
];

export const CATEGORIES: CategoryItem[] = [
  { name: 'Liquor', filter: 'Liquor', desc: '12Y Scotch, Bourbon & Vodka', image: '/assets/images/bottle_closeup.webp' },
  { name: 'Eatables', filter: 'Food', desc: 'Late-Night Bites & Chocolates', emoji: '🍫🍕' },
  { name: 'Smokes', filter: 'Smokes', desc: 'Gold Flake, Organic & Classic', emoji: '🚬🔥' },
  { name: 'Hookahs', filter: 'Smokes', desc: 'Golden Maple & Glowing Coals', image: '/assets/images/hookah_promo.webp' },
  { name: 'Accessories', filter: 'Smokes', desc: 'Engraved Zippo Lighters & Foil', emoji: '🪙🔥' },
  { name: 'Soft Drinks', filter: 'Beverages', desc: 'Chilled Sprite, Pepsi & Mixers', emoji: '🥤🧊' },
  { name: 'Snacks', filter: 'Snacks', desc: 'Haldiram Mixture & Flamin Hot', emoji: '🥨🌶️' },
  { name: 'Mouth Freshners', filter: 'Food', desc: 'Listerine & Mint Drops', emoji: '🌿💧' }
];
