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

// Schema สำหรับคำสั่งซื้อ
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },  // เพิ่มฟิลด์ orderId
  // accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID ของผู้ใช้
  name: { type: String, required: true },        // ชื่อผู้สั่งซื้อ
  address: { type: String, required: true },     // ที่อยู่สำหรับจัดส่ง
  paymentMethod: { type: String, required: true }, // วิธีการชำระเงิน
  cart: [                                        // สินค้าในคำสั่งซื้อ
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // ID สินค้า
      name: { type: String, required: true },  // ชื่อสินค้า
      price: { type: Number, required: true }, // ราคา
      quantity: { type: Number, required: true }, // จำนวนสินค้า
    }
  ],
  totalPrice: { type: Number, required: true },  // ราคารวมทั้งหมด
  date: { type: Date, default: Date.now },       // วันที่สั่งซื้อ
});
const Product = mongoose.model('Product', productSchema); // สร้าง Model 'Product' จาก Schema 'productSchema'

const Order = mongoose.model('Order', orderSchema);
// ส่งออก Model เพื่อใช้งานในไฟล์อื่น
module.exports = {Product,Order} ;
