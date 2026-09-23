
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
根據提供的店面照片，
生成一張真實感建築改造效果圖。

要求：
- 保留原建築比例
- Apple Store 風格
- 藍白科技感
- 更醒目的招牌
- 更好的夜間燈光
- 更吸引人進店
`;

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          size: "1024x1024",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Image API ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      image: data.data?.[0]?.b64_json || null,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      image: null,
    });
  }
}
