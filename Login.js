// Route สำหรับหน้าเข้าสู่ระบบ
app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>เข้าสู่ระบบ</title>
        </head>
        <body>
            <h1>เข้าสู่ระบบ</h1>
            <form method="POST" action="/login">
                <label for="email">อีเมล:</label>
                <input type="email" id="email" name="email" required>
                <br>
                <label for="password">รหัสผ่าน:</label>
                <input type="password" id="password" name="password" required>
                <br>
                <button type="submit">เข้าสู่ระบบ</button>
            </form>
        </body>
        </html>
    `);
});

// Route สำหรับตรวจสอบการเข้าสู่ระบบ
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }

        // จำลองการเข้าสู่ระบบ (เก็บ user._id ไว้ใน session)
        req.session.userId = user._id; // คุณต้องติดตั้ง express-session
        console.log('Logged in user:', user);

        res.redirect('/profile');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});
