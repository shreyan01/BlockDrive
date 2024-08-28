import { Dialog } from "@headlessui/react";

interface UploadModalProps {
    isOpen: boolean;
    closeModal: () => void; // Explicitly type the closeModal prop
}

const UploadModal:React.FC<UploadModalProps>=({isOpen, closeModal})=>{
    return(
        <Dialog open={isOpen} onClose={closeModal} as="div" className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black/30"/>
            <span className="block h-screen" aria-hidden="true">
                &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-background shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-primary">
                    Upload File
                </Dialog.Title>
                <div className="mt-2">
                    <input type="file" name="Upload from your system"/>
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="button" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-white rounded-md shadow-sm hover:bg-[#3cb590] focus:outline-none focus:ring-offset-2 focus:ring-black" onClick={closeModal}>Upload</button>
                    <button type="button" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-400 border border-white rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-offset-2 focus:ring-black" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
        </Dialog>
    )
}

export default UploadModal