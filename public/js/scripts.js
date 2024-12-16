document.addEventListener('DOMContentLoaded', () => {
    // เมื่อโหลด DOM เสร็จแล้ว ค้นหาปุ่มทั้งหมดที่มีคลาส .btn-custom
    document.querySelectorAll('.btn-custom').forEach(button => {
        button.addEventListener('click', (event) => {
            // ดึงข้อมูลจาก attributes ของปุ่ม
            const productId = event.target.dataset.id;
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);  // ดึงราคาสินค้า
            
            // ส่งข้อมูลสินค้าที่เลือกไปยังเซิร์ฟเวอร์เพื่อเพิ่มลงในตะกร้า
            fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: productId,
                    name: productName,
                    price: productPrice,
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




document.addEventListener('DOMContentLoaded', () => {
    // ฟังก์ชันในการจัดการปุ่มที่ต้องการนำทาง
    const navigateButtons = [
        { selector: '#home-button', target: '/navigation' },
        { selector: '#products-button', target: '/navigation/product' },
        { selector: '#product-details-button', target: '/navigation/product-details' },
        { selector: '#cart-button', target: '/navigation/cart' },
        { selector: '#checkout-button', target: '/navigation/checkout' },
        { selector: '#account-button', target: '/navigation/account' }
    ];

    // วนลูปผ่านแต่ละปุ่มและเพิ่ม event listener
    navigateButtons.forEach(buttonInfo => {
        const button = document.querySelector(buttonInfo.selector);
        if (button) {
            button.addEventListener('click', () => {
                // นำทางไปยังหน้าที่กำหนด
                window.location.href = buttonInfo.target;
            });
        }
    });
});



// ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
function removeFromCart(productId) {
    fetch('/api/cart/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item removed from cart:', data);
        updateCartUI(data);  // อัปเดต UI หลังจากลบสินค้า
    })
    .catch(error => {
        console.error('Error removing item from cart:', error);
    });
}
