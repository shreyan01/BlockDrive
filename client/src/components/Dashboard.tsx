import React from 'react';
import DashNavbar from './dashboardNavbar';
import Sidebar from './Sidebar';
import FileTemplate from './FileTemplate';

const Dashboard: React.FC = () => {
  return (
    <div className='flex flex-col bg-background h-screen'>
      <DashNavbar/>
      <div className='flex flex-row'>
      <Sidebar/>
      <FileTemplate/>
      </div>
    </div>
  );
};

export default Dashboard;
