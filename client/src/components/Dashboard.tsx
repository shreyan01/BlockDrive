import React, { useState } from 'react'; // Import useState
import DashNavbar from './dashboardNavbar';
import Sidebar from './Sidebar';
import FileTemplate from './FileTemplate';

const Dashboard: React.FC = () => {
  const [fileName, setFileName] = useState<string>(''); // State for file name

  // Function to handle file upload and set the file name
  const handleFileUpload = (name: string) => {
    setFileName(name);
  };

  return (
    <div className='flex flex-col bg-background h-screen'>
      <DashNavbar/>
      <div className='flex flex-row'>
        <Sidebar onFileUpload={handleFileUpload} /> {/* Pass the handler to Sidebar */}
        <FileTemplate fileName={fileName} /> {/* Pass fileName as prop */}
      </div>
    </div>
  );
};

export default Dashboard;
