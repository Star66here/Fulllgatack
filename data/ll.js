// app.js
const { getProductById, createProduct } = require('../controllers/productController');  // นำเข้าฟังก์ชัน getProductById

createProduct('Green Cavendish Banana',1.00,30,'Cavendish Bananas')
createProduct('Moon Cavendish Banana',1.00,30,'Cavendish Bananas')

createProduct('Namwa Banana',1,30,'Traditional Bananas')
createProduct('Egg Banana',2,30,'Traditional Bananas')
createProduct('Lady Finger Banana',4,30,'Traditional Bananas')

createProduct('Cavendish Banana (Imported)',1,30,'Exotic Banana Varieties')
createProduct('Grand Nain Banana',2,30,'Exotic Banana Varieties')
createProduct('Red Mauritius Banana (Red Banana)',3,30,'Exotic Banana Varieties')

createProduct('Wild Banana',1,30,'Rare or Indigenous Bananas')
createProduct('Theppanom Banana',4,30,'Rare or Indigenous Bananas')
createProduct('Chat Phra-In Banana',3,30,'Rare or Indigenous Bananas')
