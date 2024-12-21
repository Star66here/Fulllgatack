// controllers/productController.js
const { Product, Counter } = require('../data/productModel');

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

// ฟังก์ชันลดจำนวนสินค้าตาม ID
async function reduceStockById(productId, quantityToReduce) {
  try {
    // ตรวจสอบว่า quantityToReduce เป็นค่าบวกและมากกว่า 0 หรือไม่
    if (quantityToReduce <= 0) {
      throw new Error('Quantity to reduce must be greater than 0');
    }

    // ค้นหาสินค้าจาก productId
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // ตรวจสอบว่า stock ในสินค้ามีเพียงพอหรือไม่
    if (product.stock < quantityToReduce) {
      throw new Error('Not enough stock to reduce');
    }

    // ลดจำนวนสต๊อกสินค้า
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, // ค้นหาสินค้าด้วย ObjectId
      { $inc: { stock: -quantityToReduce } }, // ลดจำนวนสินค้า
      { new: true } // คืนค่าข้อมูลที่อัปเดต
    );

    // แสดงผลลัพธ์หลังจากลดจำนวนสต๊อก
    console.log('Stock reduced successfully:', updatedProduct);
  } catch (err) {
    console.error('Error updating stock:', err.message);
  }
}
// ฟังก์ชันเพิ่มจำนวนสินค้าใน stock
async function increaseStockById(productId, quantityToAdd) {
  try {
      // ค้นหาสินค้าตาม ID
      const product = await Product.findById(productId);

      if (!product) {
          throw new Error('Product not found');
      }

      // เพิ่มจำนวน stock
      product.stock += quantityToAdd;

      // บันทึกการเปลี่ยนแปลง
      await product.save();

      console.log(`Product ${product.name} stock updated. New stock: ${product.stock}`);

      return product; // คืนค่าข้อมูลสินค้าใหม่ที่อัพเดต
  } catch (err) {
      console.error('Error increasing stock:', err);
      throw err; // ส่งข้อผิดพลาดเพื่อให้สามารถจัดการได้ในที่อื่น
  }
}
async function getNextOrderId() {
  try {
      const counter = await Counter.findOneAndUpdate(
          { name: 'orderId' }, 
          { $inc: { value: 1 } }, 
          { new: true, upsert: true }
      );
      return `Order #${String(counter.value).padStart(5, '0')}`;
  } catch (err) {
      console.error('Error generating order ID:', err);
      return null; // หากเกิดข้อผิดพลาด, คืนค่า null
  }
}

module.exports = {createProduct,getProductById,reduceStockById,getNextOrderId};