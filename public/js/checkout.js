// ฟังก์ชันดึงข้อมูลตะกร้า
async function fetchCartData() {
    try {
        const response = await fetch('/api/cart');
        return await response.json();  // แปลงข้อมูลจาก API เป็น JSON
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return []; // คืนค่าตะกร้าว่างหากเกิดข้อผิดพลาด
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.querySelector('.checkout-form form');

    // ดักจับการ submit ของฟอร์ม
    checkoutForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

        const formData = new FormData(checkoutForm);
        const user = JSON.parse(sessionStorage.getItem('user')); // ดึงข้อมูลผู้ใช้จาก sessionStorage
        const orderData = {
            name: formData.get('name'),  
            address: formData.get('address'),
            paymentMethod: formData.get('payment-method'),
            userId: user ? user.id : null, // ตรวจสอบ user และส่ง userId
        };

        console.log('Order Data:', orderData);

        if (user) {
            // ถ้ามีข้อมูลผู้ใช้ (เข้าสู่ระบบแล้ว)
            try {
                const cart = await fetchCartData();  // รอให้ข้อมูลตะกร้าถูกดึงมา
                if (cart && cart.length > 0) {
                    const response = await fetch('/checkout/submit-order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(orderData),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Error: ${errorData.message || 'Failed to submit order'}`);
                    }

                    const data = await response.json();
                    console.log('Order submitted successfully:', data);

                    alert('Your order has been submitted successfully!');
                    window.location.href = '/navigation/account'; // เปลี่ยนเส้นทางไปยังหน้า "Thank You"
                } else {
                    alert('Your cart is empty. Please add items to the cart.');
                }
            } catch (error) {
                console.error('Error submitting order:', error);
                alert('There was an issue submitting your order. Please try again.');
            }
        } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ใน sessionStorage (ไม่ได้เข้าสู่ระบบ)
            alert('คุณต้องเข้าสู่ระบบก่อน');
            window.location.href = '/navigation/login'; // หรือหน้า login
        }
    });
});
