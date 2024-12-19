const Product = require('../data/productModel')

const createProduct = async (name, price, stock = 0, category = '') => {
    try {
      const product = new Product({
        name: name,          // ชื่อสินค้า
        price: price,        // ราคา
        stock: stock,        // จำนวนสต๊อก (ตั้งค่าเริ่มต้นเป็น 0)
        category: category   // หมวดหมู่สินค้า (ตั้งค่าเริ่มต้นเป็นค่าว่าง)
      });
  
      // บันทึกสินค้าใหม่ลงในฐานข้อมูล
      const savedProduct = await product.save();
      console.log('สินค้าถูกสร้างเรียบร้อยแล้ว:', savedProduct);
      return savedProduct;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้างสินค้า:', error);
      throw error;
    }
  };

const getProductById = async (id) => {
  try {
    // ค้นหาสินค้าจาก _id
    const product = await Product.findById(id).select('name price');

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

module.exports = {createProduct,getProductById};