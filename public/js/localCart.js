// ฟังก์ชันสำหรับเพิ่มสินค้าไปยัง LocalStorage
function addToLocalCart(productId) {
    // ดึงข้อมูลตะกร้าสินค้าจาก LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ตรวจสอบว่าสินค้านี้มีอยู่ในตะกร้าแล้วหรือไม่
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        // ถ้ามีอยู่แล้ว เพิ่มจำนวนสินค้า
        existingItem.quantity += 1;
    } else {
        // ถ้าไม่มี เพิ่มสินค้าใหม่ในตะกร้า
        cart.push({ id: productId, quantity: 1 });
    }

    // บันทึกข้อมูลตะกร้ากลับไปยัง LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('LocalStorage cart updated:', cart);
}

// ฟังก์ชันเพื่อดึงข้อมูลตะกร้าสินค้าจาก LocalStorage
function getLocalCart() {
    // ดึงข้อมูลจาก LocalStorage หากไม่มีข้อมูลจะคืนค่าเป็นอาร์เรย์ว่าง
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// ส่งออกทั้งสองฟังก์ชันด้วยการ export default
export default { addToLocalCart, getLocalCart };
