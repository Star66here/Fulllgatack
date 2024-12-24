document.addEventListener('DOMContentLoaded', async () => {
    // ดึงข้อมูลผู้ใช้และเติมในฟอร์ม
    const response = await fetch('/api/user/profile');
    if (response.ok) {
        const user = await response.json();
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('address').value = user.address || '';
    } else {
        alert('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }

    // ส่งข้อมูลที่แก้ไข
    document.getElementById('edit-profile-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const response = await fetch('/edit-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('บันทึกข้อมูลสำเร็จ');
            window.location.href = '/profile';
        } else {
            alert('เกิดข้อผิดพลาด');
        }
    });
});
