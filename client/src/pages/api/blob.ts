// pages/api/upload.js




import { BlobServiceClient } from '@azure/storage-blob';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

if (req.method !== 'POST') {

return res.status(405).json({ message: 'Method Not Allowed' });

}

// Create the BlobServiceClient object which will be used to create a container client

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING!);
console.log(process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING);



// Get a reference to a container

const containerName = 'datsilo';

const containerClient = blobServiceClient.getContainerClient(containerName);




// Create a unique blob name

const blobName = `${Date.now()}-${req.body.name}`;
const blockBlobClient = containerClient.getBlockBlobClient(blobName);




// Upload data to the blob

const data = req.body;
const uploadBlobResponse = await blockBlobClient.upload(data, data.length);

res.status(200).json({
  message: `Upload block blob ${blobName} successfully`,
  requestId: uploadBlobResponse.requestId
});

}
