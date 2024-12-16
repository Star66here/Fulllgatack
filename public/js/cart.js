// public/js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // ดึงข้อมูลตะกร้าจาก API
    fetch('/api/cart')
        .then(response => response.json())
        .then(cart => {
            // อัปเดต UI ด้วยข้อมูลที่ได้จาก API
            updateCartUI(cart);
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
        });
});

// ฟังก์ชัน updateCartUI สำหรับอัปเดต UI
function updateCartUI(cart) {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';  // เคลียร์ข้อมูลตะกร้าเก่า

    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your cart is empty!';
        cartContainer.appendChild(emptyMessage);
    } else {
        cart.forEach(item => {
            // สร้างองค์ประกอบหลัก
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'row', 'align-items-center', 'border', 'p-3', 'mb-3', 'rounded', 'shadow-sm');
            cartItem.dataset.id = item.id;

            // ภาพสินค้า
            const imgCol = document.createElement('div');
            imgCol.classList.add('col-3', 'text-center');
            const image = document.createElement('img');
            image.src = 'default-image.jpg';
            image.alt = item.name;
            image.classList.add('img-fluid', 'rounded');
            imgCol.appendChild(image);

            // ข้อมูลสินค้า
            const infoCol = document.createElement('div');
            infoCol.classList.add('col-6');
            const name = document.createElement('h3');
            name.textContent = item.name;
            name.classList.add('text-warning');
            const price = document.createElement('p');
            price.textContent = `Price: $${item.price}`;
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
            infoCol.appendChild(name);
            infoCol.appendChild(price);
            infoCol.appendChild(quantityWrapper);

            // ปุ่ม Remove
            const buttonCol = document.createElement('div');
            buttonCol.classList.add('col-3', 'text-center');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('btn', 'btn-danger', 'remove-item');
            removeBtn.addEventListener('click', () => {
                removeFromCart(item.id);
            });
            buttonCol.appendChild(removeBtn);

            // รวมทั้งหมดเข้า cartItem
            cartItem.appendChild(imgCol);
            cartItem.appendChild(infoCol);
            cartItem.appendChild(buttonCol);

            // เพิ่ม cartItem เข้า cartContainer
            cartContainer.appendChild(cartItem);
        });
    }

    // อัปเดตข้อมูล Total Items และ Total Price
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');
    totalItems.textContent = cart.length;
    totalPrice.textContent = `$${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
}

