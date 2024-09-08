import { BlobServiceClient } from '@azure/storage-blob';
import type { NextApiRequest, NextApiResponse } from 'next';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const containerName = 'datsilo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log the request body to ensure the data is being sent correctly
    console.log('Request body:', req.body);

    const { fileContent, fileName } = req.body;

    if (!fileContent || !fileName) {
      console.log('Missing fileContent or fileName');
      return res.status(400).json({ error: 'File data is missing' });
    }

    // Initialize BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Check if the container exists
    const containerExists = await containerClient.exists();
    if (!containerExists) {
      console.log('Blob container does not exist:', containerName);
      return res.status(400).json({ error: 'Blob container not found' });
    }

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // Convert file content (base64) to buffer
    const buffer = Buffer.from(fileContent, 'base64');
    await blockBlobClient.uploadData(buffer);

    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error: unknown) {
    console.error('Error uploading file:', error);
    if (error instanceof Error) {
      return res.status(500).json({ error: 'File upload failed', details: error.message });
    } else {
      return res.status(500).json({ error: 'File upload failed', details: 'An unknown error occurred' });
    }
  }
}
