// This runs when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio Summary Page Loaded Successfully!");

    // Example: You could add a dynamic greeting based on time of day
    const welcomeText = document.getElementById('welcome-text');
    const hour = new Date().getHours();
    
    if (hour < 12) {
        console.log("Good Morning!");
    } else if (hour < 18) {
        console.log("Good Afternoon!");
    } else {
        console.log("Good Evening!");
    }
});