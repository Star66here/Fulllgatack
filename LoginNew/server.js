const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // ให้บริการไฟล์ static

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/testsignup', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// สร้าง Schema และ Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Route สำหรับ Sign Up
app.post('/signup', async (req, res) => {
    console.log(req.body); // แสดงข้อมูลใน Terminal
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.send('User signed up successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err.message);
    }
});


// Route สำหรับแสดง index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
