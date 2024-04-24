document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Handle signup form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = document.getElementById('emailInputSignup').value;
        const passwordInput = document.getElementById('passwordInputSignup').value;

        fetch('/submit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInput, password: passwordInput }),
        })
        .then(handleResponse)
        .catch(handleError);
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = document.getElementById('emailInputLogin').value;
        const passwordInput = document.getElementById('passwordInputLogin').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInput, password: passwordInput }),
        })
        .then(handleResponse)
        .catch(handleError);
    });

    // Common method to handle responses
    function handleResponse(response) {
        if (response.ok) {
            return response.json().then(data => {
                console.log('Success:', data.message);
                if (data.message === 'Login successful') {
                    localStorage.setItem('userId', data.userId); // Store user ID in local storage
                    window.location.href = '/dashboard.html'; // Redirect to dashboard
                } else if (data.message === 'Email and password received and saved successfully') {
                    console.log('User created successfully');
                } else {
                    console.error('Error:', data.message);
                }
            });
        } else {
            return response.text().then(text => { throw new Error(text || 'Request failed') });
        }
    }

    // Common error handling
    function handleError(error) {
        console.error('Error:', error);
    }
});