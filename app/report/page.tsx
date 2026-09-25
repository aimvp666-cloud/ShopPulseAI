
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const [store, setStore] = useState("你的店");
  const [industry, setIndustry] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const targetScore = 86;

  useEffect(() => {
    const raw = sessionStorage.getItem("shoppulse_form");

    if (raw) {
      const form = JSON.parse(raw);
      setStore(form.store || "你的店");
      setIndustry(form.industry || "");
      setPreview(form.preview || null);
    }

    let current = 0;

    const timer = setInterval(() => {
      current++;

      setScore(current);

      if (current >= targetScore) {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const angle = score * 3.6;

  function downloadPDF() {
    window.print();
  }

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px 20px 80px",
      }}
    >
      <Link href="/" style={{ color: "#2563eb" }}>
        ← 返回首頁
      </Link>

      <section
        className="glass"
        style={{
          borderRadius: "36px",
          padding: "40px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "42px", marginBottom: "8px" }}>🚀</div>

        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          {store} AI 顧問報告
        </h1>

        <p style={{ color: "#64748b" }}>
          {industry || "店家"}｜ShopPulse AI 專業健檢
        </p>

        <div
          style={{
            width: "220px",
            height: "220px",
            margin: "35px auto",
            borderRadius: "999px",
            background: `conic-gradient(#2563eb 0deg ${angle}deg,#e5e7eb ${angle}deg 360deg)`,
            padding: "14px",
            transition: "background .15s linear",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "white",
              borderRadius: "999px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "54px",
                fontWeight: 800,
              }}
            >
              {score}
            </div>

            <div style={{ color: "#64748b" }}>健康度</div>
          </div>
        </div>

        <p
          style={{
            color: "#64748b",
            maxWidth: "620px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          AI 已完成店家健檢，以下為目前最值得優先改善的項目。
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        <div className="card" style={{ padding: "22px" }}>
          <h3>📸 店面照片</h3>

          {preview ? (
            <img
              src={preview}
              alt="store"
              style={{
                width: "100%",
                borderRadius: "18px",
                marginTop: "14px",
              }}
            />
          ) : (
            <div
              style={{
                height: "220px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#64748b",
              }}
            >
              尚未上傳照片
            </div>
          )}
        </div>

        <div className="card" style={{ padding: "22px" }}>
          <h3>⭐ Google 商家分析</h3>

          <p style={{ color: "#64748b", lineHeight: "1.8" }}>
            建議增加近期照片、回覆評論、提升在地搜尋曝光，可增加點擊率與到店率。
          </p>

          <div style={{ height: "22px" }} />

          <h3>📱 社群分析</h3>

          <p style={{ color: "#64748b", lineHeight: "1.8" }}>
            建議每週至少發布 2 支短影音，並搭配限時動態，提高自然觸及。
          </p>
        </div>
      </section>

      <section
        style={{
          marginTop: "34px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>SWOT 分析</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
            gap: "20px",
          }}
        >
          {[
            ["💪 優勢", ["店面辨識度佳", "已有穩定客群"]],
            ["⚠️ 待改善", ["社群更新不足", "Google 照片偏少"]],
            ["🚀 機會", ["短影音導流", "Google SEO"]],
            ["🛡️ 風險", ["競爭增加", "回訪率下降"]],
          ].map(([title, items]) => (
            <div
              key={title}
              className="card"
              style={{ padding: "20px" }}
            >
              <h3>{title}</h3>

              <ul style={{ paddingLeft: "20px", marginTop: "14px" }}>
                {(items as string[]).map((item) => (
                  <li key={item} style={{ marginBottom: "8px" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        className="glass"
        style={{
          borderRadius: "30px",
          padding: "32px",
          marginTop: "34px",
        }}
      >
        <h2 style={{ marginBottom: "24px" }}>✨ AI 店面改造建議</h2>

        {[
          ["招牌升級", "改成白底藍字立體燈箱，提高夜間辨識度。"],
          ["燈光改善", "入口增加暖白色燈帶，讓門面更有質感。"],
          ["入口動線", "門口留出展示區，引導客人進店。"],
          ["Google 商家照片", "新增白天、夜景、店內三組照片。"],
          ["短影音素材", "拍攝門面開燈前後對比，適合 Reels。"],
        ].map(([title, desc]) => (
          <div
            key={title}
            style={{
              background: "#f8fafc",
              borderRadius: "18px",
              padding: "18px",
              marginBottom: "16px",
            }}
          >
            <strong>{title}</strong>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
                lineHeight: "1.7",
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </section>

      <section
        className="glass"
        style={{
          borderRadius: "30px",
          padding: "32px",
          marginTop: "34px",
        }}
      >
        <h2 style={{ marginBottom: "22px" }}>📅 七天改善計畫</h2>

        {[
          "Day 1：更新 Google 商家照片",
          "Day 2：回覆近期評論",
          "Day 3：發布第一支短影音",
          "Day 4：優化店門口招牌",
          "Day 5：建立回訪優惠",
          "Day 6：分析熱門商品",
          "Day 7：追蹤一週數據",
        ].map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
              }}
            >
              ✓
            </div>

            <span>{item}</span>
          </div>
        ))}
      </section>

      <div
        style={{
          textAlign: "center",
          marginTop: "36px",
        }}
      >
        <button className="btn-primary" onClick={downloadPDF}>
          📄 下載顧問報告（PDF）
        </button>
      </div>
    </main>
  );
}
