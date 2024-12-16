// routes/cartRoutes.js
const express = require('express');
const router = express.Router();

// ตัวแปรตะกร้าสินค้า
let cart = [];

// API สำหรับเพิ่มสินค้าลงในตะกร้า
router.post('/add', (req, res) => {
    const { id, name, price } = req.body;

    // ตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    console.log('Current cart:', cart);

    // ส่งข้อมูลตะกร้ากลับไปยัง frontend
    res.json(cart);
});

// API สำหรับดึงข้อมูลตะกร้า
router.get('/', (req, res) => {
    // ส่งข้อมูลตะกร้ากลับไปยัง frontend
    res.json(cart);
});

// ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
router.post('/remove', (req, res) => {
    const { id } = req.body;

    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1); // ลบสินค้าออกจาก cart
    }

    console.log('Updated cart:', cart);

    // ส่งข้อมูลตะกร้ากลับไปยัง frontend
    res.json(cart);
});

module.exports = router;
