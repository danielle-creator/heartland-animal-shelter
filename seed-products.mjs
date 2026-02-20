import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Clear existing products
await conn.execute('DELETE FROM product_variants');
await conn.execute('DELETE FROM products');

const products = [
  // Calendars
  {
    name: '2025 Heartland Calendar',
    description: 'Beautiful 12-month wall calendar featuring adorable shelter animals. A perfect gift for any animal lover!',
    price: '20.00',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
    category: 'Calendars',
    hasVariants: false,
    stock: 50,
    sortOrder: 1,
  },
  // T-Shirts
  {
    name: 'Heartland Logo T-Shirt',
    description: 'Soft, comfortable 100% cotton tee featuring the Heartland Animal Shelter logo. Show your support!',
    price: '25.00',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
    category: 'Apparel',
    hasVariants: true,
    stock: 0,
    sortOrder: 2,
  },
  {
    name: '"Adopt Don\'t Shop" T-Shirt',
    description: 'Spread the message with this bold statement tee. Available in multiple colors.',
    price: '25.00',
    imageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop',
    category: 'Apparel',
    hasVariants: true,
    stock: 0,
    sortOrder: 3,
  },
  {
    name: 'Paw Print T-Shirt',
    description: 'Classic paw print design on a soft cotton tee. Perfect for everyday wear.',
    price: '25.00',
    imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop',
    category: 'Apparel',
    hasVariants: true,
    stock: 0,
    sortOrder: 4,
  },
  // Sweatshirts
  {
    name: 'Heartland Crewneck Sweatshirt',
    description: 'Cozy 50/50 cotton-poly blend crewneck. Perfect for cool weather walks with your furry friend.',
    price: '40.00',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=600&fit=crop',
    category: 'Apparel',
    hasVariants: true,
    stock: 0,
    sortOrder: 5,
  },
  {
    name: 'Heartland Hoodie',
    description: 'Warm and comfortable pullover hoodie with the Heartland logo. A shelter staple!',
    price: '45.00',
    imageUrl: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&h=600&fit=crop',
    category: 'Apparel',
    hasVariants: true,
    stock: 0,
    sortOrder: 6,
  },
  // Bandanas
  {
    name: 'Pet Bandana',
    description: 'Adorable cotton bandana for your dog or cat. Features the Heartland paw print logo.',
    price: '10.00',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
    category: 'Pet Accessories',
    hasVariants: true,
    stock: 0,
    sortOrder: 7,
  },
  // Tote Bags
  {
    name: 'Heartland Tote Bag',
    description: 'Sturdy canvas tote bag with Heartland logo. Great for shopping, the beach, or everyday use.',
    price: '15.00',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    category: 'Accessories',
    hasVariants: false,
    stock: 30,
    sortOrder: 8,
  },
  // Mugs
  {
    name: 'Heartland Coffee Mug',
    description: '11oz ceramic mug featuring shelter animals. Dishwasher safe. Start your morning with a smile!',
    price: '15.00',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop',
    category: 'Home & Kitchen',
    hasVariants: false,
    stock: 25,
    sortOrder: 9,
  },
  // Stickers
  {
    name: 'Heartland Sticker Pack',
    description: 'Set of 5 vinyl stickers featuring Heartland animals and logos. Weatherproof and long-lasting.',
    price: '8.00',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    category: 'Accessories',
    hasVariants: false,
    stock: 100,
    sortOrder: 10,
  },
  // Hats
  {
    name: 'Heartland Baseball Cap',
    description: 'Adjustable structured cap with embroidered Heartland logo. One size fits most.',
    price: '22.00',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop',
    category: 'Apparel',
    hasVariants: false,
    stock: 20,
    sortOrder: 11,
  },
  // Water bottles
  {
    name: 'Heartland Water Bottle',
    description: '20oz stainless steel insulated water bottle. Keeps drinks cold 24 hours, hot 12 hours.',
    price: '28.00',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
    category: 'Home & Kitchen',
    hasVariants: false,
    stock: 15,
    sortOrder: 12,
  },
  // Pins
  {
    name: 'Heartland Enamel Pin Set',
    description: 'Set of 3 hard enamel pins: paw print, heart, and shelter logo. Perfect for jackets and bags.',
    price: '12.00',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    category: 'Accessories',
    hasVariants: false,
    stock: 40,
    sortOrder: 13,
  },
  // Gift Cards
  {
    name: 'Heartland Gift Card',
    description: 'Give the gift of giving! A Heartland gift card can be used toward any shop purchase.',
    price: '25.00',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop',
    category: 'Gift Cards',
    hasVariants: true,
    stock: 0,
    sortOrder: 14,
  },
];

for (const p of products) {
  const [result] = await conn.execute(
    `INSERT INTO products (name, description, price, imageUrl, category, hasVariants, stock, active, sortOrder, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())`,
    [p.name, p.description, p.price, p.imageUrl, p.category, p.hasVariants ? 1 : 0, p.stock, p.sortOrder]
  );
  const productId = result.insertId;
  
  // Add variants for apparel and gift cards
  if (p.hasVariants && p.category === 'Apparel') {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
    for (const size of sizes) {
      await conn.execute(
        `INSERT INTO product_variants (productId, size, stock, active, createdAt, updatedAt)
         VALUES (?, ?, ?, 1, NOW(), NOW())`,
        [productId, size, 10]
      );
    }
  } else if (p.name === 'Pet Bandana') {
    const sizes = ['Small (up to 30 lbs)', 'Large (30+ lbs)'];
    for (const size of sizes) {
      await conn.execute(
        `INSERT INTO product_variants (productId, size, stock, active, createdAt, updatedAt)
         VALUES (?, ?, ?, 1, NOW(), NOW())`,
        [productId, size, 15]
      );
    }
  } else if (p.name === 'Heartland Gift Card') {
    const amounts = ['$25', '$50', '$100'];
    for (const amount of amounts) {
      const price = amount.replace('$', '');
      await conn.execute(
        `INSERT INTO product_variants (productId, size, price, stock, active, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, 1, NOW(), NOW())`,
        [productId, amount, price, 999]
      );
    }
  }
}

console.log('✅ Seeded', products.length, 'products with variants');
await conn.end();
