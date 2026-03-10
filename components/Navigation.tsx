'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            background: isScrolled ? 'rgba(252, 251, 249, 0.85)' : 'var(--bg-primary)',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderBottom: '1px solid var(--border-light)',
            boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.3s ease'
        }}>
            <div className="container nav-container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 1.5rem',
                height: '90px',
                transition: 'height 0.3s ease'
            }}>
                {/* Logo Area */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/" style={{
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-corp)'
                    }}>
                        Unique Spark <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>Infra</span>
                    </Link>
                </div>

                {/* Central Nav Links */}
                <div style={{ display: 'flex', gap: '2.5rem' }} className="nav-links nav-desktop">
                    <Link href="/chandraprabha" className="nav-link nav-item-chandraprabha">Chandraprabha Realty</Link>
                    <Link href="/qalagriha" className="nav-link nav-item-qalagriha">QalaGriha Interiors</Link>
                    <Link href="/projects" className="nav-link nav-item-projects">US Projects</Link>
                </div>

                {/* Action Area */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-action">
                    <Link href="/admin" className="nav-link nav-desktop" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Partner Portal
                    </Link>
                    <Link href="/#contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}>
                        Inquire Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
