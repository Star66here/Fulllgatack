const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// เชื่อมต่อ MongoDB
mongoose
  .connect("mongodb://localhost:27017/to", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema และ Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// เส้นทางสำหรับ Sign In
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// เส้นทางสำหรับ Sign Up
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required!');
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    // เปลี่ยนเส้นทางไปยัง Sign In
    res.redirect('/signin');
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send('Error: ' + err.message);
  }
});


// app.post("/signup", async (req, res) => {
//   console.log("Request body:", req.body); // ตรวจสอบข้อมูล
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).send("All fields are required!");
//     }
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.send("Sign up successful!");
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).send("Error: " + err.message);
//   }
// });
// app.post('/signup', (req, res) => {
//   console.log('Received signup request:', req.body);
//   res.json({ message: 'Signup successful!' });
// });

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body; // ดึงข้อมูล email และ password จากฟอร์ม
    const user = await User.findOne({ email, password }); // ค้นหาใน MongoDB

    if (user) {
      res.send(`Welcome back, ${user.name}!`); // หากพบข้อมูล
    } else {
      res.status(401).send("Invalid email or password"); // หากไม่พบ
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error: " + err.message);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

// เริ่มเซิร์ฟเวอร์
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
