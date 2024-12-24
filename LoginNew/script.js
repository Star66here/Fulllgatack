const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordLink = document.getElementById("forgot-password-link");
    const forgotPasswordForm = document.getElementById("forgot-password");
    const signInForm = document.querySelector(".sign-in");
    const backToLoginLink = document.getElementById("back-to-login");

    // ตรวจสอบว่าทุกองค์ประกอบถูกต้อง
    if (!forgotPasswordLink || !forgotPasswordForm || !signInForm || !backToLoginLink) {
        console.error("One or more elements not found!");
        return;
    }

    // แสดงหน้าลืมรหัสผ่าน
    forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault();
        signInForm.style.display = "none"; // ซ่อนฟอร์ม Sign In
        forgotPasswordForm.style.display = "block"; // แสดงฟอร์มลืมรหัสผ่าน
    });

    // กลับไปหน้าล็อกอิน
    backToLoginLink.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Back to Sign In clicked");
        console.log("forgotPasswordForm:", forgotPasswordForm);
        console.log("signInForm:", signInForm);
        forgotPasswordForm.style.display = "none";
        signInForm.style.display = "block";
    });
    
});
document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('sign-up-form');
    const signInForm = document.getElementById('sign-in-form');

    // เปลี่ยนไปที่ฟอร์ม Sign In หลังจาก Sign Up
    if (window.location.search.includes('showSignin')) {
        signUpForm.style.display = 'none';
        signInForm.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const urlParams = new URLSearchParams(window.location.search);

    // หากมี `showSignin=true` ใน URL ให้แสดงฟอร์ม Sign In
    if (urlParams.has('showSignin')) {
        container.classList.add('active');
    }

    // เพิ่ม Event Listener สำหรับสลับฟอร์ม
    document.getElementById('register').addEventListener('click', () => {
        container.classList.add('active');
    });

    document.getElementById('login').addEventListener('click', () => {
        container.classList.remove('active');
    });
});

