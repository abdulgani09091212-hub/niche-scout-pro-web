import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "Etsy_Niche_Scout_Pro.zip");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Extension archive not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="Etsy_Niche_Scout_Pro.zip"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
