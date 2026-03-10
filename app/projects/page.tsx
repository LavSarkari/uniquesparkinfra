import LeadForm from '@/components/LeadForm';
import { Suspense } from 'react';

export default function UniqueSparkProjects() {
    const extraFields = (
        <>
            <div className="form-group">
                <label htmlFor="proj_budget" className="form-label">Investment Bracket</label>
                <select id="proj_budget" name="budget" className="form-select" required>
                    <option value="">Select Commitment...</option>
                    <option value="50L-2Cr">₹50 Lakhs - ₹2 Crores</option>
                    <option value="2Cr-5Cr">₹2 Crores - ₹5 Crores</option>
                    <option value="5Cr-15Cr">₹5 Crores - ₹15 Crores</option>
                    <option value="15Cr+">₹15 Crores+ (Institutional/HNI)</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="proj_city" className="form-label">Primary Residence / Global Base</label>
                <input type="text" id="proj_city" name="city" className="form-input" required placeholder="e.g. Dubai, London, Delhi NCR" />
            </div>
            <div className="form-group">
                <label htmlFor="proj_interest" className="form-label">Vehicle of Interest</label>
                <select id="proj_interest" name="interest" className="form-select" required>
                    <option value="">Select Vehicle...</option>
                    <option value="commercial">Commercial Grade A Real Estate</option>
                    <option value="residential-townships">Premium Integrated Townships</option>
                    <option value="jv">Joint Venture / Land Acquisition</option>
                </select>
            </div>
        </>
    );

    return (
        <div>
            {/* Luxury Hero Section */}
            <section style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: 'var(--space-xl) 0',
                borderBottom: `4px solid var(--brand-projects)`
            }}>
                <div className="container">
                    <div style={{ maxWidth: '900px' }} className="fade-in mobile-text-center">
                        <span style={{
                            display: 'inline-block',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            fontSize: '0.8rem',
                            color: 'var(--brand-projects)',
                            marginBottom: 'var(--space-sm)'
                        }}>
                            Unique Spark Projects &mdash; Development Wing
                        </span>
                        <h1 style={{ fontWeight: 300, fontSize: 'clamp(2.50rem, 8vw, 4rem)', lineHeight: 1.2 }}>
                            Engineered <span style={{ color: 'var(--brand-projects)', fontWeight: 400 }}>Returns.</span>
                        </h1>
                        <p className="text-lead" style={{ maxWidth: '700px', marginInline: 'auto' }}>
                            Strategic partner access to landmark commercial centers, smart infrastructure, and world-class residential townships. Built for generational wealth.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content & Inquiry Form */}
            <section className="section bg-primary">
                <div className="container mobile-grid-1" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
                    gap: 'var(--space-2xl)',
                    alignItems: 'start'
                }}>

                    <div>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2rem)', fontWeight: 300, marginBottom: 'var(--space-lg)' }}>
                            Institutional Grade Architecture
                        </h2>

                        <div style={{ display: 'grid', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>

                            <div style={{ paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--border-light)' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-projects)' }}>
                                    High-Yield Commercial Hubs
                                </h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    A-grade developments strategically positioned in central business districts. Engineered to attract top-tier retail brands and Fortune 500 corporate tenants, resulting in extraordinary rental yields and high capital density.
                                </p>
                            </div>

                            <div style={{ paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--border-light)' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-projects)' }}>
                                    Self-Sustaining Townships
                                </h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Masterplanned micro-cities integrating residential luxury with smart infrastructure, international schooling, advanced security grids, and extensive green belts.
                                </p>
                            </div>

                            <div style={{ paddingBottom: 'var(--space-md)' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-projects)' }}>
                                    Fiduciary Responsibility & Governance
                                </h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Operating on a model of absolute financial transparency. We provide dedicated institutional relationship managers, milestone-based equity updates, and rigorous compliance checks at every development phase.
                                </p>
                            </div>
                        </div>

                        <div style={{
                            background: 'var(--bg-primary)',
                            padding: 'var(--space-md) var(--space-lg)',
                            borderLeft: '4px solid var(--brand-projects)',
                            boxShadow: 'var(--shadow-sm)',
                            marginBottom: 'var(--space-xl)'
                        }}>
                            <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-projects)' }}>
                                Active Capital Call
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                We are formally accepting private expressions of interest (EOI) for Phase 1 of our upcoming 15-acre mixed-use development situated in the Varanasi Prime Commercial Corridor.
                            </p>
                            <a href="#form" className="nav-link" style={{ color: 'var(--brand-projects)', fontWeight: 500, fontSize: '0.9rem' }}>
                                Request Investment Prospectus &rarr;
                            </a>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', height: '240px', overflow: 'hidden' }}>
                                <img src="/images/features/us_1.png" alt="Commercial Real Estate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', height: '240px', overflow: 'hidden' }}>
                                <img src="/images/features/us_2.png" alt="Smart Township Development" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>

                    {/* Form sticky sidebar - Adjust for mobile */}
                    <div style={{ position: 'relative', top: '0', maxWidth: '500px', width: '100%', marginInline: 'auto' }} className="desktop-sticky" id="form">
                        <Suspense fallback={<div style={{ padding: 'var(--space-xl)', textAlign: 'center', border: '1px solid var(--border-light)' }}>Loading secure form...</div>}>
                            <LeadForm
                                brand="Unique Spark Projects"
                                title="Partner Direct Access"
                                submitButtonText="Request Pitch Deck"
                                extraFields={extraFields}
                            />
                        </Suspense>
                    </div>

                </div>
            </section>
        </div>
    );
}
