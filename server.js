const express = require('express');
const path = require('path');

// นำเข้าเส้นทางต่าง ๆ
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes')
const navigationRoutes = require('./routes/navigationRoutes')

const app = express();
const PORT = 3000;

// ใช้ express.json() สำหรับรับข้อมูล JSON
app.use(express.json()); 

// ใช้ static middleware เพื่อให้สามารถใช้ไฟล์จากโฟลเดอร์ 'public'
app.use(express.static(path.join(__dirname, 'public')));

// เส้นทางต่าง ๆ สำหรับการแสดง HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // หน้าแรก
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Login', 'login.html'));  // login
});


// เส้นทาง API
app.use('/api/cart', cartRoutes); // ใช้ API ของตะกร้าสินค้า

//app.use('/products', productRoutes)
app.use('/navigation', navigationRoutes)


// Error Handling
// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// General Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack); // แสดงรายละเอียดข้อผิดพลาดใน console
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
