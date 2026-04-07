import { NextResponse } from "next/server";

/** Ensures env is read in the Node runtime on Vercel (not Edge). */
export const runtime = "nodejs";

/** GET = quick check that Production sees the env var (no secret leaked). */
export async function GET() {
  const configured = Boolean(process.env.TELEFONICA_CASE_STUDY_PASSWORD?.trim());
  return NextResponse.json(
    {
      ok: true,
      telefonicaGate: true,
      passwordEnvConfigured: configured,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  const expected = process.env.TELEFONICA_CASE_STUDY_PASSWORD?.trim();
  if (!expected) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  let body: { password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const given = typeof body.password === "string" ? body.password.trim() : "";
  if (given !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
