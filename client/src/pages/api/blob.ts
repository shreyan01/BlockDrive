// pages/api/upload.js




import { BlobServiceClient } from '@azure/storage-blob';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

if (req.method !== 'POST') {

return res.status(405).end();

}

// Create the BlobServiceClient object which will be used to create a container client

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING!);




// Get a reference to a container

const containerName = 'datsilo';

const containerClient = blobServiceClient.getContainerClient(containerName);




// Create a blob (file) name

const blobName = 'datsilo';

const blockBlobClient = containerClient.getBlockBlobClient(blobName);




// Upload data to the blob

const data = req.body; // Assuming you're sending the data as a buffer or string

const uploadBlobResponse = await blockBlobClient.upload(data, data.length);

res.status(200).send(`Upload block blob ${blobName} successfully: ${uploadBlobResponse.requestId}`);

}