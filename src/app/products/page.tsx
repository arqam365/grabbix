"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // Ensure this path matches your project structure

type Product = {
    id: string; // Firestore IDs are strings, not numbers
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]); // State to store fetched products
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState<string | null>(null); // State to track errors

    useEffect(() => {
        // Function to fetch products from Firestore
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData: Product[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Product[]; // Cast data as Product array
                setProducts(productsData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
    }

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
                        <p className="text-lg font-bold mb-4">₹{product.price.toFixed(2)}</p>
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