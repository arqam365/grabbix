"use client";

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                About Grabbix
            </h1>
            <p className="text-lg text-gray-800 dark:text-gray-300 mb-4 max-w-xl text-center">
                Welcome to Grabbix! We are your one-stop platform for both wholesale and retail shopping. Our mission is to provide quality products to businesses and individual customers alike, ensuring the best experience for all our users.
            </p>

            <p className="text-lg text-gray-800 dark:text-gray-300 mb-4 max-w-xl text-center">
                Whether you&#39;re a retailer looking to restock your shelves or a customer seeking the best products, Grabbix has got you covered. Our platform is designed to make shopping seamless, fast, and reliable.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                Contact Us
            </h2>

            <div className="text-lg text-gray-800 dark:text-gray-300 text-center">
                <p>Email: <a href="mailto:support@grabbix.store" className="text-blue-500 dark:text-blue-400 hover:underline">support@grabbix.store</a></p>
                <p>Phone: <a href="tel:+916306217765" className="text-blue-500 dark:text-blue-400 hover:underline">+91 6306217765</a></p>
                <p>Address: Awas Vikas Colony, Labour Chauraha, Shivaji Nagar, Jhansi</p>
            </div>
        </div>
    );
};

export default Page;