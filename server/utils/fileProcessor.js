const crypto=require("crypto")
const brotli=require("brotli")

function generateFileId(){
    return crypto.randomBytes(16).toString('hex');
}

function encryptData(data, key){
    const iv=crypto.randomBytes(16);
    const cipher=crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted=Buffer.concat([cipher.update(data), cipher.final()]);
    const authTag=cipher.getAuthTag();
    return Buffer.concat([iv, authTag, encrypted]);
}

function decryptData(encryptedData, key) {
    const iv = encryptedData.slice(0, 16);
    const authTag = encryptedData.slice(16, 32);
    const encrypted = encryptedData.slice(32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted;
  }
  
function compressData(data) {
    return brotli.compress(data);
}
  
  
function decompressData(compressedData) {
    return brotli.decompress(compressedData);
}

function uploadFile(file, encryptionKey) {
    const fileId = generateFileId();
    const chunks = [];

    const chunkSize = 1024 * 1024; // 1 MB chunk size
    for (let offset = 0; offset < file.size; offset += chunkSize) {
      const chunk = file.slice(offset, offset + chunkSize);
      const chunkId = `${fileId}-${chunks.length}`;
      const encryptedChunk = encryptData(Buffer.from(chunk), encryptionKey);
      const compressedChunk = compressData(encryptedChunk);
      chunks.push({ chunkId, data: compressedChunk });
    }

    distributeChunks(chunks);
  
    return fileId;
}
  
function retrieveFile(fileId, encryptionKey) {
    const chunks = retrieveChunks(fileId);
    const decryptedChunks = [];
  
    for (const { chunkId, data } of chunks) {
      const decompressedChunk = decompressData(data);
      const decryptedChunk = decryptData(decompressedChunk, encryptionKey);
      decryptedChunks.push({ chunkId, data: decryptedChunk });
    }
  
    const fileData = Buffer.concat(decryptedChunks.sort((a, b) => a.chunkId.localeCompare(b.chunkId)).map(({ data }) => data));
  
    return fileData;
}
  
function distributeChunks(chunks) {
    console.log('Distributing chunks across devices:', chunks);
}
  
function retrieveChunks(fileId) {
    console.log('Retrieving chunks for fileId:', fileId);
    return [
      { chunkId: `${fileId}-0`, data: Buffer.from('compressed-and-encrypted-chunk-0') },
      { chunkId: `${fileId}-1`, data: Buffer.from('compressed-and-encrypted-chunk-1') },
    ];
}