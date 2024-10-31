import { BlobServiceClient } from '@azure/storage-blob';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files, File } from 'formidable';
import { readFile } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { files } = await parseForm(req);
    const fileArray = files.file as File[];
    const file = fileArray[0];  // Get the first file if multiple files are uploaded

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING!);
    const containerName = 'datsilo';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `${Date.now()}-${file.originalFilename || 'unnamed'}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const data = await readFile(file.filepath);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);

    res.status(200).json({
      message: `Upload block blob ${blobName} successfully`,
      requestId: uploadBlobResponse.requestId
    });
  } catch (error) {
    console.error('Error uploading to Azure Blob Storage:', error);
    res.status(500).json({ message: 'Error uploading file', error: (error as Error).message });
  }
}
