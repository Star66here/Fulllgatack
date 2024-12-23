document.getElementById('sign-up-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission reload

    // Get form data
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Send data to server
    try {
        const response = await fetch('/login/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Sign-up successful!');
        } else {
            alert('Sign-up failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during sign-up.');
    }
});

document.getElementById('sign-in-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    // Send data to server
    try {
        const response = await fetch('/login/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            sessionStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = '/navigation/account';
        } else {
            alert('Sign-in failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during sign-in.');
    }
});
