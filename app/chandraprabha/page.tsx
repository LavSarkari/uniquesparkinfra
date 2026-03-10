import LeadForm from '@/components/LeadForm';
import { Suspense } from 'react';

export default function ChandraprabhaRealty() {
    const extraFields = (
        <>
            <div className="form-group">
                <label htmlFor="cp_budget" className="form-label">Investment Range</label>
                <select id="cp_budget" name="budget" className="form-select" required>
                    <option value="">Select Range...</option>
                    <option value="under-50L">Under ₹50 Lakhs</option>
                    <option value="50L-1Cr">₹50 Lakhs - ₹1 Crore</option>
                    <option value="1Cr-3Cr">₹1 Crore - ₹3 Crores</option>
                    <option value="3Cr+">₹3 Crores+</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="cp_city" className="form-label">Location of Interest</label>
                <input id="cp_city" type="text" name="city" className="form-input" required placeholder="e.g. Varanasi" defaultValue="Varanasi" />
            </div>
            <div className="form-group">
                <label htmlFor="cp_interest" className="form-label">Property Type</label>
                <input id="cp_interest" type="text" name="interest" className="form-input" placeholder="e.g. Luxury Plots, Villas" />
            </div>
            <div className="form-group">
                <label htmlFor="cp_visit" className="form-label">Preferred Site Visit Date</label>
                <input id="cp_visit" type="date" name="visitDate" className="form-input" />
            </div>
        </>
    );

    return (
        <div>
            {/* Luxury Hero Section */}
            <section style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: 'var(--space-2xl) 0 var(--space-xl)',
                borderBottom: `4px solid var(--brand-chandraprabha)`
            }}>
                <div className="container">
                    <div style={{ maxWidth: '900px' }} className="fade-in">
                        <span style={{
                            display: 'inline-block',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            fontSize: '0.85rem',
                            color: 'var(--brand-chandraprabha)',
                            marginBottom: 'var(--space-md)'
                        }}>
                            Chandraprabha Realty &mdash; Sales Vertical
                        </span>
                        <h1 style={{ fontWeight: 300, fontSize: '4rem' }}>
                            Curating <span style={{ color: 'var(--brand-chandraprabha)', fontWeight: 400 }}>Legacy</span> Properties.
                        </h1>
                        <p className="text-lead" style={{ maxWidth: '700px' }}>
                            Access exclusive, fully-vetted luxury plots and residential investments in Varanasi and select NRI corridors.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content & Inquiry Form */}
            <section className="section bg-primary">
                <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
                    gap: 'var(--space-2xl)',
                    alignItems: 'start'
                }}>

                    <div style={{ paddingRight: 'var(--space-md)' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 'var(--space-xl)' }}>
                            The Chandraprabha Advantage
                        </h2>

                        <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
                            <div style={{ paddingLeft: 'var(--space-md)', borderLeft: '1px solid var(--border-color)' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-chandraprabha)' }}>
                                    01 // Prime Location Strategy
                                </h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    We list properties positioned explicitly within high-growth infrastructure corridors, ensuring exceptional medium-to-long term capital appreciation.
                                </p>
                            </div>

                            <div style={{ paddingLeft: 'var(--space-md)', borderLeft: '1px solid var(--border-color)' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-chandraprabha)' }}>
                                    02 // Absolute Legal Transparency
                                </h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    Every listed plot undergoes rigorous 360-degree legal vetting. 100% clear titles and RERA compliance guaranteed for investor peace of mind.
                                </p>
                            </div>

                            <div style={{ paddingLeft: 'var(--space-md)', borderLeft: '1px solid var(--border-color)' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-chandraprabha)' }}>
                                    03 // End-to-End Asset Management
                                </h4>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    From personalized registry assistance to boundary wall construction and formal handover, offering a completely frictionless ownership experience.
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: 'var(--space-2xl)' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 300, borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: 'var(--space-md)' }}>
                                Featured Collection
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                    [Property Image Placeholder]
                                </div>
                                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                    [Property Image Placeholder]
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form sticky sidebar */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        <Suspense fallback={<div style={{ padding: 'var(--space-xl)', textAlign: 'center', border: '1px solid var(--border-light)' }}>Loading secure form...</div>}>
                            <LeadForm
                                brand="Chandraprabha Realty"
                                title="Schedule a Private Viewing"
                                submitButtonText="Request Contact"
                                extraFields={extraFields}
                            />
                        </Suspense>
                    </div>

                </div>
            </section>
        </div>
    );
}
