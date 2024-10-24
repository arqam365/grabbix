"use client";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

const products: Product[] = [
    {
        id: 1,
        name: "Product 1",
        description: "This is the description for product 1.",
        price: 49.99,
        imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
        id: 2,
        name: "Product 2",
        description: "This is the description for product 2.",
        price: 79.99,
        imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
        id: 3,
        name: "Product 3",
        description: "This is the description for product 3.",
        price: 99.99,
        imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    },
];

const ProductsPage = () => {
    return (
        <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
                        <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;