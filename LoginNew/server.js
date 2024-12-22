const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

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

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // เปลี่ยน 'index.html' เป็นชื่อไฟล์ HTML ของคุณ
  }); 

app.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });
      await newUser.save(); // บันทึกใน MongoDB
      res.redirect('/?showSignin=true'); // หลังจากบันทึกสำเร็จ เปลี่ยนไปหน้า Sign In
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Error: ' + err.message);
    }
  });
  
  
app.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body; // ดึงข้อมูล email และ password จากฟอร์ม
      const user = await User.findOne({ email, password }); // ค้นหาใน MongoDB
  
      if (user) {
        res.send(`Welcome back, ${user.name}!`); // หากพบข้อมูล
      } else {
        res.status(401).send('Invalid email or password'); // หากไม่พบ
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Error: ' + err.message);
    }
  });

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
