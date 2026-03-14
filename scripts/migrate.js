const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const { kml } = require('@tmcw/togeojson');
const { DOMParser } = require('@xmldom/xmldom');

const dbPath = path.join(__dirname, '..', 'data', 'uniquespark.db');
const leadsPath = path.join(__dirname, '..', 'data', 'leads.json');
const kmlPath = path.join(__dirname, '..', 'public', 'data', 'projects.kml');

const db = new Database(dbPath);

// Initialize tables in migration script to ensure they exist
db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        brand TEXT,
        city TEXT,
        interest TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_adset TEXT,
        utm_keyword TEXT,
        gclid TEXT,
        fbclid TEXT,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        pipeline_stage TEXT DEFAULT 'New Lead'
    );

    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        year INTEGER,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

async function migrate() {
    console.log('Starting migration...');

    // 1. Migrate Leads
    if (fs.existsSync(leadsPath)) {
        console.log('Migrating leads...');
        const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
        const insertLead = db.prepare(`
            INSERT OR IGNORE INTO leads (
                id, name, phone, email, brand, city, interest, 
                utm_source, utm_medium, utm_campaign, utm_adset, utm_keyword, 
                gclid, fbclid, timestamp, pipeline_stage
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        db.transaction((leads) => {
            for (const lead of leads) {
                insertLead.run(
                    lead.id, lead.name, lead.phone, lead.email, lead.brand, lead.city, lead.interest,
                    lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_adset, lead.utm_keyword,
                    lead.gclid, lead.fbclid, lead.timestamp, lead.pipelineStage
                );
            }
        })(leads);
        console.log(`Migrated ${leads.length} leads.`);
    }

    // 2. Migrate Projects
    if (fs.existsSync(kmlPath)) {
        console.log('Migrating projects from KML...');
        const kmlText = fs.readFileSync(kmlPath, 'utf8');
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
        const converted = kml(kmlDoc);

        const insertProject = db.prepare(`
            INSERT INTO projects (name, description, category, year, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        db.transaction((features) => {
            for (const feature of features) {
                const [lng, lat] = feature.geometry.coordinates;
                insertProject.run(
                    feature.properties.name,
                    feature.properties.description || '',
                    feature.properties.category || 'Default',
                    parseInt(feature.properties.year) || new Date().getFullYear(),
                    lat,
                    lng
                );
            }
        })(converted.features);
        console.log(`Migrated ${converted.features.length} projects.`);
    }

    console.log('Migration complete.');
}

migrate().catch(err => {
    console.error('Migration failed:', err);
});
