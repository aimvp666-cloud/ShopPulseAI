
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
請根據這張店面照片生成真實改造效果圖。

要求：
- 保留原建築結構
- Apple Store 等級設計
- 藍白科技感
- 招牌更醒目
- 夜間燈光更漂亮
- 更容易吸引客人進店
`;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-5.6",
          tools: [{ type: "image_generation" }],
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
                  image_url: image,
                  detail: "high",
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error(text);

      return NextResponse.json(
        { error: text },
        { status: response.status }
      );
    }

    const data = await response.json();

    const imageOutput = data.output?.find(
      (o: any) => o.type === "image_generation_call"
    );

    return NextResponse.json({
      image: imageOutput?.result || null,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "AI 暫時無法生成圖片" },
      { status: 500 }
    );
  }
}
