
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const prompt = `
你是商脈 AI 店家顧問。

請分析以下店家：

店名：${body.store}
行業：${body.industry}
每日來客：${body.visitors}
客單價：${body.price}
月營業額：${body.revenue}
目前困擾：${body.problem}

請只回傳 JSON，不要其他文字。

{
 "score": 87,
 "google":"一句分析",
 "social":"一句分析",
 "swot":{
   "strengths":["","",""],
   "weaknesses":["","",""],
   "opportunities":["","",""],
   "threats":["","",""]
 },
 "sevenDay":["","",""],
 "thirtyDay":["","",""]
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
          type: "json_object"
        }
      }
    })
  });

  const data = await response.json();

  const text = data.output_text ?? "{}";

  return NextResponse.json(JSON.parse(text));
}
