const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ฟังก์ชันที่ค้นหาคำสั่งซื้อโดยใช้ชื่อ
async function findOrder() {
    try {
        // เรียกใช้ฟังก์ชัน findOrderByName จาก productController เพื่อค้นหาคำสั่งซื้อ
        const result = await productController.findOrderByName('xcx');
        return result;  // คืนค่าผลลัพธ์ที่ได้จากการค้นหา
    } catch (error) {
        console.error('Error finding order:', error);
        return [];  // หากเกิดข้อผิดพลาด, คืนค่าเป็นอาร์เรย์ว่าง
    }
}

// กำหนด route สำหรับ /OrderHistory
router.get('/OrderHistory', async (req, res) => {
    try {
        // เรียกใช้ฟังก์ชัน findOrder เพื่อค้นหาคำสั่งซื้อ
        const orders = await findOrder();

        // ตรวจสอบว่ามีคำสั่งซื้อหรือไม่
        if (orders.length === 0) {
            console.log('No orders found.');
            return res.status(404).json({ message: 'No orders found' }); // ส่งข้อความเมื่อไม่พบคำสั่งซื้อ
        }

        console.log('OrderHistory:', orders);  // แสดงคำสั่งซื้อที่ค้นพบ

        // ส่งผลลัพธ์กลับไปยัง client
        res.json(orders);
    } catch (error) {
        console.error('Error handling /OrderHistory:', error);
        res.status(500).json({ error: 'Failed to fetch order history' });  // ส่งข้อความข้อผิดพลาดเมื่อมีข้อผิดพลาด
    }
});

module.exports = router;
