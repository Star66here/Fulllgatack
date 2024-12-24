document.addEventListener('DOMContentLoaded', () => {
    // เมื่อโหลด DOM เสร็จแล้ว ค้นหาปุ่มทั้งหมดที่มีคลาส .btn-custom
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            // ดึงข้อมูลจาก attributes ของปุ่ม
            const productId = event.target.dataset.id;
  
            // ส่งข้อมูลไปยังเซิร์ฟเวอร์
            fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: productId,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Item added to cart:', data);
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
            });
        });
    });




    // เพิ่มการทำงานสำหรับปุ่ม Remove
document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.closest('.cart-item').dataset.id;  // ดึง id ของสินค้าที่คลิก
            removeFromCart(productId);  // เรียกใช้ฟังก์ชัน removeFromCart() จาก cart.js
        });
    });
});



