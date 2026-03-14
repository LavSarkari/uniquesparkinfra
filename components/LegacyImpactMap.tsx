'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Minimalist custom icons
const createCustomIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -8],
    });
};

const CATEGORY_COLORS: Record<string, string> = {
    'Residential': 'var(--brand-chandraprabha)',   // Gold
    'Commercial': 'var(--brand-projects)',        // Slate
    'Interiors': 'var(--brand-qalagriha)',        // Copper
    'Investment': '#1a1a1a',                      // Charcoal
    'Default': '#555555'
};

export default function LegacyMap() {
    const [projects, setProjects] = useState<any[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>('All Projects');
    const [filterYear, setFilterYear] = useState<string>('All Time');

    // Varanasi Center
    const mapCenter: L.LatLngExpression = [25.3176, 82.9739];

    useEffect(() => {
        // Fix leaflet marker icon paths in nextjs
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                setProjects(data.projects || []);
            } catch (err) {
                console.error("Error loading projects:", err);
            }
        };
        fetchProjects();
    }, []);

    const getFilteredProjects = () => {
        return projects.filter((project: any) => {
            let passCategory = true;
            let passYear = true;

            const cat = project.category;
            const year = project.year;

            if (filterCategory !== 'All Projects') {
                passCategory = cat === filterCategory;
            }

            if (filterYear !== 'All Time') {
                if (filterYear === 'Before 2015') passYear = year < 2015;
                if (filterYear === '2015–2020') passYear = year >= 2015 && year <= 2020;
                if (filterYear === '2020–Present') passYear = year > 2020;
            }

            return passCategory && passYear;
        });
    };

    const filteredProjects = getFilteredProjects();

    return (
        <div style={{ padding: 'var(--space-2xl) 0', background: 'var(--bg-tertiary)' }}>
            <div className="container">

                {/* Map Header & Filters */}
                <div style={{ marginBottom: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Legacy Impact Map</h2>
                        <p className="text-lead" style={{ maxWidth: '800px' }}>
                            Interact with our geographical footprint to explore the prestigious developments and bespoke interiors that define our legacy.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <select
                            className="form-select"
                            style={{ width: 'auto', minWidth: '200px', padding: '0.75rem 1rem' }}
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            aria-label="Filter by Category"
                        >
                            <option value="All Projects">All Verticals</option>
                            <option value="Residential">Residential Projects</option>
                            <option value="Commercial">Commercial Developments</option>
                            <option value="Interiors">Interior Design</option>
                            <option value="Investment">Investment Grade</option>
                        </select>

                        <select
                            className="form-select"
                            style={{ width: 'auto', minWidth: '200px', padding: '0.75rem 1rem' }}
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            aria-label="Filter by Timeline"
                        >
                            <option value="All Time">All Time</option>
                            <option value="Before 2015">Before 2015</option>
                            <option value="2015–2020">2015–2020</option>
                            <option value="2020–Present">2020–Present</option>
                        </select>
                    </div>
                </div>

                {/* Map Container */}
                <div style={{
                    height: '600px',
                    width: '100%',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    {typeof window !== 'undefined' && (
                        <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>

                            {/* Premium Light Basemap - CartoDB Positron */}
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            />

                            {filteredProjects.map((project: any) => {
                                const lat = project.lat;
                                const lng = project.lng;
                                const cat = project.category || 'Default';
                                const color = CATEGORY_COLORS[cat] || CATEGORY_COLORS['Default'];

                                return (
                                    <Marker
                                        key={project.id}
                                        position={[lat, lng]}
                                        icon={createCustomIcon(color)}
                                    >
                                        <Popup className="premium-popup">
                                            <div style={{ padding: '0.5rem' }}>
                                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: color, marginBottom: '0.25rem' }}>
                                                    {cat} &middot; {project.year}
                                                </div>
                                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                                                    {project.name}
                                                </h3>
                                                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                                    {project.description}
                                                </p>
                                                <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', width: '100%' }}>
                                                    View Details
                                                </a>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    )}
                </div>

            </div>
        </div>
    );
}
