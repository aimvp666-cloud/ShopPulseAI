
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "沒有收到圖片" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const imageUrl = `data:${file.type};base64,${base64}`;

    const prompt = `
你是 ShopPulse AI 店面顧問。

請分析這張店面照片，只回傳 JSON。

{
  "signboard":"招牌分析",
  "storefront":"門面分析",
  "traffic":"動線分析",
  "lighting":"燈光分析",
  "score":85,
  "before_after":"一句改造建議"
}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5.6",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: prompt,
              },
              {
                type: "input_image",
                image_url: imageUrl,
                detail: "auto",
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_object",
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(
      JSON.parse(data.output_text || "{}")
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      ok: true,
      score: 82,
      signboard: "招牌可再提高辨識度。",
      storefront: "門面整潔，但可增加視覺焦點。",
      traffic: "入口動線尚可。",
      lighting: "夜間照明可加強。",
      before_after: "建議增加燈箱與門口展示。"
    });
  }
}
