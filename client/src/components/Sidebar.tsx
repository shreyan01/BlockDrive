import React from 'react';
import CircularDisk from './StorageDisk';
import DropDown from './dropdown';

interface SidebarProps {
  onFileUpload: (name: string) => void; // Define the prop type
}

const Sidebar: React.FC<SidebarProps> = ({ onFileUpload }) => { // Accept the prop
  return (
    <div className="bg-background1 text-white w-64 h-screen p-4 flex flex-col items-center">
        <DropDown onFileUpload={onFileUpload} /> {/* Pass the prop to DropDown */}
        <CircularDisk used={20} total={100}/>
    </div>
  );
};

export default Sidebar;
