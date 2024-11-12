import React from 'react';
import { IDGenerator } from '../components/IDGenerator';
import { MonitoringPanel } from '../components/MonitoringPanel';

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <IDGenerator />
      <MonitoringPanel />
    </div>
  );
};