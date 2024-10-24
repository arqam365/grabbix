"use client";

import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to an API endpoint
        alert("Message sent! We'll get back to you soon.");
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                Contact Us
            </h1>

            <form className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded shadow-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Send Message
                </button>
            </form>

            <div className="mt-8 text-lg text-gray-800 dark:text-gray-300 text-center">
                <p>Email: <a href="mailto:support@grabbix.com" className="text-blue-500 dark:text-blue-400 hover:underline">support@grabbix.com</a></p>
                <p>Phone: <a href="tel:+918400245060" className="text-blue-500 dark:text-blue-400 hover:underline">+91 8400245060</a></p>
                <p>Address: Awas Vikas Colony, Labour Chauraha, Shivaji Nagar, Jhansi</p>
            </div>
        </div>
    );
};

export default Contact;