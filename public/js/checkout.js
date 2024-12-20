document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.querySelector('.checkout-form form');

    // ดักจับการ submit ของฟอร์ม
    checkoutForm.addEventListener('submit', (event) => {
        // ป้องกันการส่งฟอร์มแบบปกติ
        event.preventDefault();

        // ดึงข้อมูลจากฟอร์ม
        const formData = new FormData(checkoutForm);

        const orderData = {
            name: formData.get('name'),
            address: formData.get('address'),
            paymentMethod: formData.get('payment-method'),
        };

        console.log('Order Data:', orderData);

        // ส่งข้อมูลไปยังเซิร์ฟเวอร์ด้วย fetch
        fetch('/checkout/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Order submitted successfully:', data);
            // แสดงข้อความยืนยันหรือเปลี่ยนหน้า
            alert('Your order has been submitted successfully!');
            window.location.href = '/navigation/account'; // เปลี่ยนเส้นทางไปยังหน้า "Thank You"
        })
        .catch(error => {
            console.error('Error submitting order:', error);
            alert('There was an issue submitting your order. Please try again.');
        });
    });
});
