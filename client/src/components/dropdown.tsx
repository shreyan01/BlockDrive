import React, {useState} from "react"
import { FiPlus, FiFolder, FiFilePlus, FiFolderPlus } from "react-icons/fi";
import axios from "axios";
const DropDown=()=>{
    const [isOpen, SetIsOpen]=useState(false);
    const toggleDropDown=()=>{
        SetIsOpen(!isOpen);
    }
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileUpload = async () => {
        if (selectedFile) {
          try {
            const formData = new FormData();
            formData.append('file', selectedFile);
    
            const response = await axios.post('/api/blob', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
    
            console.log('File uploaded successfully', response.data);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };
    return(
        <div className="flex flex-col items-center bg-background1 shadow-md w-2/3 m-8 rounded-lg hover:bg-background">
            <button onClick={toggleDropDown} className="bg-transparent inline-flex justify-center w-full items-center flex-row h-10 rounded text-primary"><FiPlus color="#40dfaf"/> New</button>
            {isOpen && (
                <div
                className="origin-top-left absolute left-0 mt-10 w-56 rounded-md shadow-lg z-10 ring-1 ring-black ring-opacity-5 bg-background1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                >
                <div className="py-1" role="none">
                    <div className="px-4 py-2 text-sm text-primary hover:bg-background flex flex-row items-center justify-center p-2">
                    <FiFolder/>
                    <button className="p-2">Folder</button>
                    </div>
                    <div className="px-4 py-2 text-sm text-primary hover:bg-background flex flex-row items-center justify-center">
                    <input type="file" onChange={handleFileChange} />
                        <FiFilePlus/><button onClick={handleFileUpload} className="p-2">Upload File</button>
                    </div>
                    <a
                    href="#"
                    className="flex px-4 py-2 text-sm text-primary hover:bg-background items-center justify-center"
                    role="menuitem"
                    >
                    <FiFolderPlus/>
                    <button className="p-2">Upload Folder</button>
                    </a>
                    <a
                    href="#"
                    className="flex px-4 py-2 text-sm text-primary hover:bg-background items-center justify-center flex-row"
                    role="menuitem"
                    >
                    Docs
                    </a>
                </div>
                </div>
            )}
        </div>
    );
}
export default DropDown