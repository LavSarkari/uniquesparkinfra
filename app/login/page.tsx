'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/admin');
            } else {
                setError(data.error || 'Invalid access code');
            }
        } catch (err) {
            setError('Connection failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F8F9FA',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: '#FFFFFF',
                padding: '3rem',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                border: '1px solid #EAEAEA'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        background: '#18181B', 
                        borderRadius: '12px', 
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFF',
                        fontSize: '1.5rem'
                    }}>
                        🔐
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#18181B', margin: '0 0 0.5rem' }}>Partner Portal</h1>
                    <p style={{ color: '#71717A', fontSize: '0.9rem' }}>Secure Administrative Gateway</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="password" style={{ 
                            display: 'block', 
                            fontSize: '0.75rem', 
                            fontWeight: 600, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.05em', 
                            color: '#71717A',
                            marginBottom: '0.5rem'
                        }}>
                            Enter Access Code
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.85rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #E4E4E7',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            required
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div style={{ 
                            padding: '0.75rem', 
                            background: '#FEF2F2', 
                            color: '#EF4444', 
                            borderRadius: '6px', 
                            fontSize: '0.85rem', 
                            marginBottom: '1.5rem',
                            border: '1px solid #FEE2E2'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.85rem',
                            background: '#18181B',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.2s'
                        }}
                    >
                        {loading ? 'Verifying...' : 'Authorize Access'}
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: '#A1A1AA' }}>
                        &copy; 2026 Unique Spark Infra Pvt. Ltd.<br/>
                        Restricted Internal Intelligence System
                    </p>
                </div>
            </div>
        </div>
    );
}
