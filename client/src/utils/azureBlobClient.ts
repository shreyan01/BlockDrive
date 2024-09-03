// utils/azureBlob.ts

import { BlobServiceClient} from "@azure/storage-blob";

const getBlobServiceClient = (): BlobServiceClient => {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("Azure Storage connection string is not defined.");
  }
  return BlobServiceClient.fromConnectionString(connectionString);
};

export const uploadFileToBlob = async (fileBuffer: Buffer, fileName: string, fileType: string): Promise<string> => {
  const blobServiceClient = getBlobServiceClient();
  const containerName = 'datsilo';

  if (!containerName) {
    throw new Error("Azure Storage container name is not defined.");
  }

  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Ensure the container exists
  await containerClient.createIfNotExists({
    access: 'container', // Set access level as needed
  });

  const blobClient = containerClient.getBlockBlobClient(fileName);

  const options = {
    blobHTTPHeaders: {
      blobContentType: fileType,
    },
  };

  await blobClient.uploadData(fileBuffer, options);

  return blobClient.url;
};
