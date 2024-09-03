import { BlobServiceClient } from '@azure/storage-blob';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req:NextApiRequest, res:NextApiResponse) {
    try {
      const { base64File,fileName, contentType  } = req.body;

      const storageAccount = 'datsilo';
      const containerName = 'datsilo';
      const accessKey = process.env.AZURE_BLOB_STORAGE_ACCESS_KEY!;
      const connectionString = process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING!;

      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const filename = `${Date.now()}-${fileName}}`;
      const imageBuffer = Buffer.from(base64File, 'base64');
      const blockBlobClient = containerClient.getBlockBlobClient(filename);
      await blockBlobClient.uploadData(imageBuffer, { blobHTTPHeaders: { blobContentType:contentType || 'application/octet-stream'} });

      res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error occured' });
    }
}