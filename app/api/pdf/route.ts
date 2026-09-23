
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const html = `
  <!DOCTYPE html>
  <html lang="zh-Hant">
  <head>
    <meta charset="UTF-8"/>
    <title>ShopPulse AI Report</title>
    <style>
      body{
        font-family:Arial,sans-serif;
        padding:40px;
        color:#0f172a;
      }
      h1{
        color:#2563eb;
      }
      .score{
        width:120px;
        height:120px;
        border-radius:999px;
        border:10px solid #2563eb;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:40px;
        font-weight:bold;
        margin:20px 0;
      }
      .box{
        border:1px solid #e5e7eb;
        border-radius:18px;
        padding:18px;
        margin-top:18px;
      }
    </style>
  </head>
  <body>

    <h1>🚀 ShopPulse AI 顧問報告</h1>

    <h2>${body.store || "你的店"}</h2>

    <div class="score">${body.score}</div>

    <div class="box">
      <h3>Google 商家分析</h3>
      <p>${body.google}</p>
    </div>

    <div class="box">
      <h3>社群分析</h3>
      <p>${body.social}</p>
    </div>

    <div class="box">
      <h3>七天改善計畫</h3>
      <ul>
        <li>更新 Google 商家照片</li>
        <li>回覆近期評論</li>
        <li>發布第一支短影音</li>
        <li>建立回訪優惠</li>
        <li>分析熱門商品</li>
      </ul>
    </div>

  </body>
  </html>
  `;

  return new NextResponse(html,{
    headers:{
      "Content-Type":"text/html"
    }
  });
}
