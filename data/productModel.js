// นำเข้า Mongoose
const mongoose = require('mongoose');

// URL สำหรับเชื่อมต่อ MongoDB
const mongoURI = 'mongodb://localhost:27017/bananashop';

// ฟังก์ชันเชื่อมต่อกับ MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// ตรวจสอบการเชื่อมต่อ
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// สร้าง Schema สำหรับ Collection 'product'
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },      // ชื่อสินค้า
  price: { type: Number, required: true },     // ราคา
  stock: { type: Number, default: 0 },         // จำนวนสต๊อก
  category: { type: String },                  // หมวดหมู่สินค้า

});

// สร้าง Model จาก Schema
const Product = mongoose.model('Product', productSchema);

// ฟังก์ชันเพิ่มข้อมูลตัวอย่างเข้าไปใน Collection
const createProduct = async (name, price, stock = 0, category = '') => {
    try {
      const product = new Product({
        name: name,          // ชื่อสินค้า
        price: price,        // ราคา
        stock: stock,        // จำนวนสต๊อก (ตั้งค่าเริ่มต้นเป็น 0)
        category: category   // หมวดหมู่สินค้า (ตั้งค่าเริ่มต้นเป็นค่าว่าง)
      });
  
      // บันทึกสินค้าใหม่ลงในฐานข้อมูล
      const savedProduct = await product.save();
      console.log('สินค้าถูกสร้างเรียบร้อยแล้ว:', savedProduct);
      return savedProduct;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างสินค้า:', error);
      throw error;
    }
  };
  

// ฟังก์ชันดึงข้อมูลจาก Collection 'product'
// const getProducts = async () => {
//   try {
//     const products = await Product.find().select('name price');
//     console.log('Products:', products);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//   }
// };


// productController.js
// ฟังก์ชันดึงข้อมูลจาก _id
const getProductById = async (id) => {
  try {
    // ค้นหาสินค้าจาก _id
    const product = await Product.findById(id).select('name price');

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!product) {
      throw new Error('Product not found');
    }

    // คืนค่าผลลัพธ์ที่ได้
    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};



module.exports = {createProduct,Product,getProductById};  // ส่งออกฟังก์ชัน
