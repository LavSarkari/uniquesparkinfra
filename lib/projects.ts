import db from './db';

export interface Project {
    id?: number;
    name: string;
    description: string;
    category: 'Residential' | 'Commercial' | 'Interiors' | 'Investment';
    year: number;
    lat: number;
    lng: number;
}

export function getProjects(): Project[] {
    try {
        return db.prepare('SELECT * FROM projects ORDER BY year DESC').all() as Project[];
    } catch (error) {
        console.error('Error fetching projects from DB', error);
        return [];
    }
}

export function addProject(project: Project): Project {
    try {
        const stmt = db.prepare(`
            INSERT INTO projects (name, description, category, year, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(
            project.name,
            project.description,
            project.category,
            project.year,
            project.lat,
            project.lng
        );
        return { ...project, id: result.lastInsertRowid as number };
    } catch (error) {
        console.error('Error adding project to DB', error);
        throw error;
    }
}

export function updateProject(id: number, project: Partial<Project>) {
    const keys = Object.keys(project);
    if (keys.length === 0) return;

    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => (project as any)[key]);

    try {
        db.prepare(`UPDATE projects SET ${setClause} WHERE id = ?`).run(...values, id);
    } catch (error) {
        console.error('Error updating project in DB', error);
        throw error;
    }
}

export function deleteProject(id: number) {
    try {
        db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    } catch (error) {
        console.error('Error deleting project from DB', error);
        throw error;
    }
}
