import React from 'react';
import DashNavbar from './dashboardNavbar';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className='flex flex-col bg-background h-screen'>
      <DashNavbar/>
      <Sidebar/>
    </div>
  );
};

export default Dashboard;
