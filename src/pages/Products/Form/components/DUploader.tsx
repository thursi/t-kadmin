import React, { useState } from "react";

interface DocumentUploadProps {
  onFileSelect: (file: File) => void; 
  onError: (error: string) => void; 
  acceptedFileTypes?: string[];
  label?: string; 
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onFileSelect,
  onError,
  acceptedFileTypes = ["image/jpeg", "image/png", "application/pdf"], 
  label = "Select a document",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  console.log(file)

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    console.log(selectedFile)
    if (selectedFile) {
    
      if (!acceptedFileTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload an image or PDF.");
        onError("Invalid file type");
        return;
      }

      setFile(selectedFile);
      setError(""); 
      onFileSelect(selectedFile); 
    }
  };

  return (
    <div className="document-upload p-4 border rounded-md shadow-sm">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <input
        type="file"
        accept={acceptedFileTypes.join(",")}
        onChange={handleFileChange}
        className="w-full py-2 px-3 border border-gray-300 rounded-md"
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {file && (
        <div className="mt-3">
         
          <p className="text-sm">Selected File: {file.name}</p>
          
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
