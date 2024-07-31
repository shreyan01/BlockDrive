import React, {useState} from "react"
import { FiPlus } from "react-icons/fi";
const DropDown=()=>{
    const [isOpen, SetIsOpen]=useState(false);
    const toggleDropDown=()=>{
        SetIsOpen(!isOpen);
    }
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
                    <a
                    href="#"
                    className="block px-4 py-2 text-sm text-primary hover:bg-background"
                    role="menuitem"
                    >
                    Folder
                    </a>
                    <a
                    href="#"
                    className="block px-4 py-2 text-sm text-primary hover:bg-background"
                    role="menuitem"
                    >
                    Upload File
                    </a>
                    <a
                    href="#"
                    className="block px-4 py-2 text-sm text-primary hover:bg-background"
                    role="menuitem"
                    >
                    Upload Folder
                    </a>
                    <a
                    href="#"
                    className="block px-4 py-2 text-sm text-primary hover:bg-background"
                    role="menuitem"
                    >
                    Google Docs
                    </a>
                </div>
                </div>
            )}
        </div>
    );
}
export default DropDown