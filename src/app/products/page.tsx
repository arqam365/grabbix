"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
};

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData: Product[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Product[];
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

            {products.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg mb-4">We are in the process of adding products to our list. Please check back soon!</p>
                    <p className="text-lg">For inquiries, please <a href="mailto:support@grabbix.store" className="text-blue-500 dark:text-blue-400 hover:underline">contact us</a>.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            {product.imageUrl ? (
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
                                    <span className="text-gray-500 dark:text-gray-400">No Image Available</span>
                                </div>
                            )}
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
                            <p className="text-lg font-bold mb-4">₹{product.price.toFixed(2)}</p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;