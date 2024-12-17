// productController.js
const Product = require('./productModel');  // นำเข้าโมเดล Product

// ฟังก์ชันดึงข้อมูลจาก _id
const getProductById = async (id) => {
  try {
    // ค้นหาสินค้าจาก _id
    const product = await Product.findById(id);

    // ตรวจสอบว่าพบข้อมูลหรือไม่
    if (!product) {
      throw new Error('Product not found');
    }

    // คืนค่าผลลัพธ์ที่ได้
    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

module.exports = { getProductById };  // ส่งออกฟังก์ชัน
