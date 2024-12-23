import productImages from './productImages.js';

// ฟังก์ชันดึงข้อมูลตะกร้าจาก API
function fetchCartData() {
    return fetch('/api/cart')
        .then(response => response.json())  // แปลงข้อมูลจาก API เป็น JSON
        .catch(error => {
            console.error('Error fetching cart data:', error);
            return []; // คืนค่าตะกร้าว่างหากเกิดข้อผิดพลาด
        });
}

// ฟังก์ชันอัปเดต UI ด้วยข้อมูลจากตะกร้า
function updateCartUI(cart) {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';  // เคลียร์ข้อมูลตะกร้าเก่า

    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your cart is empty!';
        cartContainer.appendChild(emptyMessage);
    } else {
        cart.forEach(item => {
            const cartItem = createCartItemElement(item);
            cartContainer.appendChild(cartItem);
        });
    }

    updateCartSummary(cart);
}

// ฟังก์ชันสร้างองค์ประกอบตะกร้าสินค้า
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item', 'row', 'align-items-center', 'border', 'p-3', 'mb-3', 'rounded', 'shadow-sm');
    cartItem.dataset.id = item.id;

    // สร้างส่วนของภาพสินค้า
    const imgCol = document.createElement('div');
    imgCol.classList.add('col-3', 'text-center');
    const image = document.createElement('img');
    image.src = productImages[item.id] || 'images/default.jpg';
    image.alt = item.name;
    image.classList.add('img-fluid', 'rounded');
    imgCol.appendChild(image);

    // สร้างข้อมูลสินค้า
    const infoCol = document.createElement('div');
    infoCol.classList.add('col-6');
    const name = document.createElement('h3');
    name.textContent = item.name;
    name.classList.add('text-warning');
    const price = document.createElement('p');
    price.textContent = `Price: $${item.price}`;
    const quantityWrapper = createQuantityInput(item);
    infoCol.appendChild(name);
    infoCol.appendChild(price);
    infoCol.appendChild(quantityWrapper);

    // สร้างปุ่ม Remove
    const buttonCol = document.createElement('div');
    buttonCol.classList.add('col-3', 'text-center');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('btn', 'btn-danger', 'remove-item');
    removeBtn.addEventListener('click', () => removeFromCart(item.id));
    buttonCol.appendChild(removeBtn);

    // รวมองค์ประกอบทั้งหมด
    cartItem.appendChild(imgCol);
    cartItem.appendChild(infoCol);
    cartItem.appendChild(buttonCol);

    return cartItem;
}

// ฟังก์ชันสร้าง input สำหรับจำนวนสินค้า
function createQuantityInput(item) {
    const quantityWrapper = document.createElement('div');
    quantityWrapper.classList.add('d-flex', 'align-items-center');
    const quantityLabel = document.createElement('label');
    quantityLabel.textContent = 'Quantity:';
    quantityLabel.classList.add('me-2');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;
    quantityInput.min = 1;
    quantityInput.classList.add('form-control', 'w-50');
    quantityInput.disabled = true;
    quantityWrapper.appendChild(quantityLabel);
    quantityWrapper.appendChild(quantityInput);
    return quantityWrapper;
}

// ฟังก์ชันอัปเดตสรุปข้อมูลในตะกร้า (จำนวนสินค้าและราคา)
function updateCartSummary(cart) {
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');
    totalItems.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    totalPrice.textContent = `$${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
}

// ฟังก์ชันลบสินค้าออกจากตะกร้า
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
        updateCartUI(data); // อัปเดต UI หลังจากลบสินค้า
    })
    .catch(error => {
        console.error('Error removing item from cart:', error);
    });
}

// การใช้งานเมื่อ DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    // ดึงข้อมูลตะกร้าจาก API ทุกครั้งที่หน้าเว็บโหลดใหม่
    fetchCartData().then(cart => {
        updateCartUI(cart);  // อัปเดต UI ด้วยข้อมูลที่ได้
    });

    // การจัดการปุ่ม checkout
    document.querySelectorAll('.btn-custom').forEach(button => {
        button.addEventListener('click', () => {
            fetchCartData().then(cart => {
                if (cart.length === 0) {
                    alert('กรุณาเพิ่มสินค้าในตะกร้าก่อนทำการชำระเงิน');
                } else {
                    window.location.href = '/navigation/checkout';
                }
            });
        });
    });
});
