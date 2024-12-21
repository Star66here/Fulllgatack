const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/siginTesttt');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Schema และ Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// เส้นทางสำหรับ POST /signup
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send('User signed up successfully!');
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
