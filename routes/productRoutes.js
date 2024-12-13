
const express = require('express');
const router = express.Router();

// ตัวอย่างเส้นทางสินค้า
router.get('/', (req, res) => {
    res.send('Get all products');
});

router.post('/', (req, res) => {
    res.send('Create a new product');
});

router.get('/:id', (req, res) => {
    res.send(`Get product with ID: ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`Update product with ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete product with ID: ${req.params.id}`);
});

module.exports = router;
