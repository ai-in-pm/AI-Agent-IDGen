import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Agent, ActivityLog } from '../types';

interface AgentContextType {
  agents: Agent[];
  activities: ActivityLog[];
  addAgent: (agent: Agent) => void;
  updateAgent: (agentId: string, updates: Partial<Agent>) => void;
  logActivity: (activity: Omit<ActivityLog, 'id'>) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  const addAgent = useCallback((agent: Agent) => {
    setAgents(prev => [...prev, agent]);
    logActivity({
      agentId: agent.id,
      timestamp: new Date(),
      action: 'created',
      details: 'Agent ID assigned'
    });
  }, []);

  const updateAgent = useCallback((agentId: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    ));
  }, []);

  const logActivity = useCallback((activity: Omit<ActivityLog, 'id'>) => {
    const newActivity = {
      ...activity,
      id: Math.random().toString(36).substring(2)
    };
    setActivities(prev => [newActivity, ...prev]);
  }, []);

  return (
    <AgentContext.Provider value={{ agents, activities, addAgent, updateAgent, logActivity }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};