async function fetchData() {
    const user = JSON.parse(sessionStorage.getItem('user')); // ดึงข้อมูลผู้ใช้จาก sessionStorage

    if (!user || !user.id) {
        console.error('User not logged in or user ID not found.');
        return [];
    }

    try {
        // ส่ง user.id ไปยังเซิร์ฟเวอร์ในการดึงข้อมูลประวัติการสั่งซื้อ
        const response = await fetch(`/account/OrderHistory?userId=${user.id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();

        // ตรวจสอบและจัดการข้อมูลอาร์เรย์ซ้อน
        if (Array.isArray(data) && Array.isArray(data[0])) {
            return data[0]; // คืนค่าเฉพาะอาร์เรย์ชั้นใน
        }
        return Array.isArray(data) ? data : []; // กรณีที่ไม่ใช่อาร์เรย์ซ้อน
    } catch (error) {
        console.error('Error fetching order history data:', error);
        return [];
    }
}


// Create order item HTML structure
function createOrderItem(order) {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item border p-3 mb-3 rounded shadow-sm';

    const orderId = `<p><strong>${order?.orderId || 'N/A'}</strong></p>`;
    const orderDate = `<p>Date: ${order?.date ? new Date(order.date).toLocaleDateString() : 'Unknown'}</p>`;
    const statusClass = order?.Status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark';
    const orderStatus = `
        <p>Status: <span class="badge ${statusClass}">${order?.Status || 'Unknown'}</span></p>
    `;
    const orderTotal = `<p>Total: $${order?.totalPrice?.toFixed(2) || '0.00'}</p>`;

    orderItem.innerHTML = orderId + orderDate + orderStatus + orderTotal;
    return orderItem;
}

async function renderOrderHistory() {
    const orders = await fetchData();

    // ตรวจสอบและแบนอาร์เรย์ซ้อน
    const flatOrders = Array.isArray(orders) ? orders.flat() : [];
    console.log('Flattened Orders:', flatOrders); // ตรวจสอบข้อมูล

    const orderHistorySection = document.querySelector('.order-history');
    orderHistorySection.innerHTML = `<h2 class="text-center mb-4 text-warning">Order History</h2>`;

    if (!flatOrders.length) {
        orderHistorySection.innerHTML += '<p>No orders found.</p>';
        return;
    }

    flatOrders.forEach(order => {
        const orderItem = createOrderItem(order);
        orderHistorySection.appendChild(orderItem);
    });
}


// Initialize rendering when DOM is ready
document.addEventListener('DOMContentLoaded', renderOrderHistory);
