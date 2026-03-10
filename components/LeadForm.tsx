'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface LeadFormProps {
    brand: 'Chandraprabha Realty' | 'QalaGriha Interiors' | 'Unique Spark Projects';
    title: string;
    submitButtonText: string;
    extraFields?: React.ReactNode;
}

export default function LeadForm({ brand, title, submitButtonText, extraFields }: LeadFormProps) {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Marketing attribution params
    const utmSource = searchParams.get('utm_source') || '';
    const utmMedium = searchParams.get('utm_medium') || '';
    const utmCampaign = searchParams.get('utm_campaign') || '';
    const utmAdset = searchParams.get('utm_adset') || '';
    const utmKeyword = searchParams.get('utm_keyword') || '';
    const gclid = searchParams.get('gclid') || '';
    const fbclid = searchParams.get('fbclid') || '';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = { ...data, brand, utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign, utm_adset: utmAdset, utm_keyword: utmKeyword, gclid, fbclid };

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Failed to submit lead.');

            setStatus('success');
            e.currentTarget.reset();
        } catch (err: any) {
            console.error(err);
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    const brandColor = brand === 'Chandraprabha Realty' ? 'var(--brand-chandraprabha)' :
        brand === 'QalaGriha Interiors' ? 'var(--brand-qalagriha)' : 'var(--brand-projects)';

    if (status === 'success') {
        return (
            <div style={{
                padding: 'var(--space-xl)',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-light)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)'
            }} className="fade-in">
                <h3 style={{ marginBottom: 'var(--space-md)', color: brandColor, fontSize: '2rem' }}>Inquiry Received</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 'var(--space-lg)' }}>
                    Thank you for reaching out to {brand}. A dedicated relationship manager will contact you shortly to discuss your requirements.
                </p>
                <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ minWidth: '200px' }}>
                    New Inquiry
                </button>
            </div>
        );
    }

    return (
        <div style={{
            background: 'var(--bg-primary)',
            padding: 'var(--space-xl)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-lg)'
        }}>
            <h3 style={{
                marginBottom: 'var(--space-lg)',
                fontSize: '1.75rem',
                borderBottom: `2px solid ${brandColor}`,
                paddingBottom: '1rem',
                display: 'inline-block'
            }}>
                {title}
            </h3>

            {status === 'error' && (
                <div style={{
                    padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderLeft: '4px solid #b91c1c',
                    marginBottom: '1.5rem', fontSize: '0.9rem'
                }}>
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="base_name" className="form-label">Full Name</label>
                    <input type="text" id="base_name" name="name" className="form-input" required placeholder="John Doe" />
                </div>

                <div className="form-group">
                    <label htmlFor="base_phone" className="form-label">Phone Number</label>
                    <input type="tel" id="base_phone" name="phone" className="form-input" required placeholder="+91 98765 43210" />
                </div>

                <div className="form-group">
                    <label htmlFor="base_email" className="form-label">Email Address</label>
                    <input type="email" id="base_email" name="email" className="form-input" required placeholder="john@example.com" />
                </div>

                {extraFields}

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        marginTop: 'var(--space-md)',
                        background: brandColor,
                        opacity: status === 'loading' ? 0.7 : 1
                    }}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Processing...' : submitButtonText}
                </button>

                <div className="form-group" style={{ marginTop: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <input type="checkbox" id="consent" name="consent" required style={{ marginTop: '0.25rem', cursor: 'pointer' }} />
                    <label htmlFor="consent" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6, cursor: 'pointer' }}>
                        I authorize Unique Spark Infra Pvt. Ltd. and its representatives to contact me via phone, SMS, and WhatsApp regarding my inquiry. This overrides my registration on the DNC/NDNC registry. Details provided comply with RERA guidelines.
                    </label>
                </div>
            </form>
        </div>
    );
}
