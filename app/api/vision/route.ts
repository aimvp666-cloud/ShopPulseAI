
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({
        ok: false,
        message: "沒有收到圖片"
      });
    }

    return NextResponse.json({
      ok: true,
      fileName: file.name,
      fileType: file.type,
      size: file.size
    });

  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: String(error)
    });
  }
}
