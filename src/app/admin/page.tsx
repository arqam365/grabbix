"use client";

import { useEffect, useState } from "react";
import {auth, db, storage} from "@/firebase"; // Adjust relative path
import { addDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";

const AdminPanel = () => {
    const [email, setEmail] = useState(""); // Admin email input
    const [password, setPassword] = useState(""); // Admin password input
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [user, setUser] = useState<any>(null); // State to hold authenticated user
    const [error, setError] = useState<string | null>(null); // State to track errors
    const router = useRouter();

    // Monitor auth state changes using Firebase authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Handle sign-in for admin using email and password
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError(null);
        } catch (err) {
            setError("Invalid login credentials. Please try again.");
        }
    };

    // Handle sign-out and redirect to homepage
    const handleSignOut = () => {
        signOut(auth);
        router.push("/"); // Redirect after signing out
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // If not logged in, show login form
    if (!user) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin Login</h1>
                <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 w-full"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Login
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        );
    }

    // Show admin panel if logged in
    return (
        <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Admin Panel</h1>
            <button onClick={handleSignOut} className="bg-red-500 text-white py-2 px-4 rounded mb-4">
                Sign Out
            </button>
            <AdminProductUpload />
        </div>
    );
};

// Product Upload Component
const AdminProductUpload = () => {
    const [productName, setProductName] = useState(""); // Product name input
    const [price, setPrice] = useState<number | "">(""); // Product price input
    const [description, setDescription] = useState(""); // Product description input
    const [imageFile, setImageFile] = useState<File | null>(null); // Image file state
    const [success, setSuccess] = useState<string | null>(null); // Success message
    const [error, setError] = useState<string | null>(null); // Error message
    const [uploading, setUploading] = useState(false); // Uploading state

    // Handle form submission to upload product data to Firestore
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation before submission
        if (!productName || !price || !description || !imageFile) {
            setError("All fields, including an image, are required.");
            return;
        }

        try {
            setUploading(true); // Set the uploading state

            // Upload image to Firebase Storage
            const storageRef = ref(storage, `products/${imageFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Calculate the upload progress percentage
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);

                    // Optionally, you can use this value to update the state and show the progress on the UI
                },
                (error) => {
                    console.error("Image upload error:", error);
                    setError("Failed to upload image.");
                    setUploading(false);
                },
                async () => {
                    // Get the download URL after the image has been uploaded
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addProductToFirestore(downloadURL); // Add product to Firestore with image URL
                    setSuccess("Product added successfully!");
                    resetForm(); // Reset form fields
                    setUploading(false);
                }
            );
        } catch (err) {
            console.error("Error adding product: ", err);
            setError("Failed to add product. Please try again.");
            setUploading(false);
        }
    };

    // Add product to Firestore with the image URL
    const addProductToFirestore = async (imageUrl: string) => {
        try {
            await addDoc(collection(db, "products"), {
                name: productName,
                price: price,
                description: description,
                imageUrl: imageUrl, // Store the image URL
                createdAt: new Date(),
            });
        } catch (err) {
            console.error("Error adding product to Firestore:", err);
            setError("Failed to save product in the database.");
        }
    };

    // Reset form fields after successful submission
    const resetForm = () => {
        setProductName("");
        setPrice("");
        setDescription("");
        setError(null);
        setSuccess(null);
    };

    // Handle image file change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-lg mx-auto">
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="border p-2 rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber || "")}
                className="border p-2 rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
            />
            <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-2 rounded bg-gray-100 dark:bg-gray-800"
            />

            {uploading && <p className="text-blue-500">Uploading image...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
                disabled={uploading}
            >
                {uploading ? "Uploading..." : "Add Product"}
            </button>
        </form>
    );
};

export default AdminPanel;