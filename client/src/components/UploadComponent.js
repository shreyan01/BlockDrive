import React, { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import DecentralizedStorage from './contracts/DecentralizedStorage.json';

const UploadComponent = () => {
    const [file, setFile] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

    const loadBlockchainData = async () => {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = DecentralizedStorage.networks[networkId];
        if (networkData) {
            const contractInstance = new web3.eth.Contract(DecentralizedStorage.abi, networkData.address);
            setContract(contractInstance);
        } else {
            window.alert('Smart contract not deployed to detected network.');
        }
    };

    useState(() => {
        loadBlockchainData();
    }, []);

    const uploadFile = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const fileHash = response.data.hash;
            const fileName = file.name;
            const fileType = file.type;
            const fileSize = file.size;

            await contract.methods.uploadFile(fileHash, fileName, fileType, fileSize).send({ from: account });
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>Upload File</h2>
            <form onSubmit={uploadFile}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadComponent;
