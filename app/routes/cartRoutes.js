const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ตัวแปรตะกร้าสินค้า
let cart = [];

// เส้นทางสำหรับเพิ่มสินค้าลงในตะกร้า
router.post('/add', async (req, res) => {
    const { id } = req.body;  // รับเฉพาะ id จาก req.body

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        // ดึงข้อมูลสินค้า (เฉพาะ name และ price) จากฐานข้อมูลโดยใช้ id
        const product = await productController.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // ตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;  // ถ้ามีอยู่แล้ว เพิ่มจำนวนสินค้า
        } else {
            // ถ้ายังไม่มีสินค้าในตะกร้า ให้เพิ่มสินค้าลงตะกร้า
            cart.push({
                id: id,
                name: product.name,     // ใช้ name ที่ดึงมาจากฐานข้อมูล
                price: product.price,   // ใช้ price ที่ดึงมาจากฐานข้อมูล
                quantity: 1
            });
        }

        console.log('Current cart:', cart);

        // ส่งข้อมูลตะกร้ากลับไปยัง frontend
        res.json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Unable to add product to cart', error: error.message });
    }
});

// API สำหรับดึงข้อมูลตะกร้า
router.get('/', (req, res) => {
    // ส่งข้อมูลตะกร้ากลับไปยัง frontend
    res.json(cart);
});

// ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
router.post('/remove', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Product ID is required to remove' });
    }

    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1); // ลบสินค้าออกจาก cart
        console.log('Updated cart:', cart);
        res.json(cart);
    } else {
        return res.status(404).json({ message: 'Product not found in cart' });
    }
});

  
module.exports = { router, cart} ;