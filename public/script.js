document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('dataForm');
    const loginForm = document.getElementById('loginForm');

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
        .catch(handleError)
        .then(data => {
            if (data.token) {
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                // Redirect to a protected page
                window.location.href = '/protected-page.html';
            } else {
                // Handle login failure
                console.error('Login failed');
            }
        })
        .catch(error => console.error('Error:', error));
        
        
    });

    function handleResponse(response) {
        if (response.ok) {
            return response.json().then(data => {
                // Assuming the server sends back a specific message or data structure for a successful login
                if (data.message === 'Login successful') {
                    console.log(data);
                    window.location.href = '/dashboard.html'; // Redirect on successful login
                } else {
                    // Handle other cases, such as successful signup
                    console.log('Success:', data.message);
                }
            });
        } else {
            // If the response is not ok, throw an error with the status text
            return response.text().then(text => { throw new Error(text || 'Request failed') });
        }
    }
    

    function handleError(error) {
        console.error('Error:', error);
    }
});

