import React, { useState } from 'react';
import { generateBatch } from '../utils/idGenerator';
import { Plus, Download, Power } from 'lucide-react';
import { useAgents } from '../context/AgentContext';
import type { Agent, AgentType, ExportFormat } from '../types';

export const IDGenerator = () => {
  const [count, setCount] = useState(1);
  const [agentType, setAgentType] = useState<AgentType>('assistant');
  const { agents, addAgent, updateAgent, logActivity } = useAgents();

  const handleGenerate = () => {
    const newIds = generateBatch('ai', count);
    newIds.forEach(id => {
      const newAgent: Agent = {
        id,
        type: 'ai',
        agentType,
        createdAt: new Date(),
        status: 'inactive',
        alertLevel: 'none'
      };
      addAgent(newAgent);
    });
  };

  const toggleStatus = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      const newStatus = agent.status === 'active' ? 'inactive' : 'active';
      updateAgent(agentId, {
        status: newStatus,
        lastActivity: new Date()
      });
      logActivity({
        agentId,
        timestamp: new Date(),
        action: 'status_change',
        details: `Status changed to ${newStatus}`
      });
    }
  };

  const handleExport = (format: ExportFormat) => {
    const data = agents.map(agent => ({
      id: agent.id,
      type: agent.agentType,
      status: agent.status,
      created: agent.createdAt.toLocaleString(),
      lastActivity: agent.lastActivity?.toLocaleString() || 'N/A',
      alertLevel: agent.alertLevel
    }));

    let content = '';
    switch (format) {
      case 'json':
        content = JSON.stringify(data, null, 2);
        break;
      case 'csv':
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(obj => Object.values(obj).join(','));
        content = [headers, ...rows].join('\n');
        break;
      default:
        alert('This export format is not yet implemented');
        return;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-agents-export.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Generate IDs</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AI Agent Type
          </label>
          <select
            value={agentType}
            onChange={(e) => setAgentType(e.target.value as AgentType)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="assistant">Assistant</option>
            <option value="analyzer">Analyzer</option>
            <option value="controller">Controller</option>
            <option value="executor">Executor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Batch Size
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Generate AI Agent IDs</span>
        </button>
      </div>

      {agents.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">Generated Agents</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport('json')}
                className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-indigo-50"
              >
                <Download className="w-4 h-4" />
                <span>JSON</span>
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-indigo-50"
              >
                <Download className="w-4 h-4" />
                <span>CSV</span>
              </button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-md p-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white p-4 rounded border border-gray-200 mb-2 last:mb-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{agent.id}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        Created: {agent.createdAt.toLocaleString()}
                      </span>
                      <span className="text-sm px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                        {agent.agentType}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStatus(agent.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      agent.status === 'active'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{agent.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};