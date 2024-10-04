import React, { useEffect, useState } from 'react'; // Import useEffect
import DashNavbar from './dashboardNavbar';
import Sidebar from './Sidebar';
import FileTemplate from './FileTemplate';
import { BlobServiceClient } from '@azure/storage-blob';

const Dashboard: React.FC = () => {
  const [fileName, setFileName] = useState<string>(''); // State for file name
  const [blobs, setBlobs] = useState<string[]>([]); // State for blob names

  // Function to handle file upload and set the file name
  const handleFileUpload = (name: string) => {
    setFileName(name);
  };

  // Fetch blobs from Azure Blob Storage
  const fetchBlobs = async () => {
    const connectionString = process.env.NEXT_PUBLIC_AZURE_BLOB_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      console.error("Azure Blob Storage connection string is not defined.");
      return; // Exit the function if the connection string is not available
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = 'datsilo';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobList = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      blobList.push(blob.name);
    }
    setBlobs(blobList);
  };

  useEffect(() => {
    fetchBlobs(); // Fetch blobs when the component mounts
  }, []);

  return (
    <div className='flex flex-col bg-background h-screen'>
      <DashNavbar/>
      <div className='flex flex-row'>
        <Sidebar onFileUpload={handleFileUpload} /> {/* Pass the handler to Sidebar */}
        <div className="flex flex-col">
          {blobs.map((blobName) => (
            <FileTemplate key={blobName} fileName={blobName} /> // Render FileTemplate for each blob
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
