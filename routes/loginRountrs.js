const bcrypt = require('bcrypt');  
const express = require('express');
const router = express.Router();
const {Users} = require('../data/Model');

// เส้นทางสำหรับ Sign Up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, อีเมล, รหัสผ่าน)',
        });
    }

    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'มีผู้ใช้งานที่ใช้อีเมลนี้อยู่แล้ว',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({ name, email, password: hashedPassword });

        return res.status(201).json({
            success: true,
            message: 'สมัครสมาชิกสำเร็จ',
            user: {
                id: newUser._id,
                accountId: newUser.accountId, // accountId จะถูกสร้างและบันทึกอัตโนมัติ
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในระบบ',
        });
    }
});

// เส้นทางสำหรับ Sign In
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'กรุณากรอกข้อมูลอีเมลและรหัสผ่าน',
        });
    }

    try {
        // ค้นหาผู้ใช้จากอีเมลที่กรอก
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'ไม่พบผู้ใช้งานด้วยอีเมลนี้',
            });
        }

        // เปรียบเทียบรหัสผ่านที่กรอกกับรหัสผ่านที่เข้ารหัส
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'รหัสผ่านไม่ถูกต้อง',
            });
        }

        // ถ้ารหัสผ่านถูกต้อง ส่งข้อมูลผู้ใช้กลับ
        return res.status(200).json({
            success: true,
            message: 'เข้าสู่ระบบสำเร็จ',
            user: {
                id: user.accountId,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในระบบ',
        });
    }
});

module.exports = router;