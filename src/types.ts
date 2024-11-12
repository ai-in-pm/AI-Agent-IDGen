export type AlertLevel = 'low' | 'medium' | 'high' | 'none';
export type AgentType = 'assistant' | 'analyzer' | 'controller' | 'executor';

export interface Agent {
  id: string;
  type: 'ai';
  agentType: AgentType;
  createdAt: Date;
  lastActivity?: Date;
  alertLevel: AlertLevel;
  status: 'active' | 'inactive' | 'suspended';
}

export interface ActivityLog {
  id: string;
  agentId: string;
  timestamp: Date;
  action: string;
  details: string;
}

export type ExportFormat = 'csv' | 'json' | 'pdf' | 'xlsx' | 'docx';