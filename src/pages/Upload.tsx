import React, { useState } from 'react';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading:", selectedFile.name);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold">Upload Image</h2>
        <input type="file" onChange={handleFileChange} className="border p-2 w-full mb-2" />
        <button onClick={handleUpload} className="bg-purple-500 text-white p-2 w-full rounded">Upload</button>
      </div>
    </div>
  );
};

export default Upload;