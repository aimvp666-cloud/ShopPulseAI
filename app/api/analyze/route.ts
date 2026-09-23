
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
你是商脈 AI 店家顧問。

請根據以下資料分析店家：

店名：${body.store || "未提供"}
行業：${body.industry || "未提供"}
每日來客：${body.visitors || "未提供"}
平均客單價：${body.price || "未提供"}
月營業額：${body.revenue || "未提供"}
目前困擾：${body.problem || "未提供"}

請只回傳 JSON，不要加入任何 Markdown。

格式如下：

{
  "score": 85,
  "google": "一句 Google 商家分析",
  "social": "一句社群分析",
  "swot": {
    "strengths": ["","",""],
    "weaknesses": ["","",""],
    "opportunities": ["","",""],
    "threats": ["","",""]
  }
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
        input: prompt,
        text: {
          format: {
            type: "json_object",
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI Error ${response.status}`);
    }

    const data = await response.json();

    const text = data.output_text || "{}";

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      score: 82,
      google: "目前使用備援分析。",
      social: "目前使用備援分析。",
      swot: {
        strengths: ["店面辨識度佳", "具備基本客群"],
        weaknesses: ["社群曝光不足", "Google 商家可再優化"],
        opportunities: ["短影音導流", "Google 在地 SEO"],
        threats: ["附近競爭增加", "回訪率下降"]
      }
    });
  }
}
