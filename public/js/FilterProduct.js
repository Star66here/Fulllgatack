document.addEventListener("DOMContentLoaded", function () {
    const filterName = document.getElementById("filter-name");
    const filterCategory = document.getElementById("filter-category");
    const filterPrice = document.getElementById("filter-price");

    const productCards = document.querySelectorAll(".product-card");

    // ฟังก์ชันการกรองสินค้า
    function filterProducts() {
        const nameValue = filterName.value.toLowerCase();
        const categoryValue = filterCategory.value;
        const priceValue = filterPrice.value;

        productCards.forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
            const category = card.closest(".product-category").querySelector("h3").textContent;
            const price = card.querySelector(".card-text").textContent.replace("Price: $", "").trim();
        
            let isNameMatch = title.includes(nameValue.toLowerCase());
            let isCategoryMatch = categoryValue === "" || category === categoryValue;
            let isPriceMatch = priceValue === "" || price === priceValue;
        
            if (isNameMatch && isCategoryMatch && isPriceMatch) {
                card.parentElement.style.display = ""; // แสดงสินค้า
            } else {
                card.parentElement.style.display = "none"; // ซ่อนสินค้า
            }
        });        
    }
    // Event Listeners
    filterName.addEventListener("input", filterProducts);
    filterCategory.addEventListener("change", filterProducts);
    filterPrice.addEventListener("change", filterProducts);
});