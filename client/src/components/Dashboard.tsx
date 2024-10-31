import React, { useEffect, useState } from 'react';
import DashNavbar from './dashboardNavbar';
import Sidebar from './Sidebar';
import FileTemplate from './FileTemplate';
import { BlobServiceClient } from '@azure/storage-blob';

const Dashboard: React.FC = () => {
  const [blobs, setBlobs] = useState<string[]>([]);

  const fetchBlobs = async () => {
    const connectionString = process.env.NEXT_PUBLIC_AZURE_BLOB_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      console.error("Azure Blob Storage connection string is not defined.");
      return;
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = 'datsilo';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobList: string[] = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      blobList.push(blob.name);
    }
    setBlobs(blobList);
  };

  useEffect(() => {
    fetchBlobs();
  }, []);

  return (
    <div className='flex flex-col bg-background h-screen'>
      <DashNavbar/>
      <div className='flex flex-row'>
        <Sidebar onFileUpload={fetchBlobs} /> {/* Refresh blobs after upload */}
        <div className="flex flex-wrap">
          {blobs.map((blobName) => (
            <FileTemplate key={blobName} fileName={blobName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
