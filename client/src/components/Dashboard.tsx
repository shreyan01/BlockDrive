import React, { useState } from 'react';
import DashNavbar from './dashboardNavbar';
import Sidebar from './Sidebar';

// Define a type for the uploaded files
interface FileData {
  name: string;
  size: number;
  type: string;
}

const Dashboard: React.FC = () => {
  return (
    <div className='flex flex-col bg-background h-screen'>
      <DashNavbar/>
      <Sidebar/>
    </div>
  );
};

export default Dashboard;
