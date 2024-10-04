import { BlobServiceClient } from "@azure/storage-blob";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING!
      );
      const containerClient = blobServiceClient.getContainerClient("datsilo");
      const file = req.body.file; // Assuming you are sending the file as a FormData object

      const base64FileSize = file.size; // Retrieve the file size from the base64 string

      const blockBlobClient = containerClient.getBlockBlobClient("datsilo");
      await blockBlobClient.upload(file, base64FileSize);

      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading file" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}