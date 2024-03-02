// Define a function to handle form submission
function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get the values entered by the user for email and password
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    // Assuming the correct email and password for the example
    let correctEmail = 'example@example.com';
    let correctPassword = 'password123';
    
    // Check if the entered email and password are correct
    if (email === correctEmail && password === correctPassword) {
        // Redirect to another page if credentials are correct
        window.location.href = 'redirect-page.html'; // Change 'redirect-page.html' to the desired page URL
    } else {
        // Display an error message if credentials are incorrect
        alert('Incorrect email or password. Please try again.');
    }
}

// Add a submit event listener to the login form
document.getElementById('loginForm').addEventListener('submit', handleSubmit);
