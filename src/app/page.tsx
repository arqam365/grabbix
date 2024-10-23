"use client";
import { useState } from 'react';

const Home = () => {
    const [customerType, setCustomerType] = useState<'wholesale' | 'retail' | null>(null);

    const handleSelect = (type: 'wholesale' | 'retail') => {
        setCustomerType(type);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                Welcome to Grabbix!
            </h1>
            <p className="text-lg mb-4 text-gray-800 dark:text-gray-300">
                Please select your customer type:
            </p>

            <div className="space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow-md"
                    onClick={() => handleSelect('wholesale')}
                >
                    Wholesale
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow-md"
                    onClick={() => handleSelect('retail')}
                >
                    Retail
                </button>
            </div>

            {/* Display the greeting based on customer type */}
            {customerType && (
                <p className="text-2xl mt-6 text-gray-900 dark:text-gray-100">
                    {customerType === 'wholesale'
                        ? 'Hello, Wholesale Customer! Thank you for choosing Grabbix.'
                        : 'Hello, Retail Customer! Welcome to Grabbix.'}
                </p>
            )}
        </div>
    );
};

export default Home;