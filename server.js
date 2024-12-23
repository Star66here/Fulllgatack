const express = require('express');
const path = require('path');

// นำเข้าเส้นทางของโมดูลที่เกี่ยวข้อง
const  { router: cartRoutes }  = require('./routes/cartRoutes'); // เส้นทางสำหรับจัดการตะกร้าสินค้า
const navigationRoutes = require('./routes/navigationRoutes'); // เส้นทางสำหรับการนำทาง
const orderRoutes = require('./routes/orderRoutes'); // เส้นทางสำหรับการสั่งซื้อสินค้า
const  accountRoutes = require('./routes/accountRoutes')
const loginRoutes = require('./routes/loginRountrs'); // เส้นทางสำหรับการล็อกอิน

const app = express();
const PORT = 3000; // กำหนดพอร์ตสำหรับเซิร์ฟเวอร์

// ใช้ express.json() เพื่อจัดการข้อมูล JSON ในคำขอ
app.use(express.json());

// ใช้ static middleware เพื่อให้สามารถเข้าถึงไฟล์ในโฟลเดอร์ 'public'
app.use(express.static(path.join(__dirname, 'public')));

// เส้นทางสำหรับแสดงหน้า HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // หน้าแรก
});

// เส้นทาง API
app.use('/api/cart', cartRoutes); // เส้นทางสำหรับ API ของตะกร้าสินค้า
app.use('/navigation', navigationRoutes); // เส้นทางสำหรับการนำทาง
app.use('/checkout', orderRoutes); // เส้นทางสำหรับการชำระเงิน
app.use('/account',accountRoutes);
app.use('/login', loginRoutes); // เส้นทางสำหรับการล็อกอิน

// การจัดการข้อผิดพลาด
// กรณีที่ไม่พบทรัพยากร (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' }); // ส่งข้อผิดพลาด 404
});

// กรณีเกิดข้อผิดพลาดทั่วไป (500)
app.use((err, req, res, next) => {
    console.error(err.stack); // แสดงรายละเอียดข้อผิดพลาดใน console
    res.status(500).json({ error: 'Internal Server Error' }); // ส่งข้อผิดพลาด 500
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // แสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน
});
