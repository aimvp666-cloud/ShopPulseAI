
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Report = {
  score: number;
  google: string;
  social: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
};

const fallback: Report = {
  score: 86,
  google: "Google 商家仍有曝光提升空間，建議增加近期照片並維持評論互動。",
  social: "社群更新頻率偏低，可透過短影音提高觸及。",
  swot: {
    strengths: ["店面辨識度高", "既有客群穩定"],
    weaknesses: ["社群曝光不足", "Google 商家照片更新少"],
    opportunities: ["短影音導流", "Google 在地 SEO"],
    threats: ["附近競爭增加", "回訪率下降"],
  },
};

export default function ReportPage() {
  const [report, setReport] = useState<Report>(fallback);
  const [displayScore, setDisplayScore] = useState(0);
  const [store, setStore] = useState("你的店");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("shoppulse_form");

    if (raw) {
      const form = JSON.parse(raw);
      setStore(form.store || "你的店");
      setIndustry(form.industry || "");
    }

    async function load() {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw || "{}",
        });

        if (res.ok) {
          const data = await res.json();

          setReport({
            score: data.score ?? fallback.score,
            google: data.google ?? fallback.google,
            social: data.social ?? fallback.social,
            swot: {
              strengths: data.swot?.strengths ?? fallback.swot.strengths,
              weaknesses: data.swot?.weaknesses ?? fallback.swot.weaknesses,
              opportunities:
                data.swot?.opportunities ?? fallback.swot.opportunities,
              threats: data.swot?.threats ?? fallback.swot.threats,
            },
          });
        }
      } catch {
        // API 失敗就用 fallback
      }
    }

    load();
  }, []);

  useEffect(() => {
    let value = 0;

    const timer = setInterval(() => {
      value++;

      if (value >= report.score) {
        value = report.score;
        clearInterval(timer);
      }

      setDisplayScore(value);
    }, 20);

    return () => clearInterval(timer);
  }, [report.score]);

  const scoreAngle = (displayScore / 100) * 360;

  return (
    <main
      style={{
        maxWidth: "1200px",
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
          padding: "40px 30px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
          {store} AI 健檢報告
        </h1>

        <p style={{ color: "#64748b" }}>
          {industry || "店家"}｜AI 即時分析結果
        </p>

        <div
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: `conic-gradient(#2563eb 0deg ${scoreAngle}deg,#e5e7eb ${scoreAngle}deg 360deg)`,
            padding: "14px",
            margin: "40px auto 20px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "54px", fontWeight: 800 }}>
              {displayScore}
            </div>

            <div style={{ color: "#64748b" }}>健康度</div>
          </div>
        </div>

        <p
          style={{
            maxWidth: "560px",
            margin: "20px auto 0",
            color: "#64748b",
            lineHeight: "1.7",
          }}
        >
          AI 已完成 Google 商家、社群經營與店面營運分析，
          以下是目前最值得優先改善的項目。
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "22px",
          marginTop: "30px",
        }}
      >
        <div className="card" style={{ padding: "24px" }}>
          <h3>⭐ Google 商家</h3>
          <p style={{ color: "#64748b", lineHeight: "1.7" }}>
            {report.google}
          </p>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <h3>📱 社群分析</h3>
          <p style={{ color: "#64748b", lineHeight: "1.7" }}>
            {report.social}
          </p>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "22px",
          marginTop: "30px",
        }}
      >
        <div className="card" style={{ padding: "24px" }}>
          <h3>💪 優勢</h3>
          <ul style={{ paddingLeft: "20px", marginTop: "12px" }}>
            {report.swot.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <h3>⚠️ 待改善</h3>
          <ul style={{ paddingLeft: "20px", marginTop: "12px" }}>
            {report.swot.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <h3>🚀 機會</h3>
          <ul style={{ paddingLeft: "20px", marginTop: "12px" }}>
            {report.swot.opportunities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <h3>🛡️ 風險</h3>
          <ul style={{ paddingLeft: "20px", marginTop: "12px" }}>
            {report.swot.threats.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="glass"
        style={{
          borderRadius: "36px",
          padding: "36px",
          marginTop: "36px",
        }}
      >
        <h2 style={{ marginBottom: "24px" }}>七天改善計畫</h2>

        {[
          "Day 1：更新 Google 商家照片",
          "Day 2：回覆近期所有評論",
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

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button className="btn-primary">
          📄 PDF 報告（下一版）
        </button>
      </div>
    </main>
  );
}
