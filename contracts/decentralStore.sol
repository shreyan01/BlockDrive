// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedStorage {
    struct File {
        string hash;
        string fileName;
        string fileType;
        uint256 fileSize;
        address uploader;
    }

    mapping(uint256 => File) public files;
    uint256 public fileCount;

    event FileUploaded(
        uint256 fileId,
        string hash,
        string fileName,
        string fileType,
        uint256 fileSize,
        address uploader
    );

    function uploadFile(
        string memory _hash,
        string memory _fileName,
        string memory _fileType,
        uint256 _fileSize
    ) public {
        require(bytes(_hash).length > 0, "File hash is required");
        require(bytes(_fileName).length > 0, "File name is required");
        require(bytes(_fileType).length > 0, "File type is required");
        require(_fileSize > 0, "File size should be greater than zero");

        fileCount++;
        files[fileCount] = File(_hash, _fileName, _fileType, _fileSize, msg.sender);

        emit FileUploaded(fileCount, _hash, _fileName, _fileType, _fileSize, msg.sender);
    }
}

