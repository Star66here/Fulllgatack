const mysql = require('mysql2');

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
  host: 'localhost',     // หรือที่อยู่ของเซิร์ฟเวอร์ฐานข้อมูล
  user: 'root',          // ชื่อผู้ใช้ฐานข้อมูล
  password: '',          // รหัสผ่านฐานข้อมูล
  database: 'user_database'  // ชื่อฐานข้อมูลที่คุณสร้างไว้
});

// เชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// ฟังก์ชันเพื่อเพิ่มข้อมูลผู้ใช้ใหม่
function addUser(username, email, password) {
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.execute(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      return;
    }
    console.log('User added successfully:', results);
  });
}

// ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้ทั้งหมด
function getUsers() {
  const query = 'SELECT * FROM users';
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching data: ' + err.message);
      return;
    }
    console.log('Users:', results);
  });
}

// เรียกใช้งานฟังก์ชันเพิ่มข้อมูลผู้ใช้
addUser('john_doe', 'john.doe@example.com', 'password123');

// เรียกใช้งานฟังก์ชันดึงข้อมูลผู้ใช้ทั้งหมด
getUsers();

// ปิดการเชื่อมต่อหลังจากดำเนินการเสร็จ
connection.end();
