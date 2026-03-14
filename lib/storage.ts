import db from './db';

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
    const rows = db.prepare('SELECT * FROM leads ORDER BY timestamp DESC').all() as any[];
    return rows.map(row => ({
      ...row,
      pipelineStage: row.pipeline_stage // Map DB naming to frontend naming
    }));
  } catch (error) {
    console.error('Error reading leads from DB', error);
    return [];
  }
}

export function saveLead(lead: Omit<Lead, 'id' | 'timestamp' | 'pipelineStage'>): Lead {
  const id = Math.random().toString(36).substring(2, 9);
  const timestamp = new Date().toISOString();
  const pipelineStage = 'New Lead';

  try {
    const stmt = db.prepare(`
      INSERT INTO leads (
        id, name, phone, email, brand, city, interest, 
        utm_source, utm_medium, utm_campaign, utm_adset, utm_keyword, 
        gclid, fbclid, timestamp, pipeline_stage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id, lead.name, lead.phone, lead.email, lead.brand, lead.city, lead.interest,
      lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_adset, lead.utm_keyword,
      lead.gclid, lead.fbclid, timestamp, pipelineStage
    );

    return { ...lead, id, timestamp, pipelineStage };
  } catch (error) {
    console.error('Error saving lead to DB', error);
    throw error;
  }
}

export function deleteLead(id: string): void {
  try {
    db.prepare('DELETE FROM leads WHERE id = ?').run(id);
  } catch (error) {
    console.error('Error deleting lead from DB', error);
    throw error;
  }
}

export function updateLead(id: string, data: Partial<Lead>): void {
  try {
    const fields = Object.keys(data).filter(f => f !== 'id' && f !== 'timestamp');
    if (fields.length === 0) return;

    // Handle camelCase to snake_case mapping for DB if needed
    const dbFields = fields.map(f => f === 'pipelineStage' ? 'pipeline_stage' : f);
    
    const setClause = dbFields.map(f => `${f} = ?`).join(', ');
    const values = fields.map(f => (data as any)[f]);

    const stmt = db.prepare(`UPDATE leads SET ${setClause} WHERE id = ?`);
    stmt.run(...values, id);
  } catch (error) {
    console.error('Error updating lead in DB', error);
    throw error;
  }
}
