import React, { useState } from 'react';
import './contactus.style.css';

function ContactUs() {
    // Step 1: Define state variables
    const [showForm, setShowForm] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Step 2: Create a function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        setTimeout(() => {
            setShowForm(false);
            setShowSuccessMessage(true);
        }, 1000);
    };

    return (
        <div id="contact" className="section">
            <h2>Contact Us</h2>
            <p>
                If you have any questions or need assistance, please don't hesitate
                to reach out to our friendly customer support team.
            </p>

            { }
            {showForm ? (
                <form className="contact-form" onSubmit={handleFormSubmit}>
                    {/* Form fields */}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : null}

            {showSuccessMessage ? (
                <div className="success-message">
                    <p>You have submitted successfully!</p>
                </div>
            ) : null}

            <p>Contact Information:</p>
            <ul>
                <li>Email: admin@daraz.com</li>
                <li>Phone: +880 1234567890</li>
                <li>Address: Gulshan 2, Dhaka, Bangladesh</li>
            </ul>
            <p>We look forward to hearing from you!</p>
        </div>
    );
}

export default ContactUs;
