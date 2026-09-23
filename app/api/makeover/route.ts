import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const vision = await fetch(
      "https://api.openai.com/v1/responses",
      {
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
                  text: "請描述這間店面的招牌、門面、燈光與風格。",
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

    if (!vision.ok) {
      throw new Error("Vision 失敗");
    }

    const visionData = await vision.json();

    const description = visionData.output_text || "";

    const generate = await fetch(
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
          input: `根據這間店面的描述：${description}

生成一張真實建築改造效果圖。

要求：
- Apple Store 等級設計
- 保留建築比例
- 藍白科技感
- 招牌更醒目
- 夜間燈光更漂亮
- 更容易吸引客人進店`,
        }),
      }
    );

    if (!generate.ok) {
      throw new Error("Image Generation 失敗");
    }

    const data = await generate.json();

    const imageCall = data.output.find(
      (item: any) => item.type === "image_generation_call"
    );

    return NextResponse.json({
      image: imageCall?.result || null,
      description,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "AI 暫時無法生成圖片" },
      { status: 500 }
    );
  }
}
