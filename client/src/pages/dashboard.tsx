import React from 'react';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

const Dashboard1: React.FC = () => {
  return (
    <div>
      <ProtectedRoute>
      <Dashboard/>
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard1;