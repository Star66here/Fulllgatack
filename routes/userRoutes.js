const express = require('express');
const router = express.Router();

// ตัวอย่างเส้นทาง
router.get('/', (req, res) => {
    res.send('Get all users');
});

router.post('/register', (req, res) => {
    res.send('Register a new user');
});

router.post('/login', (req, res) => {
    res.send('Login user');
});

module.exports = router;
