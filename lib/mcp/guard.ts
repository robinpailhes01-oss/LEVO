import { NextResponse } from "next/server";

// Sécurité commune des routes MCP : Bearer LEVO_MCP_SECRET.

export function checkMcpAuth(req: Request): NextResponse | null {
  const expected = process.env.LEVO_MCP_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "MCP non configuré (LEVO_MCP_SECRET manquant)" },
      { status: 500 },
    );
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return null; // autorisé
}

export function mcpOk(data: unknown): NextResponse {
  return NextResponse.json({ ok: true, data });
}

export function mcpError(message: string, status = 400): NextResponse {
  return NextResponse.json({ ok: false, error: message }, { status });
}
