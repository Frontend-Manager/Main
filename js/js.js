document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Create a FormData object
        const formData = new FormData(form);

        // Convert FormData to JSON for Formspree
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send data to Formspree
        fetch('https://formspree.io/f/xnnaylbo', {  // Replace with your actual Formspree endpoint
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                openPopup();
                form.reset(); // Optionally reset the form
            } else {
                throw new Error('Submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Submission failed. Please try again.');
        });
    });
});

// Function to open the popup
function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Smooth scrolling with offset for fixed header
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetID = this.getAttribute('href').substring(1); // Remove the '#' from href
        const targetSection = document.getElementById(targetID);

        if (targetSection) {
            const headerOffset = document.querySelector('header')?.offsetHeight || 0; // height of the fixed header
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


f
