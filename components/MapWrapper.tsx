'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Leaflet map component with SSR disabled
const LegacyImpactMap = dynamic(
    () => import('./LegacyImpactMap'),
    {
        ssr: false,
        loading: () => (
            <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)' }}>
                Loading Map Architecture...
            </div>
        )
    }
);

export default function MapWrapper() {
    return <LegacyImpactMap />;
}
