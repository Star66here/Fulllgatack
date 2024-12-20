const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cart } = require('./cartRoutes'); // Import cart from cartRoutes

// ตัวอย่างข้อมูลจำลองสำหรับคำสั่งซื้อ
let orders = [];

// เส้นทางสำหรับสร้างคำสั่งซื้อใหม่
router.post('/submit-order', async (req, res) => {
    const { name, address, paymentMethod } = req.body;

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!name || !address || !paymentMethod) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // ตรวจสอบว่ามีสินค้าหรือไม่ใน cart
    if (cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty. Please add items to your cart.' });
    }

    // สร้างคำสั่งซื้อใหม่
    const newOrder = {
        id: orders.length + 1, // สร้าง ID แบบเรียงลำดับ
        name,
        address,
        paymentMethod,
        date: new Date(),
        cart, // เก็บข้อมูลสินค้าที่ถูกเลือกในคำสั่งซื้อ
    };

    // ลดจำนวนสินค้าตาม ID และ quantity ใน cart
    try {
        for (const item of cart) {
            // ค้นหาสินค้าใน cart และลด stock
            await productController.reduceStockById(item.id, item.quantity);
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error reducing stock: ' + err.message });
    }

    // เคลียร์ตะกร้าหลังจากที่สั่งซื้อ
    cart.length = 0;
    // เพิ่มคำสั่งซื้อในรายการ
    orders.push(newOrder);
    console.log(orders);

    // ส่งกลับคำสั่งซื้อที่สร้างใหม่
    res.status(201).json({ message: 'Order submitted successfully.', order: newOrder });
});

// เส้นทางสำหรับดึงคำสั่งซื้อทั้งหมด
router.get('/orders', (req, res) => {
    res.json(orders);
});

// เส้นทางสำหรับดึงคำสั่งซื้อเฉพาะ ID
router.get('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found.' });
    }

    res.json(order);
});

// เส้นทางสำหรับลบคำสั่งซื้อเฉพาะ ID
router.delete('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found.' });
    }

    // ลบคำสั่งซื้อออกจากรายการ
    const deletedOrder = orders.splice(orderIndex, 1);

    res.json({ message: 'Order deleted successfully.', order: deletedOrder });
});

module.exports = router;
