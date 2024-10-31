import { FaFilePdf, FaFileWord, FaFileImage } from 'react-icons/fa';

export const getFileLogo = (fileName: string): JSX.Element => {
    const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  
    switch (extension) {
      case '.doc':
      case '.docx':
        return <FaFileWord />;
      case '.pdf':
        return <FaFilePdf />;
      case '.jpg':
      case '.jpeg':
      case '.png':
        return <FaFileImage />;
      default:
        return <FaFilePdf />;
    }
}

const FileTemplate = ({ fileName }: { fileName: string }) => {
    const logoSrc = getFileLogo(fileName);
    return (
        <div className="flex flex-col m-4 p-2 w-32 h-32 shadow-md items-center">
            {logoSrc}
            <p className="text-sm font-bold text-center truncate">{fileName}</p>
        </div>
    );
}

export default FileTemplate;