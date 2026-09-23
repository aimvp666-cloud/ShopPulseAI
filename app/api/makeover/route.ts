import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "缺少圖片" },
        { status: 400 }
      );
    }

    const prompt = `
請以這張店面照片為基礎進行改造。

要求：
- 保留原建築結構與比例
- Apple Store 等級乾淨設計
- 藍白科技感
- 招牌更醒目
- 夜間燈光更漂亮
- 提高進店率
- 真實建築改造效果圖
`;

    const form = new FormData();

    form.append("model", "gpt-image-1");
    form.append("prompt", prompt);
    form.append("image[]", image);
    form.append("input_fidelity", "high");
    form.append("quality", "high");
    form.append("size", "1024x1024");

    const response = await fetch(
      "https://api.openai.com/v1/images/edits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: form,
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error(err);

      throw new Error("Image API Error");
    }

    const data = await response.json();

    return NextResponse.json({
      image: data.data?.[0]?.b64_json || null,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "AI 暫時無法生成圖片",
      },
      { status: 500 }
    );
  }
}
