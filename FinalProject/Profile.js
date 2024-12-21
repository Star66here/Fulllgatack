// Route สำหรับหน้าโปรไฟล์
app.get('/profile', async (req, res) => {
    try {
        // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
        if (!req.session.userId) {
            return res.redirect('/login');
        }

        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const user = await User.findById(req.session.userId, { password: 0 });
        if (!user) {
            return res.status(404).send('ไม่พบผู้ใช้');
        }

        // แสดงหน้าโปรไฟล์
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>โปรไฟล์</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .profile-container { max-width: 400px; margin: auto; text-align: center; }
                    .profile-container h2 { color: #4CAF50; }
                    .profile-details { text-align: left; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="profile-container">
                    <h2>โปรไฟล์ผู้ใช้</h2>
                    <div class="profile-details">
                        <p><strong>ชื่อ:</strong> ${user.name}</p>
                        <p><strong>อีเมล:</strong> ${user.email}</p>
                        <p><strong>เบอร์โทร:</strong> ${user.phone || '-'}</p>
                        <p><strong>ที่อยู่:</strong> ${user.address || '-'}</p>
                        <p><strong>วันที่สมัคร:</strong> ${new Date(user.createdAt).toLocaleString('th-TH')}</p>
                    </div>
                    <a href="/logout">ออกจากระบบ</a>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Error loading profile:', error);
        res.status(500).send('Internal Server Error');
    }
});
