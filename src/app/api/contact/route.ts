import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().min(10).max(2000),
  _honey: z.string().max(0),
});

/**
 * Contact form handler (BLUEPRINT §5.7).
 * Currently logs submission server-side. Wire up Resend or n8n webhook
 * before launch — the schema and sanitization are already production-ready.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { _honey, ...data } = result.data;

  // Honeypot check (belt-and-suspenders; also checked on client).
  if (_honey) {
    return NextResponse.json({ ok: true }); // silently discard spam
  }

  // TODO (Phase 8): forward to Resend / n8n webhook.
  // eslint-disable-next-line no-console
  console.info('[contact]', { ...data, time: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
