const express = require('express');
const path = require('path');  
const router = express.Router();

router.get('/', (req, res) => {
   
    res.sendFile(path.join(__dirname, '../views/index.html')); 
});

router.get('/product', (req, res) => {
   
    res.sendFile(path.join(__dirname, '../views/shop/product-list.html')); 
});

router.get('/product-details', (req, res) => {
   
    res.sendFile(path.join(__dirname, '../views/shop/product-details.html')); 
});


router.get('/cart', (req, res) => {
  
    res.sendFile(path.join(__dirname, '../views/shop/cart.html'));  
});

router.get('/checkout', (req, res) => {
  
    res.sendFile(path.join(__dirname, '../views/shop/checkout.html'));  
});
router.get('/account', (req, res) => {
  
    res.sendFile(path.join(__dirname, '../views/login/account.html'));  
});


module.exports = router;