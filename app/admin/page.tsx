'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [leads, setLeads] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterBrand, setFilterBrand] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'dashboard' | 'projects'>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

    useEffect(() => {
        fetchLeads();
        fetchProjects();
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

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data.projects || []);
        } catch (error) {
            console.error('Fetch Projects Exception:', error);
        }
    };

    const handleUpdateLead = async (id: string, status: string) => {
        try {
            const res = await fetch('/api/leads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, pipelineStage: status })
            });
            if (res.ok) fetchLeads();
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    const handleDeleteLead = async (id: string) => {
        if (!confirm('Are you sure you want to remove this lead?')) return;
        try {
            const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchLeads();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm('Permanently delete this project from the portfolio?')) return;
        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchProjects();
        } catch (error) {
            console.error('Delete project failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const exportToCSV = () => {
        const headers = ["Name", "Email", "Phone", "Brand", "Interest", "City", "Date", "Status"];
        const rows = leads.map(l => [
            l.name, l.email, l.phone, l.brand, l.interest || '', l.city || '', 
            new Date(l.timestamp).toLocaleDateString(), l.pipelineStage
        ].map(val => `"${val}"`).join(","));
        
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `UniqueSpark_Leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredLeads = leads
        .filter(l => filterBrand === 'All' || l.brand === filterBrand)
        .filter(l => 
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.phone.includes(searchQuery)
        );

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalLeads = leads.length;

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
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                        style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                    >
                        <span style={{ marginRight: '0.75rem' }}>📊</span> Executive Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('projects')}
                        className={`sidebar-link ${activeTab === 'projects' ? 'active' : ''}`}
                        style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                    >
                        <span style={{ marginRight: '0.75rem' }}>🏗️</span> Project Portfolio
                    </button>
                    <div className="sidebar-link" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                        <span style={{ marginRight: '0.75rem' }}>📈</span> Intelligence
                    </div>
                </nav>

                <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid #F1F1F1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#18181B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, color: '#FFFFFF' }}>CA</div>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#18181B', fontWeight: 600 }}>Corporate Admin</div>
                            <div style={{ fontSize: '0.7rem', color: '#71717A' }}>Official Access</div>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        style={{ width: '100%', padding: '0.65rem', background: '#F4F4F5', color: '#18181B', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}
                    >
                        Logout Session
                    </button>
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
                        <h1 style={{ fontSize: '1.85rem', fontWeight: 600, marginBottom: '0.25rem', color: '#18181B' }}>
                            {activeTab === 'dashboard' ? 'Executive Overview' : 'Geospatial Portfolio'}
                        </h1>
                        <p style={{ color: '#71717A', fontSize: '0.95rem' }}>Corporate Portal &bull; Multi-Division intelligence</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {activeTab === 'dashboard' && (
                            <button onClick={exportToCSV} className="btn" style={{ background: '#F4F4F5', color: '#18181B', padding: '0.65rem 1.25rem', fontSize: '0.85rem', borderRadius: '6px' }}>
                                Download CSV
                            </button>
                        )}
                        <button onClick={fetchLeads} className="btn" style={{ background: '#18181B', color: '#fff', padding: '0.65rem 1.25rem', fontSize: '0.85rem', borderRadius: '6px' }}>
                            {loading ? 'Syncing...' : 'Sync Intelligence'}
                        </button>
                    </div>
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

                {activeTab === 'dashboard' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem' }} className="mobile-grid-1">
                        {/* Leads Table Container */}
                        <div className="dash-table-container">
                            <div style={{ padding: '1.25rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', gap: '1rem', flexWrap: 'wrap' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, minWidth: '150px' }}>Portfolio Pipeline</h3>
                                <div style={{ display: 'flex', gap: '0.75rem', flex: 1, justifyContent: 'flex-end', minWidth: '300px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Search identity or email..."
                                        className="form-input"
                                        style={{ maxWidth: '250px', padding: '0.45rem 1rem', fontSize: '0.8rem' }}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
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
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table className="dash-table">
                                    <thead>
                                        <tr>
                                            <th>Identity</th>
                                            <th>Vertical</th>
                                            <th>Intelligence</th>
                                            <th>Status</th>
                                            <th>Manage</th>
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
                                                            {lead.phone && <span>📞 {lead.phone}</span>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <select 
                                                            value={lead.pipelineStage} 
                                                            onChange={(e) => handleUpdateLead(lead.id, e.target.value)}
                                                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #E4E4E7', cursor: 'pointer' }}
                                                        >
                                                            <option value="New Lead">New Lead</option>
                                                            <option value="Contacted">Contacted</option>
                                                            <option value="Interested">Interested</option>
                                                            <option value="Site Visit">Site Visit</option>
                                                            <option value="Negotiation">Negotiation</option>
                                                            <option value="Converted">Converted</option>
                                                            <option value="Archived">Archived</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button 
                                                            onClick={() => handleDeleteLead(lead.id)}
                                                            style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer', padding: '0.5rem' }}
                                                        >
                                                            Delete
                                                        </button>
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
                ) : (
                    <div className="dash-table-container">
                        <div style={{ padding: '1.25rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', gap: '1rem', flexWrap: 'wrap' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Geospatial Portfolio</h3>
                            <div style={{ display: 'flex', gap: '0.75rem', flex: 1, justifyContent: 'flex-end' }}>
                                <input 
                                    type="text" 
                                    placeholder="Search project name..."
                                    className="form-input"
                                    style={{ maxWidth: '250px', padding: '0.45rem 1rem', fontSize: '0.8rem' }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button 
                                    onClick={() => setIsProjectFormOpen(true)}
                                    className="btn btn-primary" 
                                    style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                                >
                                    + New Project
                                </button>
                            </div>
                        </div>

                        {isProjectFormOpen && (
                            <div style={{ padding: '2rem', borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
                                <h4 style={{ marginBottom: '1.5rem' }}>Add New Institutional Project</h4>
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const data = Object.fromEntries(formData.entries());
                                    await fetch('/api/projects', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            ...data,
                                            lat: parseFloat(data.lat as string),
                                            lng: parseFloat(data.lng as string),
                                            year: parseInt(data.year as string)
                                        })
                                    });
                                    setIsProjectFormOpen(false);
                                    fetchProjects();
                                }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        <input name="name" placeholder="Project Name" className="form-input" required />
                                        <input name="category" placeholder="Category (e.g. Villas)" className="form-input" required />
                                        <input name="year" type="number" placeholder="Year" className="form-input" required defaultValue={new Date().getFullYear()} />
                                        <input name="lat" type="number" step="any" placeholder="Latitude" className="form-input" required />
                                        <input name="lng" type="number" step="any" placeholder="Longitude" className="form-input" required />
                                        <input name="description" placeholder="Short Description" className="form-input" style={{ gridColumn: '1 / -1' }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                                        <button type="button" onClick={() => setIsProjectFormOpen(false)} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Cancel</button>
                                        <button type="submit" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Publish Project</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div style={{ overflowX: 'auto' }}>
                            <table className="dash-table">
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Category</th>
                                        <th>Year</th>
                                        <th>Location</th>
                                        <th>Management</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProjects.length === 0 ? (
                                        <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#71717A' }}>No institutional projects found.</td></tr>
                                    ) : (
                                        filteredProjects.map((project: any) => (
                                            <tr key={project.id}>
                                                <td>
                                                    <div style={{ fontWeight: 600, color: '#18181B' }}>{project.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#71717A', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.description}</div>
                                                </td>
                                                <td>
                                                    <span className="status-badge" style={{ background: '#F4F4F5', color: '#3F3F46', border: '1px solid #E4E4E7' }}>
                                                        {project.category}
                                                    </span>
                                                </td>
                                                <td>{project.year}</td>
                                                <td style={{ fontSize: '0.75rem', color: '#71717A' }}>{project.lat.toFixed(4)}, {project.lng.toFixed(4)}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button style={{ background: 'none', border: 'none', color: '#18181B', cursor: 'not-allowed', fontSize: '0.75rem', opacity: 0.5 }}>Edit</button>
                                                        <button 
                                                            onClick={() => handleDeleteProject(project.id)}
                                                            style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.75rem' }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Mobile Nav Toggle */}
            <button className="mobile-nav-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? '✕' : '☰'}
            </button>
        </div >
    );
}
