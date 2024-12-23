const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cart } = require('./cartRoutes'); 
const { Order } = require('../data/Model');
// เส้นทางสำหรับสร้างคำสั่งซื้อใหม่
router.post('/submit-order', async (req, res) => {
    const { name, address, paymentMethod, userId } = req.body;

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!name || !address || !paymentMethod) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // คำนวณราคารวมจากตะกร้าสินค้า
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        // ดึง orderId ที่ไม่ซ้ำ
        const orderId = await productController.getNextOrderId(); 
        if (!orderId) {
            return res.status(500).json({ error: 'Failed to generate unique order ID.' });
        }

        // สร้างคำสั่งซื้อใหม่
        const newOrder = new Order({
            orderId,
            userId,
            name,
            address,
            paymentMethod,
            Status: 'Pending',
            date: new Date(),
            cart, // เก็บข้อมูลสินค้าที่ถูกเลือกในคำสั่งซื้อ
            totalPrice
        });

        // ลดจำนวนสินค้าตาม ID และ quantity ในตะกร้า
        await Promise.all(cart.map(async (item) => {
            try {
                await productController.reduceStockById(item.id, item.quantity);
            } catch (error) {
                throw new Error(`Failed to reduce stock for item ${item.id}: ${error.message}`);
            }
        }));

        // บันทึกคำสั่งซื้อในฐานข้อมูล
        await newOrder.save();

        // เคลียร์ตะกร้าหลังจากที่สั่งซื้อ
        cart.length = 0;

        // ส่งกลับคำสั่งซื้อที่สร้างใหม่
        res.status(201).json({ message: 'Order submitted successfully.', order: newOrder });

    } catch (err) {
        console.error('Error processing the order:', err);
        res.status(500).json({ error: 'Error processing the order: ' + err.message });
    }
});

// เส้นทางสำหรับดึงคำสั่งซื้อทั้งหมด
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find(); // ดึงคำสั่งซื้อทั้งหมดจากฐานข้อมูล
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// เส้นทางสำหรับดึงคำสั่งซื้อเฉพาะ ID
router.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id); // ค้นหาคำสั่งซื้อจากฐานข้อมูล
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        res.json(order);
    } catch (err) {
        console.error('Error fetching order by ID:', err);
        res.status(500).json({ error: 'Failed to fetch order by ID' });
    }
});

// เส้นทางสำหรับลบคำสั่งซื้อเฉพาะ ID
router.delete('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id); // ลบคำสั่งซื้อจากฐานข้อมูล
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }
        res.json({ message: 'Order deleted successfully.', order });
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ error: 'Failed to delete order' });
    }
});


module.exports = router;