// นำเข้า Mongoose
const mongoose = require('mongoose');

// URL สำหรับเชื่อมต่อ MongoDB
const mongoURI = 'mongodb://localhost:27017/bananashop'; // URL เชื่อมต่อกับฐานข้อมูลชื่อ 'bananashop'

// ฟังก์ชันสำหรับเชื่อมต่อกับ MongoDB
mongoose.connect(mongoURI) // เริ่มต้นการเชื่อมต่อ
  .then(() => console.log('Connected to MongoDB')) // แสดงข้อความเมื่อเชื่อมต่อสำเร็จ
  .catch(err => console.error('MongoDB connection error:', err)); // แสดงข้อผิดพลาดกรณีเชื่อมต่อไม่สำเร็จ

// ตรวจสอบสถานะการเชื่อมต่อของฐานข้อมูล
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // แสดงข้อผิดพลาดเมื่อเกิดปัญหาในการเชื่อมต่อ
db.once('open', () => {
  console.log('Connected to MongoDB!'); // แสดงข้อความเมื่อการเชื่อมต่อพร้อมใช้งาน
});

// สร้าง Schema สำหรับ Collection 'product'
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },      // ชื่อสินค้า (ต้องระบุเสมอ)
  price: { type: Number, required: true },     // ราคา (ต้องระบุเสมอ)
  stock: { type: Number, default: 0 },         // จำนวนสินค้าในสต๊อก (ค่าเริ่มต้นเป็น 0)
  category: { type: String },                  // หมวดหมู่สินค้า
});

// สร้าง Model จาก Schema
const Product = mongoose.model('Product', productSchema); // สร้าง Model 'Product' จาก Schema 'productSchema'

// ส่งออก Model เพื่อใช้งานในไฟล์อื่น
module.exports = Product ;
