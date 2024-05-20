const express = require('express');
const IPFS = require('ipfs-http-client');
const app = express();
const port = 3000;

// Connect to IPFS
const ipfs = IPFS.create({ host: 'localhost', port: '5001', protocol: 'http' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', async (req, res) => {
    try {
        const file = req.body.file;
        const addedFile = await ipfs.add(file);
        res.send({ hash: addedFile.path });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
