'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterBrand, setFilterBrand] = useState('All');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/leads');
            const data = await res.json();
            setLeads(data.leads || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = filterBrand === 'All'
        ? leads
        : leads.filter(l => l.brand === filterBrand);

    const totalLeads = leads.length;

    // Dashboard Analytics
    const sources = leads.reduce((acc: any, lead) => {
        const s = lead.utm_source || 'Organic/Direct';
        acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {});

    const campaigns = leads.reduce((acc: any, lead) => {
        const c = lead.utm_campaign || 'None';
        acc[c] = (acc[c] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="bg-tertiary min-h-screen">
            <div className="container" style={{ padding: 'var(--space-lg) 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                    <div className="mobile-text-center" style={{ flex: '1 1 auto' }}>
                        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '0.25rem' }}>Partner Portal</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', letterSpacing: '0.02em' }}>Intelligence & CRM Aggregation</p>
                    </div>
                    <button onClick={fetchLeads} className="btn btn-outline" style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
                        Sync Intelligence
                    </button>
                </div>

                {loading ? (
                    <div className="text-center" style={{ padding: 'var(--space-2xl) 0', color: 'var(--text-muted)' }}>
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Syncing Pipeline Data...</span>
                    </div>
                ) : (
                    <>
                        {/* Top Stats Cards - Responsive */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                            <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Total Qualified</div>
                                <div style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)' }}>{totalLeads}</div>
                            </div>
                            <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderBottom: `3px solid var(--brand-chandraprabha)`, boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Chandraprabha</div>
                                <div style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)' }}>{leads.filter(l => l.brand === 'Chandraprabha Realty').length}</div>
                            </div>
                            <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderBottom: `3px solid var(--brand-qalagriha)`, boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>QalaGriha</div>
                                <div style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)' }}>{leads.filter(l => l.brand === 'QalaGriha Interiors').length}</div>
                            </div>
                            <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', borderBottom: `3px solid var(--brand-projects)`, boxShadow: 'var(--shadow-sm)' }}>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Unique Spark Dev</div>
                                <div style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)' }}>{leads.filter(l => l.brand === 'Unique Spark Projects').length}</div>
                            </div>
                        </div>

                        <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 'var(--space-lg)', alignItems: 'start' }}>

                            {/* Main Data Table */}
                            <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
                                <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 400 }}>Portfolio Pipeline</h3>
                                    <select
                                        className="form-select"
                                        style={{ width: '200px', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                        value={filterBrand}
                                        onChange={(e) => setFilterBrand(e.target.value)}
                                    >
                                        <option value="All">Global Portfolio</option>
                                        <option value="Chandraprabha Realty">Chandraprabha</option>
                                        <option value="QalaGriha Interiors">QalaGriha</option>
                                        <option value="Unique Spark Projects">Unique Spark Projects</option>
                                    </select>
                                </div>

                                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                    <table style={{ minWidth: '800px', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead style={{ background: 'var(--bg-tertiary)' }}>
                                            <tr>
                                                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 500, borderBottom: '1px solid var(--border-light)' }}>Client Identity</th>
                                                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 500, borderBottom: '1px solid var(--border-light)' }}>Vertical</th>
                                                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 500, borderBottom: '1px solid var(--border-light)' }}>Message/Interest</th>
                                                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 500, borderBottom: '1px solid var(--border-light)' }}>Attribution Vector</th>
                                                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 500, borderBottom: '1px solid var(--border-light)' }}>Pipeline Status</th>
                                                <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 500, borderBottom: '1px solid var(--border-light)' }}>Ingestion Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredLeads.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>
                                                        <span style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>No pipeline events recorded.</span>
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredLeads.map((lead: any) => (
                                                    <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                                            <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{lead.name}</div>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.phone}</div>
                                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.email}</div>
                                                        </td>
                                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                                            <span style={{
                                                                display: 'inline-block',
                                                                border: '1px solid var(--border-color)',
                                                                padding: '0.35rem 0.65rem',
                                                                borderRadius: 'var(--radius-sm)',
                                                                fontSize: '0.7rem',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em',
                                                                color: 'var(--text-secondary)'
                                                            }}>
                                                                {lead.brand.split(' ')[0]}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>
                                                            <div style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.25rem' }}>
                                                                {lead.interest || 'General Inquiry'}
                                                            </div>
                                                            <div style={{ fontSize: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                                {lead.city && <span style={{ background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>📍 {lead.city}</span>}
                                                                {lead.budget && <span style={{ background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>💰 {lead.budget}</span>}
                                                                {lead.propertyType && <span style={{ background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>🏢 {lead.propertyType}</span>}
                                                                {lead.visitDate && <span style={{ background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>📅 Site Visit: {lead.visitDate}</span>}
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                                            {lead.utm_source ? (
                                                                <>
                                                                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>{lead.utm_source} &middot; {lead.utm_medium}</div>
                                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>CID: {lead.utm_campaign}</div>
                                                                </>
                                                            ) : (
                                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Direct / Organic</span>
                                                            )}
                                                        </td>
                                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                                            <span style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '0.35rem',
                                                                color: '#166534',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 500
                                                            }}>
                                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
                                                                {lead.pipelineStage}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                            {new Date(lead.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Sidebar Analytics */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                                        Origin Density
                                    </h4>
                                    {Object.entries(sources).length === 0 ? (
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Insufficient data matrix.</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            {Object.entries(sources).sort((a: any, b: any) => b[1] - a[1]).map(([source, count]: any) => {
                                                const percentage = Math.round((count / totalLeads) * 100);
                                                return (
                                                    <div key={source}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                                            <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{source}</span>
                                                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{count}</span>
                                                        </div>
                                                        <div style={{ height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                                                            <div style={{
                                                                width: `${percentage}%`,
                                                                height: '100%',
                                                                background: source === 'google' ? '#4285F4' : source === 'whatsapp' ? '#25D366' : 'var(--text-primary)',
                                                                opacity: 0.8
                                                            }}></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div style={{ background: 'var(--bg-primary)', padding: 'var(--space-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                                        Campaign Performance
                                    </h4>
                                    {Object.entries(campaigns).length === 0 ? (
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Insufficient data matrix.</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {Object.entries(campaigns).sort((a: any, b: any) => b[1] - a[1]).map(([campaign, count]: any) => (
                                                <div key={campaign} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                                                    <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{campaign.replace(/_/g, ' ')}</span>
                                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', background: 'var(--bg-primary)', padding: '0.1rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem', border: '1px solid var(--border-light)' }}>{count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
