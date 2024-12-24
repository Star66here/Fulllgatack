const express = require('express');
const User = require('./models/User'); // Import Schema ผู้ใช้
const router = express.Router();

// Route สำหรับหน้าโปรไฟล์
router.get('/profile', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    const user = await User.findById(req.session.userId, { password: 0 });
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>โปรไฟล์ของคุณ</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #f9f9f9;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                .details {
                    margin-top: 20px;
                }
                .details p {
                    margin: 8px 0;
                }
                .button-container {
                    margin-top: 20px;
                    text-align: center;
                }
                .button {
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    cursor: pointer;
                    font-size: 16px;
                }
                .button:hover {
                    background-color: #45a049;
                }
                .button.red {
                    background-color: red;
                }
                .button.red:hover {
                    background-color: darkred;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>โปรไฟล์ของคุณ</h1>
                <div class="details">
                    <p><strong>ชื่อ:</strong> ${user.name}</p>
                    <p><strong>อีเมล:</strong> ${user.email}</p>
                    <p><strong>เบอร์โทร:</strong> ${user.phone || '-'}</p>
                    <p><strong>ที่อยู่:</strong> ${user.address || '-'}</p>
                </div>
                <div class="button-container">
                    <a href="/edit-profile" class="button">แก้ไขข้อมูล</a>
                    <a href="/logout" class="button red">ออกจากระบบ</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Route สำหรับแก้ไขข้อมูล
router.get('/edit-profile', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    const user = await User.findById(req.session.userId, { password: 0 });
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>แก้ไขข้อมูล</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #f9f9f9;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                .form-group {
                    margin-bottom: 15px;
                    text-align: left;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                .form-group input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .button {
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 10px;
                }
                .button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>แก้ไขข้อมูล</h1>
                <form method="POST" action="/edit-profile">
                    <div class="form-group">
                        <label>ชื่อ:</label>
                        <input type="text" name="name" value="${user.name}" required />
                    </div>
                    <div class="form-group">
                        <label>อีเมล:</label>
                        <input type="email" name="email" value="${user.email}" required />
                    </div>
                    <div class="form-group">
                        <label>เบอร์โทร:</label>
                        <input type="text" name="phone" value="${user.phone || ''}" />
                    </div>
                    <div class="form-group">
                        <label>ที่อยู่:</label>
                        <input type="text" name="address" value="${user.address || ''}" />
                    </div>
                    <button type="submit" class="button">บันทึก</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Route สำหรับบันทึกข้อมูลที่แก้ไข
router.post('/edit-profile', async (req, res) => {
    const { name, email, phone, address } = req.body;

    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        await User.findByIdAndUpdate(req.session.userId, { name, email, phone, address });
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
    }
});

module.exports = router;
