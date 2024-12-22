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

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String }
});
const Product = mongoose.model('Product', productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  Status: {  type: String, required: true},
  date: { type: Date, default: Date.now },
  cart: { type: Array, required: true },
  totalPrice: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);

// ส่งออก Model เพื่อใช้งานในไฟล์อื่น
module.exports = {Counter,Product,Order} ;
