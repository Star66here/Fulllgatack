const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Shop', 'index.html')); // หน้าแรก
});

app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, 'Shop', 'account.html'));  // account
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'Shop', 'product-list.html'));  // account
});

// Error Handling
// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// General Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack); // แสดงรายละเอียดข้อผิดพลาดใน console
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 
