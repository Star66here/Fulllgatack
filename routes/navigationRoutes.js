const express = require('express');
const path = require('path');
const router = express.Router(); // สร้างตัวจัดการเส้นทาง (Router)

// ฟังก์ชันสำหรับการส่งไฟล์ HTML
const sendHtmlFile = (res, filePath) => {
    res.sendFile(path.join(__dirname, filePath), (err) => {
        if (err) {
            console.error('Error loading file:', err);
            res.status(500).send('Error loading page');
        }
    });
};

// เส้นทางสำหรับหน้าแรก
router.get('/', (req, res) => {  
    sendHtmlFile(res, '../views/index.html');  // ส่งไฟล์ HTML หน้าแรก
});

// เส้นทางสำหรับหน้ารายการสินค้า
router.get('/product', (req, res) => {  
    sendHtmlFile(res, '../views/shop/product-list.html');  // ส่งไฟล์ HTML รายการสินค้า
});

// เส้นทางสำหรับหน้ารายละเอียดสินค้า
router.get('/product-details', (req, res) => {  
    sendHtmlFile(res, '../views/shop/product-details.html');  // ส่งไฟล์ HTML รายละเอียดสินค้า
});

// เส้นทางสำหรับหน้าตะกร้าสินค้า
router.get('/cart', (req, res) => {  
    sendHtmlFile(res, '../views/shop/cart.html');  // ส่งไฟล์ HTML ตะกร้าสินค้า
});

// เส้นทางสำหรับหน้าชำระเงิน
router.get('/checkout', (req, res) => {  
    sendHtmlFile(res, '../views/shop/checkout.html');  // ส่งไฟล์ HTML ชำระเงิน
});

// เส้นทางสำหรับหน้าบัญชีผู้ใช้
router.get('/account', (req, res) => {  
    sendHtmlFile(res, '../views/login/account.html');  // ส่งไฟล์ HTML บัญชีผู้ใช้
});

// เส้นทางไปยังหน้าล็อกอิน
router.get('/login', (req, res) => {  
    sendHtmlFile(res, '../views/login/login.html');  // ส่งไฟล์ HTML ล็อกอิน
});

// ส่งออกโมดูล Router เพื่อใช้งานในไฟล์อื่น
module.exports = router;
