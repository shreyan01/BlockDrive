import UploadModal from "./UploadModal"
import React, { useState } from "react";
export default function ComponentPlayground(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        console.log("Opening modal"); // Debugging log
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return(
        <div className="px-4 py-2 text-sm text-primary hover:bg-background flex flex-row items-center justify-center">
                        <button onClick={openModal} className="p-2">Upload File</button>
                        <UploadModal isOpen={isModalOpen} closeModal={closeModal} />
                    </div>
    )
}

