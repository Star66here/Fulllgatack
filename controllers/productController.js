const products = require('../data/products.json');

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
};
