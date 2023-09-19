// scripts.js
const ganeshaImage = document.getElementById('ganeshaImage');
const messageInput = document.getElementById('messageInput');
const imageInput = document.getElementById('imageInput');
const sendButton = document.getElementById('sendButton');
const emailInput = document.getElementById('emailInput');
const sendViaEmailButton = document.getElementById('sendViaEmailButton');
const card = document.querySelector('.card');

sendButton.addEventListener('click', () => {
    messageInput.value = '';
    imageInput.value = ''; 
});

sendViaEmailButton.addEventListener('click', () => {
    const recipientEmail = emailInput.value;

    if (!recipientEmail || !validateEmail(recipientEmail)) {
        alert('Please enter a valid recipient email address.');
        return;
    }

    const emailSubject = 'Ganesha E-card';
    const emailBody = `Here's a Ganesha-themed e-card for you:\n\n${messageInput.value}`;

    if (navigator.share) {
        navigator.share({
            title: emailSubject,
            text: emailBody,
        }).then(() => {
            
            emailInput.style.display = 'none';
            sendViaEmailButton.style.display = 'none';

            
            emailInput.value = '';
        }).catch((error) => {
            console.error('Error sharing via navigator.share:', error);
        });
    } else {
        
        const mailtoURL = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoURL;

        
        emailInput.style.display = 'none';
        sendViaEmailButton.style.display = 'none';

        
        emailInput.value = '';
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
