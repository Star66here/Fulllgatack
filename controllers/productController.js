// controllers/productController.js
const { Product, Counter, Order } = require('../data/Model');

// ฟังก์ชันสร้างสินค้าลงในฐานข้อมูล
const createProduct = async (name, price, stock = 0, category = '') => {
  try {
    // สร้าง instance ของ Product
    const product = new Product({
      name: name,          // ชื่อสินค้า
      price: price,        // ราคา
      stock: stock,        // จำนวนสต๊อก (เริ่มต้นเป็น 0)
      category: category   // หมวดหมู่สินค้า (เริ่มต้นเป็นค่าว่าง)
    });

    // บันทึกสินค้าใหม่ลงในฐานข้อมูล
    const savedProduct = await product.save();
    console.log('สินค้าถูกสร้างเรียบร้อยแล้ว:', savedProduct);
    return savedProduct;  // คืนค่าผลลัพธ์สินค้า
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้างสินค้า:', error);
    throw error;  // ส่งข้อผิดพลาดไปยังตัวเรียก
  }
};

// ฟังก์ชันดึงข้อมูลสินค้าจาก ID
const getProductById = async (id) => {
  try {
    // ค้นหาสินค้าจาก _id และเลือกเฉพาะ name และ price
    const product = await Product.findById(id).select('name price');

    if (!product) {
      throw new Error('Product not found'); // ถ้าสินค้าไม่พบ
    }

    return product;  // คืนข้อมูลสินค้า
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;  // ส่งข้อผิดพลาดไปยังตัวเรียก
  }
};

// ฟังก์ชันลดจำนวนสินค้าตาม ID
async function reduceStockById(productId, quantityToReduce) {
  try {
    if (quantityToReduce <= 0) {
      throw new Error('Quantity to reduce must be greater than 0');  // ตรวจสอบจำนวนที่ลด
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');  // หากไม่พบสินค้า
    }

    if (product.stock < quantityToReduce) {
      throw new Error('Not enough stock to reduce');  // หากสต๊อกไม่พอ
    }

    // ลดจำนวนสต๊อก
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, 
      { $inc: { stock: -quantityToReduce } }, 
      { new: true }  // คืนค่าข้อมูลที่อัพเดต
    );

    console.log('Stock reduced successfully:', updatedProduct);
  } catch (err) {
    console.error('Error updating stock:', err.message);
  }
}

// ฟังก์ชันเพิ่มจำนวนสินค้าในสต๊อก
async function increaseStockById(productId, quantityToAdd) {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');  // หากไม่พบสินค้า
    }

    // เพิ่มจำนวนสต๊อก
    product.stock += quantityToAdd;
    await product.save();

    console.log(`Product ${product.name} stock updated. New stock: ${product.stock}`);
    return product;  // คืนข้อมูลสินค้าที่อัพเดต
  } catch (err) {
    console.error('Error increasing stock:', err);
    throw err;  // ส่งข้อผิดพลาดไปยังตัวเรียก
  }
}

// ฟังก์ชันสร้างหมายเลขคำสั่งซื้อถัดไป
async function getNextOrderId() {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: 'orderId' }, 
      { $inc: { value: 1 } }, 
      { new: true, upsert: true }
    );
    return `Order #${String(counter.value).padStart(5, '0')}`;  // คืนหมายเลขคำสั่งซื้อ
  } catch (err) {
    console.error('Error generating order ID:', err);
    return null;  // คืนค่า null หากเกิดข้อผิดพลาด
  }
}

// ฟังก์ชันค้นหาคำสั่งซื้อจาก ID
const getOrderById = async (id) => {
  try {
    const order = await Order.findById(id).select('orderId date totalPrice');  // เลือกเฉพาะข้อมูลที่จำเป็น

    if (!order) {
      throw new Error('Order not found');
    }

    return order;  // คืนข้อมูลคำสั่งซื้อ
  } catch (error) {
    console.error('Error fetching Order by ID:', error);
    throw error;  // ส่งข้อผิดพลาดไปยังตัวเรียก
  }
};

// ฟังก์ชันค้นหาคำสั่งซื้อจากชื่อ
async function findOrderByuserId(searchuserId) {
  try {
    const result = await Order.find({ userId: searchuserId }).select('orderId Status date totalPrice');

    if (result.length > 0) {
      console.log("Found orders:", result);
    } else {
      console.log("No orders found with the name:", searchuserId);
    }

    return result;  // คืนค่าผลลัพธ์
  } catch (err) {
    console.error("Error:", err);
    throw err;  // ส่งข้อผิดพลาดไปยังตัวเรียก
  }
}

module.exports = { createProduct, getProductById, reduceStockById, getNextOrderId, findOrderByuserId };