
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
保留原本建築結構。

把這間店面改造成：
- Apple Store 等級乾淨設計
- 藍白科技感
- 招牌更醒目
- 夜間燈光更漂亮
- 提高進店率
- 真實建築改造效果圖
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
          image,
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
