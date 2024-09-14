import { useState } from 'react';
import { FaFilePdf, FaFileWord } from 'react-icons/fa';

export const getFileLogo = (fileName: string): JSX.Element => {
    const extension = fileName.slice(-4);
  
    switch (extension) {
      case '.doc':
      case 'docx':
        return <FaFileWord />;
      case '.pdf':
        return <FaFilePdf />;
      default:
        return <FaFilePdf />; // Assuming default logo is PDF for simplicity
    }
}

const FileTemplate=()=>{
    const [file] = useState("abc.docx"); // Assuming file name is dynamically set or passed as a prop
    const logoSrc=getFileLogo(file);
    return(
        <div className="flex flex-col m-4 p-2 w-1/12 h-1/6 shadow-md">
            {logoSrc}
            <p className="text-sm font-bold">{file}</p>
        </div>
    )
}
export default FileTemplate