const Product = require("./models/product");
const Category = require("./models/category");

const categories = [
  { name: "Men's Clothing", slug: "mens-clothing", image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80", description: "Premium menswear curated for everyday style." },
  { name: "Women's Clothing", slug: "womens-clothing", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80", description: "Modern women's fashion for every occasion." },
  { name: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1510557880182-3f8f2e88b5e0?auto=format&fit=crop&w=800&q=80", description: "High performance gadgets and accessories." },
  { name: "Beauty", slug: "beauty", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80", description: "Luxury beauty and self-care essentials." },
  { name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80", description: "Seasonal accessories for a polished look." },
];

const products = [
  {
    title: "Fjallraven Foldsack No. 1 Backpack",
    description: "Everyday backpack with a padded laptop sleeve and comfortable straps.",
    brand: "Fjallraven",
    category: "Men's Clothing",
    images: ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"],
    price: 109.95,
    oldPrice: 129.95,
    stock: 50,
    rating: { average: 4.1, count: 120 },
    tags: ["backpack", "travel", "outdoor"],
    featured: true,
    bestseller: true,
    trending: true,
  },
  {
    title: "Mens Casual Premium Slim Fit T-Shirt",
    description: "Breathable cotton shirt with a tailored fit and contrast stitching.",
    brand: "PremiumWear",
    category: "Men's Clothing",
    images: ["https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png"],
    price: 22.3,
    oldPrice: 29.99,
    stock: 150,
    rating: { average: 4.4, count: 259 },
    tags: ["tshirt", "summer", "casual"],
    featured: false,
    bestseller: true,
    trending: true,
  },
  {
    title: "Mens Cotton Jacket",
    description: "A lightweight jacket for autumn days with modern style.",
    brand: "CoreWear",
    category: "Men's Clothing",
    images: ["https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png"],
    price: 55.99,
    oldPrice: 69.99,
    stock: 22,
    rating: { average: 4.7, count: 500 },
    tags: ["jacket", "outerwear", "fall"],
    featured: true,
    bestseller: false,
    trending: false,
  },
  {
    title: "White Gold Plated Princess Necklace",
    description: "Elegant necklace designed for modern women with a sparkling finish.",
    brand: "Elegance",
    category: "Women's Clothing",
    images: ["https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png"],
    price: 9.99,
    oldPrice: 14.99,
    stock: 85,
    rating: { average: 4.0, count: 400 },
    tags: ["jewelry", "fashion", "gift"],
    featured: true,
    bestseller: true,
    trending: true,
  },
  {
    title: "SanDisk SSD PLUS 1TB Internal SSD",
    description: "High speed SATA SSD for faster boot and reliable storage.",
    brand: "SanDisk",
    category: "Electronics",
    images: ["https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png"],
    price: 109,
    oldPrice: 129,
    stock: 96,
    rating: { average: 4.3, count: 470 },
    tags: ["storage", "ssd", "pc"],
    featured: true,
    bestseller: true,
    trending: false,
  },
  {
    title: "Samsung Curved Gaming Monitor 49-Inch",
    description: "Dual screen experience with ultra-wide display for immersive gaming.",
    brand: "Samsung",
    category: "Electronics",
    images: ["https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png"],
    price: 999.99,
    oldPrice: 1199.99,
    stock: 14,
    rating: { average: 4.8, count: 140 },
    tags: ["monitor", "gaming", "ultrawide"],
    featured: false,
    bestseller: false,
    trending: true,
  },
  {
    title: "MBJ Women's Solid Short Sleeve Boat Neck T-Shirt",
    description: "Soft, stretchable fabric designed for relaxed comfort.",
    brand: "MBJ",
    category: "Women's Clothing",
    images: ["https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png"],
    price: 9.85,
    oldPrice: 14.99,
    stock: 250,
    rating: { average: 4.2, count: 130 },
    tags: ["women", "tshirt", "basics"],
    featured: false,
    bestseller: true,
    trending: false,
  },
  {
    title: "WD 2TB Elements Portable External Hard Drive",
    description: "Portable external storage for fast backups at home or on the go.",
    brand: "WD",
    category: "Electronics",
    images: ["https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png"],
    price: 64,
    oldPrice: 79,
    stock: 120,
    rating: { average: 4.3, count: 203 },
    tags: ["storage", "external", "backup"],
    featured: false,
    bestseller: true,
    trending: true,
  },
];

const seedInitialData = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();

    if (categoryCount === 0) {
      await Category.insertMany(categories);
      console.log("Seeded categories");
    }

    if (productCount === 0) {
      await Product.insertMany(products);
      console.log("Seeded products");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  }
};

module.exports = seedInitialData;
