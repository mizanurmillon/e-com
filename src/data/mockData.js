export const initialCategories = [
  { id: 'tech', name: 'Tech & Gadgets', subcategories: ['Keyboards', 'Audio', 'Wearables'] },
  { id: 'apparel', name: 'Apparel & Bags', subcategories: ['Hoodies', 'Wallets', 'Luggage'] },
  { id: 'home', name: 'Home & Living', subcategories: ['Lighting', 'Furniture', 'Decor'] }
];

export const initialBrands = ['Aura', 'Nomad', 'SteelSeries', 'Lumina', 'Steelcase'];

export const initialProducts = [
  {
    id: 1,
    title: 'Apex Pro Mechanical Keyboard',
    category: 'tech',
    subcategory: 'Keyboards',
    brand: 'SteelSeries',
    price: 199.99,
    discountPrice: 179.99,
    rating: 4.8,
    reviewsCount: 18,
    stock: 15,
    sku: 'KB-APEX-PRO-01',
    barcode: '123456789012',
    tags: ['mechanical', 'gaming', 'rgb', 'premium'],
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33faf9c1?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'The fastest mechanical keyboard in the world. Customize your actuation point down to the millimeter for lightning-fast gaming and typing precision.',
    attributes: {
      Weight: '800g',
      Switch: 'OmniPoint Adjustable Mechanical',
      Interface: 'Wired USB-C',
      Backlight: 'RGB Per-Key Customization',
      Warranty: '2 Years'
    },
    variants: {
      colors: ['Space Gray', 'Chamber Black'],
      sizes: ['Tenkeyless', 'Full Size']
    },
    reviews: [
      { id: 101, user: 'Sarah K.', rating: 5, date: '2026-05-12', comment: 'Absolutely stellar switches. Typing feels like dancing on clouds. Well worth the price.', verified: true },
      { id: 102, user: 'Marcus G.', rating: 4, date: '2026-06-01', comment: 'Very responsive, software takes some getting used to. RGB illumination is incredible.', verified: true },
      { id: 103, user: 'Tariq A.', rating: 5, date: '2026-06-15', comment: 'Best keyboard I have ever owned. Custom actuation point is a game changer for gaming.', verified: false }
    ]
  },
  {
    id: 2,
    title: 'SoundWave ANC Wireless Headphones',
    category: 'tech',
    subcategory: 'Audio',
    brand: 'Aura',
    price: 299.99,
    discountPrice: null,
    rating: 4.6,
    reviewsCount: 24,
    stock: 8,
    sku: 'AU-SW-ANC-02',
    barcode: '123456789013',
    tags: ['anc', 'wireless', 'audio', 'travel'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: '',
    description: 'Immerse yourself in acoustic perfection. Industry-leading hybrid active noise cancellation paired with custom-tuned dynamic drivers.',
    attributes: {
      Weight: '250g',
      Battery: 'Up to 40 Hours (ANC On)',
      Bluetooth: 'v5.2 LE Audio',
      Drivers: '40mm Custom High-Res',
      Warranty: '1 Year'
    },
    variants: {
      colors: ['Matte Black', 'Sand Dune Cream'],
      sizes: ['Standard']
    },
    reviews: [
      { id: 201, user: 'Emma L.', rating: 5, date: '2026-04-20', comment: 'Active Noise Cancelling blocks out my entire office noise. Sound profile is rich and detailed.', verified: true },
      { id: 202, user: 'Jason D.', rating: 4, date: '2026-05-10', comment: 'Super comfortable headband, ears do not sweat even after 4 hours. Bass is slightly boosted.', verified: true }
    ]
  },
  {
    id: 3,
    title: 'Chrono X Active Smartwatch',
    category: 'tech',
    subcategory: 'Wearables',
    brand: 'Aura',
    price: 249.99,
    discountPrice: 219.99,
    rating: 4.5,
    reviewsCount: 31,
    stock: 12,
    sku: 'AU-CX-SM-03',
    barcode: '123456789014',
    tags: ['wearable', 'smartwatch', 'fitness', 'amoled'],
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: '',
    description: 'Stay ahead of time and health. Equipped with a bright LTPO AMOLED display, multi-frequency GPS tracking, and advanced health monitors.',
    attributes: {
      Weight: '65g',
      Display: '1.43" AMOLED (466x466 px)',
      Sensors: 'Heart Rate, SpO2, ECG, Gyro',
      Battery: 'Up to 10 Days Regular Mode',
      WaterProof: '5ATM Swimproof'
    },
    variants: {
      colors: ['Carbon Black', 'Starlight Silver'],
      sizes: ['41mm Dial', '45mm Dial']
    },
    reviews: [
      { id: 301, user: 'David W.', rating: 5, date: '2026-05-18', comment: 'Battery lasts exactly a week for me with heavy GPS usage. The screen looks beautiful.', verified: true },
      { id: 302, user: 'Nisha R.', rating: 4, date: '2026-06-22', comment: 'Software runs smoothly. Heart rate measurements match my chest strap closely.', verified: true }
    ]
  },
  {
    id: 4,
    title: 'Voyager Leather Duffle Bag',
    category: 'apparel',
    subcategory: 'Luggage',
    brand: 'Nomad',
    price: 179.99,
    discountPrice: null,
    rating: 4.9,
    reviewsCount: 14,
    stock: 5,
    sku: 'NM-VLD-04',
    barcode: '123456789015',
    tags: ['leather', 'bag', 'travel', 'minimalist'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: '',
    description: 'Handcrafted from full-grain vegetable-tanned leather. The ultimate travel companion designed to age with a rich personal patina.',
    attributes: {
      Weight: '1.2kg',
      Material: '100% Full-grain Leather',
      Capacity: '35 Liters',
      Hardware: 'Solid Brass Buckles & YKK Zippers',
      Warranty: 'Lifetime Guarantee'
    },
    variants: {
      colors: ['Chestnut Brown', 'Obsidian Black'],
      sizes: ['Classic 35L', 'Weekend 45L']
    },
    reviews: [
      { id: 401, user: 'Olivia P.', rating: 5, date: '2026-03-30', comment: 'This bag is a work of art. The smell of genuine leather, the sturdy brass zippers. Worth every cent.', verified: true },
      { id: 402, user: 'Daniel M.', rating: 5, date: '2026-04-14', comment: 'Perfect weekend bag. Fits easily in airline overhead bins. Already starting to patina nicely.', verified: true }
    ]
  },
  {
    id: 5,
    title: 'Horizon LED Desk Lamp',
    category: 'home',
    subcategory: 'Lighting',
    brand: 'Lumina',
    price: 89.99,
    discountPrice: 79.99,
    rating: 4.4,
    reviewsCount: 19,
    stock: 20,
    sku: 'LM-HDL-05',
    barcode: '123456789016',
    tags: ['lighting', 'led', 'minimalist', 'office'],
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: '',
    description: 'Sleek, architectural illumination. Smart desk lamp with wireless fast charging base, auto-brightness adjustments, and temperature control.',
    attributes: {
      Weight: '1.5kg',
      Brightness: 'Up to 900 Lumens',
      Power: '12W LED Panel, 15W Qi Charger',
      Controls: 'Touch-sensitive slider, App Control',
      Warranty: '2 Years'
    },
    variants: {
      colors: ['Space Gray', 'Satin Gold'],
      sizes: ['Standard Fixed', 'Double Arm Articulated']
    },
    reviews: [
      { id: 501, user: 'Arthur V.', rating: 4, date: '2026-05-25', comment: 'Very clean design. Wireless charging on base works with my phone, but charge speed is average.', verified: true }
    ]
  },
  {
    id: 6,
    title: 'ErgoGlide Adjustable Office Chair',
    category: 'home',
    subcategory: 'Furniture',
    brand: 'Steelcase',
    price: 349.99,
    discountPrice: null,
    rating: 4.7,
    reviewsCount: 9,
    stock: 3,
    sku: 'SC-EGC-06',
    barcode: '123456789017',
    tags: ['ergonomic', 'furniture', 'office', 'premium'],
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: '',
    description: 'Invest in your spine. Dynamic back lumbar support systems, multidirectional armrests, and premium high-density breathable mesh fabrics.',
    attributes: {
      Weight: '15kg',
      MaxLoad: '150kg (330 lbs)',
      Casters: 'Floor-friendly PU wheels',
      Adjustability: 'Seat slide, Tilt tension, Arm height',
      Certification: 'BIFMA Ergonomic Certified'
    },
    variants: {
      colors: ['Charcoal Mesh', 'Slate Blue Mesh'],
      sizes: ['Standard Seat Height']
    },
    reviews: [
      { id: 601, user: 'Julian C.', rating: 5, date: '2026-02-14', comment: 'Resolved all my lower back pain. Expensive, but you can adjust literally everything.', verified: true }
    ]
  },
  {
    id: 7,
    title: 'Aura Signature Loopback Hoodie',
    category: 'apparel',
    subcategory: 'Hoodies',
    brand: 'Aura',
    price: 79.99,
    discountPrice: 64.99,
    rating: 4.3,
    reviewsCount: 38,
    stock: 25,
    sku: 'AU-AH-07',
    barcode: '123456789018',
    tags: ['clothing', 'hoodie', 'organic', 'minimalist'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: '',
    description: 'Heavyweight loopback cotton hoodie designed for ultimate drape and warmth. Sourced from 100% organic combed ring-spun French Terry.',
    attributes: {
      Weight: '450g',
      Material: '100% Organic French Terry Cotton',
      Knit: 'Pre-shrunk Heavyweight 400gsm',
      Origin: 'Made in Portugal',
      Care: 'Machine wash cold, line dry'
    },
    variants: {
      colors: ['Classic Black', 'Mineral Slate', 'Sage Olive'],
      sizes: ['Small', 'Medium', 'Large', 'X-Large']
    },
    reviews: [
      { id: 701, user: 'Sophia B.', rating: 5, date: '2026-03-01', comment: 'Extremely thick and heavy! Feels incredibly premium, fits slightly oversized in a stylish way.', verified: true },
      { id: 702, user: 'Lucas E.', rating: 3, date: '2026-04-12', comment: 'Great texture, but neck opening is a bit tight when putting it on.', verified: false }
    ]
  },
  {
    id: 8,
    title: 'Minimalist Leather Card Wallet',
    category: 'apparel',
    subcategory: 'Wallets',
    brand: 'Nomad',
    price: 49.99,
    discountPrice: null,
    rating: 4.6,
    reviewsCount: 42,
    stock: 30,
    sku: 'NM-ALW-08',
    barcode: '123456789019',
    tags: ['leather', 'wallet', 'edc', 'minimalist'],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1606506738676-48c68a29f555?w=800&auto=format&fit=crop&q=60'
    ],
    videoUrl: '',
    description: 'Cut down on pocket bulk. An ultra-thin card wallet holding up to 8 cards plus cash. Built-in RFID protection safeguards your credentials.',
    attributes: {
      Weight: '80g',
      Material: 'Horween Leather, USA',
      RFID: 'Full shield RFID blocking standard',
      Slots: '4 quick-draw slots, 1 cash strap',
      Warranty: '2 Years'
    },
    variants: {
      colors: ['Horween Tan', 'Dark Cacao', 'Midnight Onyx'],
      sizes: ['Standard RFID Edition']
    },
    reviews: [
      { id: 801, user: 'Alex H.', rating: 5, date: '2026-05-04', comment: 'Fits everything I need and barely shows in my front pocket. RFID block works.', verified: true }
    ]
  }
];

export const initialBlogs = [
  {
    id: 1,
    title: 'The Shift to Minimalist Workspace Design',
    author: 'Elena Rostova',
    date: '2026-06-10',
    readTime: '5 min read',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=60',
    excerpt: 'How clean workspaces boost productivity, reduce anxiety, and inspire creative problem solving in hybrid team environments.',
    content: `A cluttered desk is a sign of a cluttered mind, or so the saying goes. Over the past few years, the concept of workspace minimalism has evolved from a visual trend on social media to a scientifically backed practice for improving focus and reducing stress.

### Why Visual Noise Affects Cognitive Load
Every object on your desk competing for visual real estate demands subliminal processing from your brain. By streamlining your peripherals, cabling, and documents, you allow your brain to lock in on deep work tasks.

### Practical Tips for Workspace Minimalism
1. **The 3-Item Rule**: Keep only your active computer, a writing pad, and a single drink on your main desktop.
2. **Hidden Cable Management**: Mount power strips under the desk surface to eliminate black cord tangles.
3. **Invest in Dual-Purpose Tech**: Use monitors with built-in power delivery or charging-enabled desk lamps.

Minimalism isn’t about sterile empty rooms; it’s about making space for what truly matters to your creative output.`
  },
  {
    id: 2,
    title: 'Understanding Active Noise Cancelling Technology',
    author: 'Dr. James Vance',
    date: '2026-06-25',
    readTime: '8 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&auto=format&fit=crop&q=60',
    excerpt: 'The science behind wave cancellation, how microphones analyze external ambient noise, and what to look for in ANC gear.',
    content: `Active Noise Cancelling (ANC) has quickly shifted from a premium airline pilot tool to an everyday commuter necessity. But how exactly do these microscopic microphones cancel out the hum of a jet engine or subway car?

### The Physics of Sound Waves
Sound travels in pressure waves. Just like ocean waves, sound waves have peaks (high pressure) and troughs (low pressure). 

### How Digital Signal Processing works
1. **Sampling**: External microphones capture ambient sound waves.
2. **Phase Inversion**: The headphone processor creates an 'anti-noise' wave that is exactly 180 degrees out of phase with the original sound.
3. **Cancellation**: When the peaks of the noise meet the troughs of the anti-noise, they cancel out, resulting in silence.

Understanding the difference between passive isolation and active frequency cancellation helps you select the best audio equipment for your daily commute.`
  },
  {
    id: 3,
    title: 'How Organic Loopback Cotton Changes Sustainable Apparel',
    author: 'Marcus Vance',
    date: '2026-07-01',
    readTime: '6 min read',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=60',
    excerpt: 'An investigation into organic cotton farming, spinning techniques, and why loopback French Terry offers superior drape and longevity.',
    content: `Fast fashion is one of the world's largest polluters. As consumers demand transparency, the fashion industry has had to re-examine everything down to the weave structure of casual garments like sweatshirts.

### The Loopback Advantage
Unlike brushed fleece which breaks cotton fibers to create fuzzy textures, loopback French Terry keeps the knit loops intact on the inside of the garment. This yields excellent thermal regulation, superior moisture absorption, and prevents micro-shedding in washing machines.

### Why Organic Matters
Standard cotton farming uses heavy pesticides that degrade soil health and endanger local communities. Certifications like GOTS (Global Organic Textile Standard) guarantee that the fibers are grown without toxic chemicals, spun cleanly, and workers receive fair living wages.

By choosing premium sustainable loopback structures, you are buying a garment that lasts a decade rather than a single season.`
  }
];

export const initialFAQs = [
  {
    q: 'How long does shipping take?',
    a: 'For Standard Shipping, delivery takes 3-5 business days. Express Delivery takes 1-2 business days. Orders placed before 2:00 PM local time are processed and shipped the same business day.'
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day money-back guarantee. If you are not completely satisfied with your purchase, you can return it within 30 days for a full refund. Return shipping labels are free for all domestic orders.'
  },
  {
    q: 'Are payments secure on this platform?',
    a: 'Yes, we encrypt all payment data using 256-bit SSL technology. Credit card transactions are processed securely through certified gateways (such as Stripe or PayPal) and we never store your CVV or card credentials on our servers.'
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Absolutely! We ship to over 120 countries worldwide. Shipping rates and customs/tariffs are calculated dynamically at checkout based on your country and address details.'
  },
  {
    q: 'What are reward points and how do I earn them?',
    a: 'Reward points are loyalty incentives. You earn 5 points for every $1 spent. These points accumulate in your Wallet and can be applied as discounts at checkout. 100 points equal $1.00 of store credit.'
  }
];
