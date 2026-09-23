
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "沒有圖片" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          tool_choice: {
            type: "image_generation",
          },
          tools: [
            {
              type: "image_generation",
              model: "gpt-image-2.5-sunburst",
              action: "edit",
              size: "1024x1024",
              quality: "high",
              background: "opaque",
            },
          ],
          input: [
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text:
                    "編輯這張店面照片，保留建築結構與比例，改成 Apple Store 等級的藍白科技風，讓招牌更醒目、燈光更漂亮、整體更有質感。",
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

    const raw = await response.text();

    if (!response.ok) {
      console.error(raw);

      return NextResponse.json(
        { error: raw },
        { status: response.status }
      );
    }

    const data = JSON.parse(raw);

    const imageCall = data.output?.find(
      (item: any) => item.type === "image_generation_call"
    );

    if (!imageCall?.result) {
      return NextResponse.json(
        { error: "沒有生成圖片" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: imageCall.result,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
