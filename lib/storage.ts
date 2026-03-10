import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'leads.json');

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  brand: string;
  city: string;
  interest: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_adset?: string;
  utm_keyword?: string;
  gclid?: string;
  fbclid?: string;
  timestamp: string;
  pipelineStage: string;
}

export function getLeads(): Lead[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData) as Lead[];
  } catch (error) {
    console.error('Error reading leads data', error);
    return [];
  }
}

export function saveLead(lead: Omit<Lead, 'id' | 'timestamp' | 'pipelineStage'>): Lead {
  const leads = getLeads();
  
  const newLead: Lead = {
    ...lead,
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
    pipelineStage: 'New Lead'
  };
  
  leads.push(newLead);
  
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(leads, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving lead data', error);
  }
  
  return newLead;
}
