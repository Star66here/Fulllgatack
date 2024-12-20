document.addEventListener('DOMContentLoaded', () => {
    const ordersTableBody = document.querySelector("#orders-table tbody");
    const searchInput = document.getElementById("search-input");

    // ตัวอย่างข้อมูลคำสั่งซื้อ
    const orders = [
        { id: 1, item: "สินค้า A", date: "2024-12-01", customer: "คุณสมชาย" },
        { id: 2, item: "สินค้า B", date: "2024-12-05", customer: "คุณสมศรี" },
        { id: 3, item: "สินค้า C", date: "2024-12-10", customer: "คุณสมทรง" },
    ];

    // ฟังก์ชันแสดงรายการคำสั่งซื้อ
    const renderOrders = (orders) => {
        ordersTableBody.innerHTML = ""; // ลบรายการเก่า
        if (orders.length === 0) {
            ordersTableBody.innerHTML = "<tr><td colspan='4'>ไม่พบรายการที่ค้นหา</td></tr>";
            return;
        }
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td><a href="order-details.html?orderId=${order.id}">${order.item}</a></td>
                <td>${order.date}</td>
                <td>${order.customer}</td>
            `;
            ordersTableBody.appendChild(row);
        });
    };

    // ฟังก์ชันค้นหารายการสั่งซื้อด้วยรหัสสินค้า
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();
        const filteredOrders = orders.filter(order =>
            order.id.toString().includes(searchValue) // ค้นหาด้วยรหัสสินค้า
        );
        renderOrders(filteredOrders);
    });

    renderOrders(orders); // เริ่มต้นแสดงรายการ
});
