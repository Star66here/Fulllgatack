document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.show-now').forEach(button => {
        button.addEventListener('click', (event) => {
            window.location.href ='/navigation/product-details';
        });
    });
});