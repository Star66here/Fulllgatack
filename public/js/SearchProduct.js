document.getElementById('search-button').addEventListener('click', function () {
    const searchQuery = document.getElementById('search-input').value.toLowerCase(); // รับค่าการค้นหา
    const products = document.querySelectorAll('.product-card'); // ดึงข้อมูลสินค้าทั้งหมด

    products.forEach(product => {
        const productName = product.querySelector('.card-title').textContent.toLowerCase();

        if (productName.includes(searchQuery)) {
            product.parentElement.style.display = 'block'; // แสดงการ์ดสินค้า
        } else {
            product.parentElement.style.display = 'none'; // ซ่อนการ์ดสินค้า
        }
    });
});
// การรองรับปุ่ม Enter

document.getElementById('search-input').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});
