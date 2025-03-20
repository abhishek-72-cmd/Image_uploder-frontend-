
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const [images, setImages] = useState([]); // Stores uploaded images
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    // Fetch user ID from localStorage on mount
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
          
        if (!storedUserId) {
            console.error("User ID not found in localStorage. Redirecting to login.");
            navigate("/login");
        } else {
            fetchImages(storedUserId); // ✅ Fetch images for the user
        }
    }, [navigate]);

    // Fetch images for the logged-in user
    const fetchImages = async (userId) => {
        if (!userId) {
            console.error("User ID not found.");
            return;
        }
        try {
            const response = await axios.get(`https://image-uploder.onrender.com/api/getimages/${userId}`);;
            console.log("Fetched Images:", response.data); // ✅ Debugging step
    
            // Ensure that response.data is an array of images
            if (Array.isArray(response.data)) {
                setImages(response.data); // ✅ Store images in state
            } else {
                console.error("Invalid image data format received:", response.data);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };
    // Handle file selection
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    // Upload selected image
    const uploadImage = async () => {
        if (!selectedFile) {
            console.error("No file selected");
            return;
        }

        const userId = localStorage.getItem("userId"); // Get userId from localStorage
        if (!userId) {
            console.error("User ID not found");
            return;
        }

        setUploading(true); // Show uploading state
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("userId", userId);

        try {
            const response = await fetch(`https://image-uploder.onrender.com/api/upload/${userId}`, {
                method: "POST",
                body: formData,
                headers: {
                    userid: userId, // ✅ Send userId in headers
                },
            });

            const data = await response.json();
            console.log("Upload Response:", data);

            if (response.ok) {
                fetchImages(userId); // Refresh images after upload
                alert("Image uploaded successfully!"); // ✅ Show success alert
            setSelectedFile(null); // ✅ Reset file selection
            }
        } catch (error) {
            console.error("Upload Error:", error);
        } finally {
            setUploading(false); // Reset uploading state
        }
    };

    // Delete image
    const deleteImage = async (id) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID is missing. Cannot delete image.");
            return;
        }

        try {
            await axios.delete(`https://image-uploder.onrender.com/api/delete/${id}`);;
            alert("image deleted successfully")
            console.log("Image deleted successfully");
            fetchImages(userId); // Refresh images after deletion
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    // Logout functionality
    const handleLogout = () => {
        localStorage.removeItem("userId"); // ✅ Remove userId from localStorage
        navigate("/login");
    };

    return (
        <div className="container mx-auto p-4 text-center">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Welcome, User!</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            <p className="text-lg text-gray-600 mb-6">Upload your favorite images here!</p>

            <div className="mb-4">
                <input type="file" onChange={handleFileChange} className="mb-2" />
                <button
                    onClick={uploadImage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload Image"}
                </button>
            </div>

            {images.length === 0 ? (
                <p className="text-gray-500">No images uploaded yet.</p>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative border rounded p-2">
                            <img
                                src={image.image_url}
                                alt="Uploaded"
                                className="w-full h-48 object-cover rounded"
                            />
                            <button
                                onClick={() => deleteImage(image.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
