import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--bg-primary)',
            borderTop: '1px solid var(--border-light)',
            padding: 'var(--space-2xl) 0 var(--space-md)',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div
                    className="footer-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr',
                        gap: 'var(--space-2xl)',
                        marginBottom: 'var(--space-xl)'
                    }}
                >

                    <div style={{ maxWidth: '400px' }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            marginBottom: 'var(--space-sm)'
                        }}>
                            Unique Spark Infra
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                            A legacy of uncompromising quality in luxury real estate, bespoke interior design, and visionary commercial developments.
                        </p>
                    </div>

                    <div>
                        <h4 style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: 'var(--space-md)'
                        }}>
                            Divisions
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li><Link href="/chandraprabha" className="nav-link" style={{ fontSize: '0.95rem' }}>Chandraprabha Realty</Link></li>
                            <li><Link href="/qalagriha" className="nav-link" style={{ fontSize: '0.95rem' }}>QalaGriha Interiors</Link></li>
                            <li><Link href="/projects" className="nav-link" style={{ fontSize: '0.95rem' }}>Unique Spark Projects</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: 'var(--space-md)'
                        }}>
                            Corporate Office
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            <li>Varanasi, UP, India</li>
                            <li><a href="mailto:info@uniquespark.com" className="nav-link">info@uniquespark.com</a></li>
                            <li><a href="tel:+910000000000" className="nav-link">+91 (XXX) XXX-XXXX</a></li>
                        </ul>
                    </div>

                </div>

                <div style={{
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: 'var(--space-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} Unique Spark Infra Pvt. Ltd. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" className="nav-link">Privacy Policy</a>
                        <a href="#" className="nav-link">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
