import React from 'react';
import { AlertTriangle, Activity, Clock, Power } from 'lucide-react';
import { useAgents } from '../context/AgentContext';

export const MonitoringPanel = () => {
  const { agents, activities } = useAgents();
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const alertCount = agents.filter(a => a.alertLevel !== 'none').length;
  const last24hActivities = activities.filter(
    a => new Date().getTime() - new Date(a.timestamp).getTime() < 24 * 60 * 60 * 1000
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Real-Time Monitoring</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-green-700 mb-2">
            <Power className="w-5 h-5" />
            <span className="font-medium">Active Agents</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{activeAgents}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-yellow-700 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Alerts</span>
          </div>
          <p className="text-2xl font-bold text-yellow-800">{alertCount}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-700 mb-2">
            <Activity className="w-5 h-5" />
            <span className="font-medium">Last 24h</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{last24hActivities}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Latest Activity</h3>
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity) => {
            const agent = agents.find(a => a.id === activity.agentId);
            if (!agent) return null;

            return (
              <div key={activity.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{agent.id}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    agent.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agent.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {activity.details}
                </p>
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(activity.timestamp).toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};