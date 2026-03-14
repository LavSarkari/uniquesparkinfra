import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'uniquespark.db');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize tables
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

export default db;
