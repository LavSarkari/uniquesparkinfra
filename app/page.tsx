import Link from 'next/link';
import MapWrapper from '@/components/MapWrapper';

export default function Home() {
  return (
    <div>
      {/* Premium minimal hero */}
      <section style={{
        marginTop: '-90px', /* pull under transparent nav if desired, layout handles it */
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--bg-tertiary)',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <div className="container">
          <div style={{ maxWidth: '900px', padding: 'var(--space-2xl) 0' }} className="fade-in">
            <div style={{
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-md)'
            }}>
              Est. 2005 &mdash; Varanasi, India
            </div>

            <h1>
              Building Legacies.<br />
              <span style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>Shaping the Future.</span>
            </h1>

            <p className="text-lead" style={{ marginBottom: 'var(--space-lg)' }}>
              Unique Spark Infra Pvt. Ltd. represents the pinnacle of luxury real estate,
              bespoke architectural interiors, and visionary commercial developments.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              <a href="#divisions" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                Discover Our Divisions
              </a>
              <Link href="/admin" className="btn btn-outline" style={{ padding: '1rem 3rem' }}>
                Partner Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="section bg-primary text-center">
        <div className="container">
          <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>
            Corporate Philosophy
          </h2>
          <p style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            maxWidth: '1000px',
            margin: '0 auto',
            lineHeight: 1.4,
            fontWeight: 300
          }}>
            "We do not merely construct spaces; we curate environments that elevate the human experience through uncompromising design and architectural integrity."
          </p>
        </div>
      </section>

      {/* Legacy Impact Map */}
      <MapWrapper />

      {/* Elegant Division Cards */}
      <section id="divisions" className="section-lg bg-secondary">
        <div className="container">

          <div style={{ marginBottom: 'var(--space-2xl)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-md)' }}>
            <h2>Our Specialized Divisions</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'var(--space-lg)'
          }}>

            {/* Chandraprabha */}
            <div className="division-card">
              <div className="card-img-wrapper" style={{
                height: '300px',
                background: 'linear-gradient(to bottom, #f3f0ea, #e8dfcc)',
                borderBottom: '3px solid var(--brand-chandraprabha)'
              }}></div>
              <div style={{ padding: 'var(--space-xl) var(--space-lg)' }}>
                <h3 style={{ color: 'var(--brand-chandraprabha)' }}>Chandraprabha Realty</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', minHeight: '100px' }}>
                  The premier sales vertical managing an exclusive portfolio of luxury residential plots and high-yield investment properties.
                </p>
                <Link href="/chandraprabha" className="nav-link" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Explore Real Estate &rarr;
                </Link>
              </div>
            </div>

            {/* QalaGriha */}
            <div className="division-card">
              <div className="card-img-wrapper" style={{
                height: '300px',
                background: 'linear-gradient(to bottom, #f5f0ef, #eadcda)',
                borderBottom: '3px solid var(--brand-qalagriha)'
              }}></div>
              <div style={{ padding: 'var(--space-xl) var(--space-lg)' }}>
                <h3 style={{ color: 'var(--brand-qalagriha)' }}>QalaGriha Interiors</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', minHeight: '100px' }}>
                  Bespoke interior architecture. Delivering highly curated, turnkey design solutions for premium residences and corporate offices.
                </p>
                <Link href="/qalagriha" className="nav-link" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  View Design Services &rarr;
                </Link>
              </div>
            </div>

            {/* US Projects */}
            <div className="division-card">
              <div className="card-img-wrapper" style={{
                height: '300px',
                background: 'linear-gradient(to bottom, #f0f2f5, #e0e5eb)',
                borderBottom: '3px solid var(--brand-projects)'
              }}></div>
              <div style={{ padding: 'var(--space-xl) var(--space-lg)' }}>
                <h3 style={{ color: 'var(--brand-projects)' }}>Unique Spark Projects</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', minHeight: '100px' }}>
                  Our visionary development wing, specializing in intelligent commercial centers and self-sustaining luxury townships.
                </p>
                <Link href="/projects" className="nav-link" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Discover Developments &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
