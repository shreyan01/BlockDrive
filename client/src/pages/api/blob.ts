import { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from '@azure/storage-blob';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  if (req.method !== 'POST') {
    
    return res.status(405).end();
    
  }
  const connectionString = process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString!);
  
  
  
  // Get a reference to a container
  
  const containerName = 'datsilo';
  
  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  
  
  
  // Create a blob (file) name
  
  const blobName = req.body.file.name;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
  
  
  
  // Upload data to the blob
  
  const data = req.body; // Assuming you're sending the data as a buffer or string
  
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  
  res.status(200).send(`Upload block blob ${blobName} successfully: ${uploadBlobResponse.requestId}`);
  
  }