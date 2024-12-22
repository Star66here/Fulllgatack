const express = require('express');
const mongoose = require('mongoose');
const app = express();

const path = require('path');

// กำหนดให้เซิร์ฟเวอร์ให้บริการไฟล์ Static
app.use(express.static(path.join(__dirname, 'public')));

// เมื่อไปที่ '/' ส่งไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// เมื่อไปที่ '/historyform' ส่งไฟล์ historyform.html
app.get('/historyform', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'historyform.html'));
});

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.redirect('/history.html');
// });


mongoose.connect('mongodb://localhost:27017/BananasShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const orderSchema = new mongoose.Schema({
    orderId: String,
    date: { type: Date, default: Date.now },
    itemName: String,
    quantity: Number,
    totalPrice: Number,
});

const Order = mongoose.model('Order', orderSchema, 'Orders');

app.get('/purchase-history', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Error fetching orders.');
    }
});

app.use(express.static(__dirname));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

