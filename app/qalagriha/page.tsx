import LeadForm from '@/components/LeadForm';
import { Suspense } from 'react';

export default function QalaGrihaInteriors() {
    const extraFields = (
        <>
            <div className="form-group">
                <label htmlFor="qg_type" className="form-label">Property Type</label>
                <select id="qg_type" name="propertyType" className="form-select" required>
                    <option value="">Select Category...</option>
                    <option value="apartment">Apartment / Penthouse</option>
                    <option value="villa">Independent Villa / Estate</option>
                    <option value="commercial">Office / Corporate Space</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="qg_budget" className="form-label">Estimated Budget</label>
                <select id="qg_budget" name="budget" className="form-select" required>
                    <option value="">Select Budget...</option>
                    <option value="under-15L">Under ₹15 Lakhs</option>
                    <option value="15L-35L">₹15 Lakhs - ₹35 Lakhs</option>
                    <option value="35L-75L">₹35 Lakhs - ₹75 Lakhs</option>
                    <option value="75L+">₹75 Lakhs+</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="qg_city" className="form-label">City Base</label>
                <input id="qg_city" type="text" name="city" className="form-input" required placeholder="e.g. Varanasi, NCR" defaultValue="Varanasi" />
            </div>
            <div className="form-group">
                <label htmlFor="qg_visit" className="form-label">Desired Consultation Date</label>
                <input id="qg_visit" type="date" name="visitDate" className="form-input" />
            </div>
        </>
    );

    return (
        <div>
            {/* Luxury Hero Section */}
            <section style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: 'var(--space-2xl) 0 var(--space-xl)',
                borderBottom: `4px solid var(--brand-qalagriha)`
            }}>
                <div className="container">
                    <div style={{ maxWidth: '900px' }} className="fade-in">
                        <span style={{
                            display: 'inline-block',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            fontSize: '0.85rem',
                            color: 'var(--brand-qalagriha)',
                            marginBottom: 'var(--space-md)'
                        }}>
                            QalaGriha Interiors &mdash; Design Studio
                        </span>
                        <h1 style={{ fontWeight: 300, fontSize: '4rem' }}>
                            Spatial <span style={{ color: 'var(--brand-qalagriha)', fontWeight: 400 }}>Artistry.</span>
                        </h1>
                        <p className="text-lead" style={{ maxWidth: '700px' }}>
                            We transform premium residential and corporate spaces through bespoke interior architecture and meticulous turnkey execution.
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
                            Our Capabilities
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-qalagriha)' }}>
                                    Luxury Residences
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    Complete turnkey solutions crafted for premium villas and high-end apartments. Expect uncompromising material selection and exquisite detailing.
                                </p>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-qalagriha)' }}>
                                    Modular Intelligence
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    Ultra-modern, highly ergonomic culinary spaces and wardrobe systems designed directly from Europe's finest manufacturing methodologies.
                                </p>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-qalagriha)' }}>
                                    Corporate Workspaces
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    Brand-forward, optimized office environments built to foster productivity, collaboration, and intense focus for modern teams.
                                </p>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--brand-qalagriha)' }}>
                                    3D Experiential Rendering
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    Walk through your spatial reality before execution begins through our flawless, photorealistic architectural visualizations.
                                </p>
                            </div>
                        </div>

                        <div style={{ background: 'var(--bg-tertiary)', padding: 'var(--space-xl)', border: '1px solid var(--border-light)' }}>
                            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                                "QalaGriha approaches interiors not as decoration, but as a deep psychological study of the user. Our newly finished 4BHK feels less like an apartment, and more like a private, luxurious retreat."
                            </p>
                            <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                — Anjali M., Varanasi
                            </div>
                        </div>
                    </div>

                    {/* Form sticky sidebar */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        <Suspense fallback={<div style={{ padding: 'var(--space-xl)', textAlign: 'center', border: '1px solid var(--border-light)' }}>Loading secure form...</div>}>
                            <LeadForm
                                brand="QalaGriha Interiors"
                                title="Commission a Project"
                                submitButtonText="Request Consultation"
                                extraFields={extraFields}
                            />
                        </Suspense>
                    </div>

                </div>
            </section>
        </div>
    );
}
