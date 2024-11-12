import React from 'react';
import { Activity, AlertTriangle, Search, Filter } from 'lucide-react';
import type { Agent } from '../types';

const MOCK_AGENTS: Agent[] = [
  {
    id: 'ADAM-XA1-2024-0001',
    type: 'ai',
    createdAt: new Date(),
    lastActivity: new Date(),
    alertLevel: 'low',
    status: 'active'
  },
  {
    id: 'ADAM-YB2-2024-0002',
    type: 'ai',
    createdAt: new Date(),
    lastActivity: new Date(),
    alertLevel: 'medium',
    status: 'active'
  }
];

export const Monitoring = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Agent Monitoring</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                className="pl-10 pr-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-green-700">
                <Activity className="w-5 h-5" />
                <span className="font-medium">Active Agents</span>
              </div>
              <span className="text-2xl font-bold text-green-800">247</span>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-yellow-700">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Active Alerts</span>
              </div>
              <span className="text-2xl font-bold text-yellow-800">3</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Alert Level</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {MOCK_AGENTS.map((agent) => (
                <tr key={agent.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    {agent.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {agent.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      agent.alertLevel === 'low' ? 'bg-green-100 text-green-800' :
                      agent.alertLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {agent.alertLevel}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    2 minutes ago
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};