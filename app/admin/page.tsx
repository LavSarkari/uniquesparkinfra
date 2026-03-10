'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterBrand, setFilterBrand] = useState('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
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
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-brand">
                    <h2 style={{ color: '#18181B', fontSize: '1.25rem', fontWeight: 600, margin: 0, letterSpacing: '0.01em' }}>
                        Unique Spark <span style={{ opacity: 0.5, fontWeight: 300 }}>Portal</span>
                    </h2>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-link active">
                        <span style={{ marginRight: '0.75rem' }}>📊</span> Dashboard
                    </div>
                    <div className="sidebar-link">
                        <span style={{ marginRight: '0.75rem' }}>👥</span> CRM Leads
                    </div>
                    <div className="sidebar-link">
                        <span style={{ marginRight: '0.75rem' }}>📈</span> Analytics
                    </div>
                    <div className="sidebar-link">
                        <span style={{ marginRight: '0.75rem' }}>⚙️</span> Settings
                    </div>
                </nav>

                <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid #F1F1F1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#18181B', border: '1px solid #18181B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, color: '#FFFFFF' }}>CA</div>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#18181B', fontWeight: 600 }}>Corporate Admin</div>
                            <div style={{ fontSize: '0.7rem', color: '#71717A' }}>Official Access</div>
                        </div>
                    </div>
                </div>
            </aside>
            {/* Main Content */}
            <main className="dashboard-main">
                {/* Header */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '2.5rem',
                    gap: '1.5rem',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ minWidth: '250px', flex: '1' }}>
                        <h1 style={{ fontSize: '1.85rem', fontWeight: 600, marginBottom: '0.25rem', color: '#18181B' }}>Executive Overview</h1>
                        <p style={{ color: '#71717A', fontSize: '0.95rem' }}>Corporate Portal &bull; Multi-Division intelligence</p>
                    </div>
                    <button onClick={fetchLeads} className="btn" style={{ background: '#18181B', color: '#fff', padding: '0.65rem 1.25rem', fontSize: '0.85rem', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                        {loading ? 'Syncing...' : 'Sync Intelligence'}
                    </button>
                </header>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div className="dash-card">
                        <div style={{ color: '#71717A', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Total Qualified Pipeline</div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 600, color: '#18181B' }}>{totalLeads}</div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#10B981' }}>↑ 12.5% from last month</div>
                    </div>
                    {[
                        { name: 'Chandraprabha', brand: 'Chandraprabha Realty', color: 'var(--brand-chandraprabha)' },
                        { name: 'QalaGriha', brand: 'QalaGriha Interiors', color: 'var(--brand-qalagriha)' },
                        { name: 'Unique Spark Dev', brand: 'Unique Spark Projects', color: 'var(--brand-projects)' }
                    ].map(division => (
                        <div key={division.name} className="dash-card" style={{ borderLeft: `4px solid ${division.color}` }}>
                            <div style={{ color: '#71717A', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>{division.name}</div>
                            <div style={{ fontSize: '2.25rem', fontWeight: 600, color: '#18181B' }}>
                                {leads.filter(l => l.brand === division.brand).length}
                            </div>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#71717A' }}>Leads registered</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem' }} className="mobile-grid-1">
                    {/* Leads Table Container */}
                    <div className="dash-table-container">
                        <div style={{ padding: '1.25rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Portfolio Pipeline</h3>
                            <select
                                className="form-select"
                                style={{ width: '180px', padding: '0.45rem 1rem', fontSize: '0.8rem', borderRadius: '4px' }}
                                value={filterBrand}
                                onChange={(e) => setFilterBrand(e.target.value)}
                            >
                                <option value="All">Global Portfolio</option>
                                <option value="Chandraprabha Realty">Chandraprabha</option>
                                <option value="QalaGriha Interiors">QalaGriha</option>
                                <option value="Unique Spark Projects">Unique Spark Projects</option>
                            </select>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table className="dash-table">
                                <thead>
                                    <tr>
                                        <th>Identity</th>
                                        <th>Vertical</th>
                                        <th>Intelligence</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#71717A' }}>
                                                No active pipeline events found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredLeads.map((lead: any) => (
                                            <tr key={lead.id}>
                                                <td>
                                                    <div style={{ fontWeight: 600, color: '#18181B' }}>{lead.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#71717A' }}>{lead.email}</div>
                                                </td>
                                                <td>
                                                    <span className="status-badge" style={{ background: '#F4F4F5', color: '#3F3F46', border: '1px solid #E4E4E7' }}>
                                                        {lead.brand.split(' ')[0]}
                                                    </span>
                                                </td>
                                                <td style={{ maxWidth: '280px' }}>
                                                    <div style={{ color: '#18181B', fontWeight: 500, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                                                        {lead.interest || 'General Inquiry'}
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', display: 'flex', gap: '0.4rem', color: '#71717A' }}>
                                                        {lead.city && <span>📍 {lead.city}</span>}
                                                        {lead.budget && <span>• 💰 {lead.budget}</span>}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="status-badge" style={{ background: '#F0FDF4', color: '#166534', border: '1px solid #DCFCE7' }}>
                                                        {lead.pipelineStage}
                                                    </span>
                                                </td>
                                                <td style={{ color: '#71717A', fontSize: '0.8rem' }}>
                                                    {new Date(lead.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Analytics Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="dash-card">
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#71717A' }}>
                                Lead Attribution
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {Object.entries(sources).sort((a: any, b: any) => b[1] - a[1]).map(([source, count]: any) => {
                                    const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                                    return (
                                        <div key={source}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                                <span style={{ color: '#3F3F46', textTransform: 'capitalize' }}>{source}</span>
                                                <span style={{ fontWeight: 600, color: '#18181B' }}>{percentage}%</span>
                                            </div>
                                            <div style={{ height: '6px', background: '#F4F4F5', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${percentage}%`,
                                                    height: '100%',
                                                    background: '#18181B',
                                                    borderRadius: '3px'
                                                }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="dash-card" style={{ background: '#FFFFFF' }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: '#71717A' }}>
                                Campaign Impact
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {Object.entries(campaigns).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([campaign, count]: any) => (
                                    <div key={campaign} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '0.75rem', background: '#F9FAFB', borderRadius: '6px', border: '1px solid #F1F1F1' }}>
                                        <span style={{ color: '#18181B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{campaign.replace(/_/g, ' ')}</span>
                                        <span style={{ fontWeight: 600, color: '#18181B' }}>{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Nav Toggle */}
            <button className="mobile-nav-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? '✕' : '☰'}
            </button>
        </div >
    );
}
