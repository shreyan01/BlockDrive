import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new formidable.IncomingForm();
    const [ files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Process the uploaded file
    const fileArray = files.file as unknown as formidable.File[];
    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Azure Blob Storage setup and upload logic here
    // ...

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the upload' });
  }
}