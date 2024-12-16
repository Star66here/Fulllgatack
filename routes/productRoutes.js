const express = require('express');
const path = require('path');  // ต้องทำการ import path
const router = express.Router();

router.get('/', (req, res) => {
    // ใช้ path.join เพื่อระบุเส้นทางที่ถูกต้อง
    res.sendFile(path.join(__dirname, '../views/shop/product-list.html'));  // เส้นทางที่ถูกต้อง
});

module.exports = router;
