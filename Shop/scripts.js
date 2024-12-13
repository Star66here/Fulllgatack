// scripts.js
const cart = [];

function addToCart(productId, productName, productPrice) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    console.log('Cart:', cart);
}

// Example usage
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.dataset.id;
        const productName = event.target.dataset.name;
        const productPrice = parseFloat(event.target.dataset.price);

        addToCart(productId, productName, productPrice);
    });
});
function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product-card');

    allProducts.forEach(product => {
        if (product.dataset.category === category || category === 'all') {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

document.querySelector('#category-filter').addEventListener('change', event => {
    const selectedCategory = event.target.value;
    filterProducts(selectedCategory);
});

