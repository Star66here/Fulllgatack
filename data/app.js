// นำเข้า MySQL2 Library
const mysql = require('mysql2');

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล
const connection = mysql.createConnection({
  host: 'localhost',        // ชื่อโฮสต์ฐานข้อมูล
  user: 'root',             // ชื่อผู้ใช้ฐานข้อมูล
  password: '',             // รหัสผ่านของฐานข้อมูล
  database: 'bananashop' // ชื่อฐานข้อมูลที่สร้างไว้
});

// เชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database!');
});

// ฟังก์ชัน: เพิ่มสินค้าใหม่
function addProduct(name, price, quantity) {
  const query = 'INSERT INTO products (name, price, Quantity_of_products) VALUES (?, ?, ?)';
  connection.execute(query, [name, price, quantity], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      return;
    }
    console.log('Product added successfully:', results);
  });
}

// ฟังก์ชัน: ดึงข้อมูลสินค้าทั้งหมด
function getAllProducts() {
  const query = 'SELECT * FROM products';
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return;
    }
    console.log('All Products:', results);
  });
}

// ฟังก์ชัน: อัปเดตข้อมูลสินค้า
function updateProduct(productId, name, price, quantity) {
  const query = 'UPDATE products SET name = ?, price = ?, Quantity_of_products = ? WHERE product_id = ?';
  connection.execute(query, [name, price, quantity, productId], (err, results) => {
    if (err) {
      console.error('Error updating data:', err.message);
      return;
    }
    console.log(`Product ID ${productId} updated successfully:`, results);
  });
}

// ฟังก์ชัน: ลบสินค้า
function deleteProduct(productId) {
  const query = 'DELETE FROM products WHERE product_id = ?';
  connection.execute(query, [productId], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err.message);
      return;
    }
    console.log(`Product ID ${productId} deleted successfully:`, results);
  });
}

// ปิดการเชื่อมต่อกับฐานข้อมูลเมื่อเสร็จสิ้น
setTimeout(() => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection:', err.message);
      return;
    }
    console.log('Database connection closed!');
  });
}, 3000); // รอ 3 วินาทีก่อนปิดการเชื่อมต่อ
