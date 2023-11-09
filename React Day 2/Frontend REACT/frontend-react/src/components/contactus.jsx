import React from 'react';
import './contactus.style.css';

function ContactUs() {
    return (
        <div id="contact" className="section">
            <h2>Contact Us</h2>
            <p>
                If you have any questions or need assistance, please don't hesitate
                to reach out to our friendly customer support team.
            </p>

            <form className="contact-form">
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
