const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// เชื่อมต่อ MongoDB (ใช้ URI ใหม่)
mongoose.connect(`mongodb+srv://${process.env.UESER_Name}:${process.env.UESER_Password}${process.env.DB_url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file serving
app.use(express.static(path.join(__dirname)));

// Middleware สำหรับแสดง Request Log
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

// Schema และ Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// Route สำหรับ Sign Up
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
  
        // ตรวจสอบว่าอีเมลนี้มีอยู่ในระบบแล้วหรือยัง
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email is already in use. Please use another email.' });
        }
  
        // สร้างผู้ใช้ใหม่
        const newUser = new User({ name, email, password });
        await newUser.save();
  
        // เปลี่ยนไปหน้า Sign In
        res.redirect('/?showSignin=true');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: err.message });
    }
  });
// Route สำหรับ Sign In
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.send({ message: `Welcome back, ${user.name}!` });
        } else {
            res.status(401).send({ error: "Invalid email or password" });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: err.message });
    }
});

// Route สำหรับ Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // โหลดหน้า HTML
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


