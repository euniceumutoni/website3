// Form validation
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Reset error messages
  nameInput.setCustomValidity('');
  emailInput.setCustomValidity('');
  messageInput.setCustomValidity('');

  // Validate name
  if (nameInput.value.trim() === '') {
    nameInput.setCustomValidity('Please enter your name.');
  }

  // Validate email
  if (emailInput.value.trim() === '') {
    emailInput.setCustomValidity('Please enter your email address.');
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailInput.setCustomValidity('Please enter a valid email address.');
  }

  // Validate message
  if (messageInput.value.trim() === '') {
    messageInput.setCustomValidity('Please enter a message.');
  }

  // If all fields are valid, submit the form
  if (form.checkValidity()) {
    form.submit();
  }
});

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service provider
  auth: {
    user: 'your-email@gmail.com', // Replace with your email address
    pass: 'your-email-password', // Replace with your email password
  },
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to handle form submission and send email
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Set up email options
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your email address
      to: 'axellaeunice24@gmail.com', // Replace with the recipient email address
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});