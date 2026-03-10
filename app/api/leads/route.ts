import { NextResponse } from 'next/server';
import { saveLead, getLeads } from '@/lib/storage';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Simulate some CRM processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const requiredFields = ['name', 'phone', 'brand'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const newLead = saveLead(body);

        // ==========================================
        // CRM INTEGRATION (ZOHO / HUBSPOT)
        // Two-way sync: source/campaign/adset/keyword
        // ==========================================
        // This block demonstrates the webhook push to the CRM
        const crmWebhookUrl = process.env.CRM_WEBHOOK_URL || 'https://mock-crm-webhook.com/sync';
        if (process.env.NODE_ENV !== 'test') {
            try {
                await fetch(crmWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        external_id: newLead.id,
                        first_name: body.name.split(' ')[0],
                        last_name: body.name.split(' ').slice(1).join(' '),
                        phone: body.phone,
                        email: body.email,
                        vertical: body.brand,
                        pipeline_stage: 'New Lead',
                        attribution: {
                            utm_source: body.utm_source,
                            utm_medium: body.utm_medium,
                            utm_campaign: body.utm_campaign,
                            utm_adset: body.utm_adset,
                            utm_keyword: body.utm_keyword,
                            gclid: body.gclid,
                            fbclid: body.fbclid
                        },
                        timestamp: newLead.timestamp
                    })
                });
                console.log('Successfully synced lead to Master CRM');
            } catch (crmError) {
                console.warn('CRM sync failed, lead saved locally. Error:', crmError);
            }
        }

        return NextResponse.json(
            { message: 'Lead successfully captured and routed to CRM pipeline.', lead: newLead },
            { status: 201 }
        );
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error while processing lead.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const leads = getLeads();

        // Sort leads by newest first
        const sortedLeads = leads.sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        return NextResponse.json({ leads: sortedLeads }, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error while fetching leads.' },
            { status: 500 }
        );
    }
}
