import React, { useState } from "react";

interface DocumentUploadProps {
  onFileSelect: (file: File) => void; // Callback when a file is selected
  onError: (error: string) => void; // Callback when there's an error
  acceptedFileTypes?: string[]; // Array of accepted file types (optional)
  label?: string; // Optional label for the file upload input
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onFileSelect,
  onError,
  acceptedFileTypes = ["image/jpeg", "image/png", "application/pdf"], // Default to accepting images and PDFs
  label = "Select a document",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  // Handle file change when a file is selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      // Check if the selected file type is valid
      if (!acceptedFileTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload an image or PDF.");
        onError("Invalid file type");
        return;
      }

      setFile(selectedFile);
      setError(""); // Reset any previous errors
      onFileSelect(selectedFile); // Pass the file to the parent component
    }
  };

  return (
    <div className="document-upload p-4 border rounded-md shadow-sm">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <input
        type="file"
        accept={acceptedFileTypes.join(",")}
        onChange={handleFileChange}
        className="w-full py-2 px-3 border border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {file && (
        <div className="mt-3">
          {/* Display selected file details */}
          <p className="text-sm">Selected File: {file.name}</p>
          {/* Optionally, display the file path */}
          {/* Browsers don't expose full file path for security reasons, but you can show the file name */}
          {/* <p className="text-sm">File Path: {file?.path}</p> */}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
