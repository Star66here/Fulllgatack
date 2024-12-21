document.addEventListener('DOMContentLoaded', () => {
    // ฟังก์ชันในการจัดการปุ่มที่ต้องการนำทาง
    const navigateButtons = [
        { selector: '#home-button', target: '/navigation' },
        { selector: '#products-button', target: '/navigation/product' },
        { selector: '#product-details-button', target: '/navigation/product-details' },
        { selector: '#cart-button', target: '/navigation/cart' },
        { selector: '#checkout-button', target: '/navigation/checkout' },
        { selector: '#account-button', target: '/navigation/account' },
        { selector: '#logout-button', target: '/navigation/login' }
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



