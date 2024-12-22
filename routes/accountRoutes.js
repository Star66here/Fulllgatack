const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ฟังก์ชันที่ค้นหาคำสั่งซื้อ
async function findOrder() {
    try {
        // ใช้ await เพื่อค้นหาคำสั่งซื้อ
        const result = await productController.findOrderByName('xcx');
        return result; // คืนค่าผลลัพธ์
    } catch (error) {
        console.error('Error finding order:', error);
        return []; // คืนค่าอาร์เรย์ว่างหากเกิดข้อผิดพลาด
    }
}

// กำหนด route สำหรับ /OrderHistory
router.get('/OrderHistory', async (req, res) => {
    try {
        // เรียกใช้ฟังก์ชัน findOrder และรอผลลัพธ์
        const orders = await findOrder();
        console.log('OrderHistory:', orders);

        // ส่งผลลัพธ์กลับไปยัง client
        res.json(orders);
    } catch (error) {
        console.error('Error handling /OrderHistory:', error);
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
});

module.exports = router;
