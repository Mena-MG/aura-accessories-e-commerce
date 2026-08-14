// Centralized Mock Data for AURA STUDIOS Accessories Boutique

export const PROMO_CODES = {
  'WELCOME10': { code: 'WELCOME10', discountPercent: 10, label: '10% Welcome Discount' },
  'ACCESS20': { code: 'ACCESS20', discountPercent: 20, label: '20% VIP Access Discount' },
};

export const PICKUP_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Aura Flagship Boutique — Downtown',
    address: '428 Grand Avenue, Suite 102, Fashion District',
    hours: 'Mon – Sat: 10:00 AM – 8:00 PM | Sun: 11:00 AM – 6:00 PM',
    phone: '+1 (555) 019-2831',
    stockStatus: 'Ready for pickup in 2 hours',
    isDefault: true,
  },
  {
    id: 'loc-2',
    name: 'Atelier Lumière — Grand Gallery Mall',
    address: '890 Promenade Blvd, Level 2 (Near North Entrance)',
    hours: 'Mon – Sun: 10:00 AM – 10:00 PM',
    phone: '+1 (555) 019-2832',
    stockStatus: 'Ready for pickup same day',
    isDefault: false,
  },
  {
    id: 'loc-3',
    name: 'Aura Studio & Crafts Workshop',
    address: '15 Artisan Way, Loft 4B',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM',
    phone: '+1 (555) 019-2833',
    stockStatus: 'Ready for pickup next business day',
    isDefault: false,
  }
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Sunlit Pearl & Lemon Charm Keychain',
    price: 28.00,
    originalPrice: 35.00,
    category: 'Charms & Keychains',
    material: 'Pearls & Acrylic',
    color: 'Yellow & Clear',
    image: '/assets/product-yellow-keychain.jpg',
    badge: 'Best Seller',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 24,
    shortDescription: 'Hand-strung keychain featuring iridescent crystal beads, lustrous faux pearls, and whimsical lemon yellow glass accents.',
    description: 'Elevate your handbag or key set with this artisan-crafted charm strap. Designed with hand-strung iridescent faceted crystals, luminous freshwater-style pearls, and vibrant translucent lemon beads. Includes a sleek matte yellow swivel snap hook for effortless attachment.',
    features: [
      'Sturdy stainless steel spring clasp in matte lemon finish',
      'Iridescent light-reflecting faceted crystal beads',
      'Overall length: 16.5 cm (6.5 inches)',
      'Delivered in signature Aura Studio velvet pouch'
    ],
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Ocean Breeze Seashell Charm Bangle',
    price: 45.00,
    originalPrice: 55.00,
    category: 'Bracelets',
    material: 'Enamel & Silver Plated',
    color: 'Ocean Blue',
    image: '/assets/product-ocean-bangle.jpg',
    badge: 'Trending',
    isFeatured: true,
    isBestSeller: true,
    rating: 5.0,
    reviewsCount: 38,
    shortDescription: 'Flexible twisted wire torque bangle adorned with turquoise enamel seashell, pearl heart, and fairy charms.',
    description: 'A coastal dream encapsulated in silver and ocean turquoise. This flexible torque-style bangle features intricate charms: a hand-enameled scalloped seashell studded with micro-pearls, a romantic pearl heart, a silver woodland fairy, and luminous aqua glass beads.',
    features: [
      'Adjustable twisted stainless steel wire fits wrists 6.0" to 7.5"',
      'Hypoallergenic rhodium-plated charms & tarnish-resistant finish',
      'Hand-applied enamel with genuine pearl inlay',
      'Secure end-bead charm keepers'
    ],
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Royal Sapphire Clover Pendant Necklace',
    price: 52.00,
    originalPrice: 65.00,
    category: 'Necklaces',
    material: 'Sterling Silver',
    color: 'Royal Blue',
    image: '/assets/product-sapphire-clover.jpg',
    badge: 'Editor Choice',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 19,
    shortDescription: 'Exquisite four-leaf clover lucky pendant featuring a brilliant royal blue crystal set in pave zirconia.',
    description: 'Channel timeless fortune and elegance with our Royal Sapphire Clover. A deep cobalt faceted crystal forms the signature clover blossom, enveloped in a halo of sparkling pavé cubic zirconia. Suspended on a delicate silver link chain with lobster clasp.',
    features: [
      'Solid 925 Sterling Silver chain & setting',
      'Precision-cut royal sapphire crystal centerpiece',
      'Chain length: 42cm + 5cm extension (16.5" + 2")',
      'Anti-tarnish protective coating'
    ],
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Hawkins Club Beaded Lanyard & Card Case',
    price: 34.00,
    originalPrice: 40.00,
    category: 'Lanyards & Holders',
    material: 'Beaded Strap',
    color: 'Crimson Red',
    image: '/assets/product-hawkins-lanyard.jpg',
    badge: 'Collector Edition',
    isFeatured: true,
    isBestSeller: false,
    rating: 4.9,
    reviewsCount: 16,
    shortDescription: 'Retro pop-culture ID card holder with hand-beaded crimson strap and detachable neck ribbon.',
    description: 'A bold, nostalgic accessory for fans and collectors. Combines a clear rigid photo ID sleeve with a handcrafted beaded wristlet strap made of translucent ruby-red beads and silver accents. Includes a silk neck ribbon for dual wearing options.',
    features: [
      'Dual use: Wristlet phone/card lanyard or neck strap',
      'Heavy-duty transparent acrylic card sleeve (standard credit card size)',
      'Hand-strung acrylic crystal beads on reinforced wire',
      'Includes collectible art card'
    ],
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Celestial Aurelia Rose Gold Watch',
    price: 89.00,
    originalPrice: 110.00,
    category: 'Watches',
    material: 'Rose Gold & Mesh',
    color: 'Rose Gold',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
    badge: 'Luxury',
    isFeatured: false,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 42,
    shortDescription: 'Ultra-thin minimalist watch featuring a sunray dial and fluid rose gold stainless steel mesh strap.',
    description: 'Understated elegance for the modern wrist. The Celestial Aurelia boasts a slim 34mm casing with a metallic champagne dial, slender baton markers, and a magnetic adjustable mesh bracelet.',
    features: [
      'Japanese Quartz Movement with 3 ATM water resistance',
      '316L Rose Gold Ion-Plated Stainless Steel',
      'Scratch-resistant mineral glass lens',
      'Adjustable magnetic closure'
    ],
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Velour Quilted Crossbody Mini Bag',
    price: 78.00,
    originalPrice: 95.00,
    category: 'Bags',
    material: 'Vegan Leather',
    color: 'Cream Neutral',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    badge: 'New Arrival',
    isFeatured: false,
    isBestSeller: false,
    rating: 4.7,
    reviewsCount: 15,
    shortDescription: 'Soft quilted cream vegan leather mini bag with champagne gold chain strap and turn-lock closure.',
    description: 'Compact yet spacious enough for day-to-night essentials. Crafted from smooth, eco-conscious vegan leather with diamond quilting and finished with an interwoven chain shoulder strap.',
    features: [
      'Premium structured vegan leather with velvet-touch lining',
      'Champagne gold turn-lock hardware',
      'Internal card slots & zippered slip pocket',
      'Dimensions: 20cm x 13cm x 7cm'
    ],
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Golden Hour Starburst Drop Earrings',
    price: 36.00,
    originalPrice: 42.00,
    category: 'Earrings',
    material: 'Gold Plated',
    color: 'Yellow & Gold',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
    badge: 'New',
    isFeatured: false,
    isBestSeller: false,
    rating: 4.8,
    reviewsCount: 29,
    shortDescription: 'Radiant 18K gold-plated celestial starburst drops set with shimmering micro-crystals.',
    description: 'Catch the sunlight from every angle with these starburst drop earrings. Lightweight design featuring layered burst arms adorned with crystal pave.',
    features: [
      '18K Gold Plated Brass with Sterling Silver posts',
      'Hypoallergenic for sensitive ears',
      'Ultra lightweight design (3.5g per earring)'
    ],
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Blush Mulberry Silk Hair Scrunchie & Clip Set',
    price: 24.00,
    originalPrice: 30.00,
    category: 'Accessories',
    material: 'Mulberry Silk',
    color: 'Blush Pink',
    image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800',
    badge: 'Gift Pick',
    isFeatured: false,
    isBestSeller: false,
    rating: 4.9,
    reviewsCount: 31,
    shortDescription: '100% Pure 22 Momme Mulberry silk scrunchie paired with a handcrafted pearl claw clip.',
    description: 'Treat your hair to zero friction and luxury styling. Made from pure grade 6A silk that prevents creasing and hair damage, accompanied by a pearl-encrusted acetate clip.',
    features: [
      '100% Pure 22-Momme Organic Mulberry Silk',
      'Durable elastic core that won’t lose shape',
      'Matching French pearl hair clip included'
    ],
    inStock: true
  }
];

export const STORE_PHONE_NUMBER = '+15550192837'; // For WhatsApp link (wa.me)
