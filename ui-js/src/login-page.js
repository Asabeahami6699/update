document.addEventListener("DOMContentLoaded", function () {
    const errorMessageElement = document.querySelector('h3');
    if (errorMessageElement && errorMessageElement.textContent.trim() !== "") {
        // Display the error message
        errorMessageElement.style.display = 'block';

        // Make the error message vanish after 5 seconds
        setTimeout(function () {
            errorMessageElement.style.display = 'none';
        }, 4000);
    }
});




  