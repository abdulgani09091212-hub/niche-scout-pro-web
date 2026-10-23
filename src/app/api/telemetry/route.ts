import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Log diagnostic payload to structured server output
    console.log("[FIREBASE_TELEMETRY]", {
      timestamp: new Date().toISOString(),
      type: body.telemetryType || "event",
      projectId: body.projectId || "smartpdf-studio-legal",
      payload: body.payload || body
    });

    return NextResponse.json(
      {
        status: "ok",
        recorded: true,
        project: body.projectId || "smartpdf-studio-legal",
        receivedAt: Date.now()
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid telemetry payload", details: error.message },
      { status: 400 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
