const express = require('express');
const path = require('path');  
const router = express.Router(); // สร้างตัวจัดการเส้นทาง (Router)

// เส้นทางสำหรับหน้าแรก
router.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, '../views/index.html')); // ส่งไฟล์ HTML หน้าแรก
});

// เส้นทางสำหรับหน้ารายการสินค้า
router.get('/product', (req, res) => {  
    res.sendFile(path.join(__dirname, '../views/shop/product-list.html')); // ส่งไฟล์ HTML รายการสินค้า
});

// เส้นทางสำหรับหน้ารายละเอียดสินค้า
router.get('/product-details', (req, res) => {  
    res.sendFile(path.join(__dirname, '../views/shop/product-details.html')); // ส่งไฟล์ HTML รายละเอียดสินค้า
});

// เส้นทางสำหรับหน้าตะกร้าสินค้า
router.get('/cart', (req, res) => {  
    res.sendFile(path.join(__dirname, '../views/shop/cart.html')); // ส่งไฟล์ HTML ตะกร้าสินค้า
});

// เส้นทางสำหรับหน้าชำระเงิน
router.get('/checkout', (req, res) => {  
    res.sendFile(path.join(__dirname, '../views/shop/checkout.html')); // ส่งไฟล์ HTML ชำระเงิน
});

// เส้นทางสำหรับหน้าบัญชีผู้ใช้
router.get('/account', (req, res) => {  
    res.sendFile(path.join(__dirname, '../views/login/account.html')); // ส่งไฟล์ HTML บัญชีผู้ใช้
});

// ส่งออกโมดูล Router เพื่อใช้งานในไฟล์อื่น
module.exports = router;
