document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", category: "category1", price: 100 },
        { id: 2, name: "Product 2", category: "category2", price: 150 },
        { id: 3, name: "Product 3", category: "category1", price: 200 },
    ];

    const productList = document.querySelector('.product-list');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    let cart = [];

    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        cart.push(product);
        renderCart();
    };

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${product.name} - $${product.price}`;
            cartItems.appendChild(itemDiv);
            total += product.price;
        });
        totalElement.textContent = `Total: $${total}`;
    }

    renderProducts(products);
});
