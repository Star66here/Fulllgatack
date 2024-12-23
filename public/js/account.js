// ฟังก์ชันที่ทำงานเมื่อหน้าโหลดเสร็จ
window.onload = function () {
    const user = JSON.parse(sessionStorage.getItem('user'));

    // ตรวจสอบสถานะการเข้าสู่ระบบและอัปเดตปุ่ม
    const logoutButton = document.getElementById('logout-button');

    if (user) {
        // ถ้าเข้าสู่ระบบแล้ว, แสดงชื่อและอีเมล
        document.getElementById('user-name').innerText = user.name;
        document.getElementById('user-email').innerText = user.email;

        // เปลี่ยนข้อความปุ่มเป็น "Log Out"
        logoutButton.innerText = 'Log Out';

        // เพิ่ม event listener สำหรับการออกจากระบบ
        logoutButton.addEventListener('click', function () {
            // ลบข้อมูลผู้ใช้จาก sessionStorage
            sessionStorage.removeItem('user');

            // เปลี่ยนข้อความปุ่มกลับเป็น "Log In"
            logoutButton.innerText = 'Log In';

            // เปลี่ยนเส้นทางไปที่หน้า login
            window.location.href = '/navigation/login'; // หรือหน้า login ที่ต้องการ
        });
    } else {
        // ถ้าไม่ได้เข้าสู่ระบบ, เปลี่ยนข้อความปุ่มเป็น "Log In"
        logoutButton.innerText = 'Log In';

        // เพิ่ม event listener สำหรับการไปที่หน้า login เมื่อผู้ใช้คลิก "Log In"
        logoutButton.addEventListener('click', function () {
            window.location.href = '/navigation/login'; // หรือหน้า login ที่ต้องการ
        });
    }
};
