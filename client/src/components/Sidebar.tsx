import React from 'react';
import CircularDisk from './StorageDisk';
import DropDown from './dropdown';

const Sidebar = () => {
  return (
    <div className="bg-background1 text-white w-64 h-screen p-4 flex flex-col items-center">
        <DropDown/>
        <CircularDisk used={20} total={100}/>
    </div>
  );
};

export default Sidebar;
