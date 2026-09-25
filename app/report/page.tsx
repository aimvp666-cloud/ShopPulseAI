"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Lead = {
  id: string;
  store: string;
  industry: string;
  score: number;
  date: string;
  preview?: string | null;
};

const TARGET_SCORE = 86;

export default function ReportPage() {
  const [store, setStore] = useState("你的店");
  const [industry, setIndustry] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("shoppulse_form");

    if (raw) {
      const form = JSON.parse(raw);

      setStore(form.store || "你的店");
      setIndustry(form.industry || "");
      setPreview(form.preview || null);

      const leadId = form.leadId || crypto.randomUUID();

      form.leadId = leadId;
      sessionStorage.setItem("shoppulse_form", JSON.stringify(form));

      const leads: Lead[] = JSON.parse(
        localStorage.getItem("shoppulse_leads") || "[]"
      );

      const exists = leads.some((item) => item.id === leadId);

      if (!exists) {
        leads.unshift({
          id: leadId,
          store: form.store || "未命名店家",
          industry: form.industry || "未分類",
          score: TARGET_SCORE,
          date: new Date().toLocaleString("zh-TW"),
          preview: form.preview || null,
        });

        localStorage.setItem(
          "shoppulse_leads",
          JSON.stringify(leads)
        );
      }
    }

    let current = 0;

    const timer = setInterval(() => {
      current++;
      setScore(current);

      if (current >= TARGET_SCORE) {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const angle = score * 3.6;

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
        <div style={{ fontSize: "42px" }}>🚀</div>

        <h1 style={{ fontSize: "40px", margin: "10px 0" }}>
          {store} AI 顧問報告
        </h1>

        <p style={{ color: "#64748b" }}>
          {industry || "店家"}｜ShopPulse AI
        </p>

        <div
          style={{
            width: "220px",
            height: "220px",
            margin: "35px auto",
            borderRadius: "50%",
            background: `conic-gradient(#2563eb ${angle}deg,#e5e7eb ${angle}deg)`,
            padding: "14px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "white",
              borderRadius: "50%",
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

            <div style={{ color: "#64748b" }}>
              健康度
            </div>
          </div>
        </div>
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
            <p>尚未上傳照片</p>
          )}
        </div>

        <div className="card" style={{ padding: "22px" }}>
          <h3>⭐ Google 商家分析</h3>
          <p>建議增加近期照片、回覆評論、提升在地搜尋曝光。</p>

          <h3 style={{ marginTop: "20px" }}>📱 社群分析</h3>
          <p>每週至少發布兩支短影音，提高自然觸及。</p>
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
        <h2>✨ AI 改造建議</h2>

        {[
          "招牌改成白底藍字燈箱。",
          "入口增加暖白燈帶。",
          "門口保留展示區。",
          "新增 Google 白天與夜景照片。",
          "拍攝 15 秒 Reels。"
        ].map((item) => (
          <div
            key={item}
            style={{
              background: "#f8fafc",
              borderRadius: "16px",
              padding: "16px",
              marginTop: "14px",
            }}
          >
            {item}
          </div>
        ))}
      </section>

      <div
        style={{
          textAlign: "center",
          marginTop: "36px",
        }}
      >
        <button
          className="btn-primary"
          onClick={() => window.print()}
        >
          📄 下載 PDF
        </button>
      </div>
    </main>
  );
}
