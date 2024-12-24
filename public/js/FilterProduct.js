document.addEventListener("DOMContentLoaded", function () {
    const filterCategory = document.getElementById("filter-category");
    const filterPrice = document.getElementById("filter-price");

    const productCards = document.querySelectorAll(".product-card");

    // ฟังก์ชันการกรองสินค้า
    function filterProducts() {
        const categoryValue = filterCategory.value;
        const priceValue = filterPrice.value;
    
        const productCards = document.querySelectorAll(".product-card");
    
        productCards.forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            const category = card.closest(".product-category").querySelector("h3").textContent;
            const price = card.querySelector(".card-text").textContent.replace("Price: $", "").trim();
    
            const isCategoryMatch = categoryValue === "" || category === categoryValue;
            const isPriceMatch = priceValue === "" || price === priceValue;
    
            card.parentElement.style.display = (isCategoryMatch && isPriceMatch) ? "" : "none";
        });
    }
    
    // Event Listeners
    filterCategory.addEventListener("change", filterProducts);
    filterPrice.addEventListener("change", filterProducts);
});