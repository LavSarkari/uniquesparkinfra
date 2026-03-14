const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'uniquespark.db');
const db = new Database(dbPath);

const leads = [
    {
        id: 'L001',
        name: 'Arjun Sharma',
        phone: '+91 98765 43210',
        email: 'arjun.sharma@gmail.com',
        brand: 'Chandraprabha Realty',
        city: 'Varanasi',
        interest: 'Luxury Villa Plot - Phase 2',
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'varanasi_realestate_search',
        utm_keyword: 'luxury plots in varanasi',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        pipeline_stage: 'Interested'
    },
    {
        id: 'L002',
        name: 'Priya Verma',
        phone: '+91 88776 65544',
        email: 'priya.v@outlook.com',
        brand: 'QalaGriha Interiors',
        city: 'Lucknow',
        interest: 'Full Home Interior Design',
        utm_source: 'fb',
        utm_medium: 'social',
        utm_campaign: 'interiors_luxury_living',
        utm_adset: 'homeowners_lucknow',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        pipeline_stage: 'Contacted'
    },
    {
        id: 'L003',
        name: 'Rajesh Gupta',
        phone: '+91 77665 54433',
        email: 'r.gupta@bizcorp.in',
        brand: 'Unique Spark Projects',
        city: 'Varanasi',
        interest: 'Commercial Office Space - Spark Tower',
        utm_source: 'meta',
        utm_medium: 'paid_social',
        utm_campaign: 'spark_tower_launch',
        utm_adset: 'business_owners_up',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        pipeline_stage: 'New Lead'
    },
    {
        id: 'L004',
        name: 'Anjali Singh',
        phone: '+91 99887 76655',
        email: 'anjali.s@gmail.com',
        brand: 'Chandraprabha Realty',
        city: 'Varanasi',
        interest: 'Residential Plot Inquiry',
        utm_source: 'organic',
        utm_medium: 'direct',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        pipeline_stage: 'Site Visit'
    },
    {
        id: 'L005',
        name: 'Vikram Malhotra',
        phone: '+91 91223 34455',
        email: 'v.malhotra@techsoft.com',
        brand: 'QalaGriha Interiors',
        city: 'Noida',
        interest: 'Office Interior Renovation',
        utm_source: 'instagram',
        utm_medium: 'stories',
        utm_campaign: 'modern_office_concepts',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        pipeline_stage: 'Negotiation'
    },
    {
        id: 'L006',
        name: 'Suresh Kumar',
        phone: '+91 88009 91122',
        email: 'skumar@industries.co',
        brand: 'Unique Spark Projects',
        city: 'Varanasi',
        interest: 'Industrial Warehouse Allotment',
        utm_source: 'google',
        utm_medium: 'display',
        utm_campaign: 'industrial_hub_up',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        pipeline_stage: 'Converted'
    },
    {
        id: 'L007',
        name: 'Meera Reddy',
        phone: '+91 70011 22334',
        email: 'meera.reddy@yahoo.com',
        brand: 'Chandraprabha Realty',
        city: 'Varanasi',
        interest: 'Gated Community Plot',
        utm_source: 'fb',
        utm_medium: 'groups',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        pipeline_stage: 'Archived'
    }
];

const projects = [
    {
        name: 'Spark Corporate Tower',
        description: 'State-of-the-art office spaces in the heart of the city.',
        category: 'Commercial',
        year: 2024,
        lat: 25.3176,
        lng: 82.9739
    },
    {
        name: 'Chandraprabha Estate Phase II',
        description: 'Premium residential plots with modern amenities.',
        category: 'Residential',
        year: 2023,
        lat: 25.3356,
        lng: 82.9901
    },
    {
        name: 'Legacy Heritage Mall',
        description: 'A premium retail and entertainment destination.',
        category: 'Commercial',
        year: 2022,
        lat: 25.2818,
        lng: 83.0084
    }
];

function seed() {
    console.log('Starting data seeding...');

    // Clear existing leads and projects for a fresh start
    db.exec('DELETE FROM leads');
    db.exec('DELETE FROM projects');

    const insertLead = db.prepare(`
        INSERT INTO leads (
            id, name, phone, email, brand, city, interest, 
            utm_source, utm_medium, utm_campaign, utm_adset, utm_keyword, 
            timestamp, pipeline_stage
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertProject = db.prepare(`
        INSERT INTO projects (name, description, category, year, lat, lng)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    db.transaction(() => {
        for (const lead of leads) {
            insertLead.run(
                lead.id, lead.name, lead.phone, lead.email, lead.brand, lead.city, lead.interest,
                lead.utm_source || null, lead.utm_medium || null, 
                lead.utm_campaign || null, lead.utm_adset || null, lead.utm_keyword || null,
                lead.timestamp, lead.pipeline_stage
            );
        }

        for (const project of projects) {
            insertProject.run(
                project.name, project.description, project.category, project.year, project.lat, project.lng
            );
        }
    })();

    console.log(`Seeded ${leads.length} leads and ${projects.length} projects.`);
    console.log('Seeding complete.');
}

seed();
