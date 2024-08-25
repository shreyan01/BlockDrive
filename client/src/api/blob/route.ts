import { NextApiRequest, NextApiResponse } from "next";
import { getBlobContainerClient } from "../../utils/azureBlobClient";
import { nanoid } from "nanoid";

const containerName='datsilo'

export default async function POST(req:NextApiRequest, res: NextApiResponse){
    try{
        const {file}=req.body;
        const containerClient=getBlobContainerClient(containerName)
        const blobName=`${nanoid()}-${file.name}`;
        const blockBlobClient=containerClient.getBlockBlobClient(blobName);
        const uploadBlobRespone=await blockBlobClient.uploadData(Buffer.from(file.data, 'base64'))
        res.status(200).json({message: 'File uploaded successfully!', blobUrl: blockBlobClient.url});
    }
    catch(error){
        console.error('Upload failed: ', error);
        res.status(500).json({error: 'Upload Failed'});
    
}