import React, { useState } from 'react';

// Define a type for the uploaded files
interface FileData {
  name: string;
  size: number;
  type: string;
}

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setFiles(prevFiles => [...prevFiles, ...fileList]);
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    // Placeholder for file upload logic
    // This is where you would typically call your backend API to upload the files
    alert('Files uploaded successfully!');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <strong>{file.name}</strong> ({file.size} bytes, {file.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
