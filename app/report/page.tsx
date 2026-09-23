
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const [store, setStore] = useState("你的店");
  const [preview, setPreview] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const targetScore = 86;
  const [score, setScore] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("shoppulse_form");

    if (raw) {
      const form = JSON.parse(raw);

      setStore(form.store || "你的店");
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

  async function generate() {
    if (!preview) {
      alert("請先重新拍一張店面照片。");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/makeover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: preview,
        }),
      });

      const data = await res.json();

      if (data.image) {
        setAfter(`data:image/png;base64,${data.image}`);
      } else {
        alert("AI 暫時無法生成圖片。");
      }
    } catch {
      alert("生成失敗。");
    }

    setLoading(false);
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

      <div
        className="glass"
        style={{
          borderRadius: "36px",
          padding: "40px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h1>{store} AI 健檢報告</h1>

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

            <div style={{ color: "#64748b" }}>
              健康度
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        <div className="card" style={{ padding: "20px" }}>
          <h3>📸 Before</h3>

          {preview ? (
            <img
              src={preview}
              alt="before"
              style={{
                width: "100%",
                borderRadius: "20px",
                marginTop: "14px",
              }}
            />
          ) : (
            <div
              style={{
                height: "240px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#64748b",
              }}
            >
              尚未收到照片
            </div>
          )}
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <h3>✨ AI After</h3>

          {after ? (
            <img
              src={after}
              alt="after"
              style={{
                width: "100%",
                borderRadius: "20px",
                marginTop: "14px",
              }}
            />
          ) : (
            <div
              style={{
                height: "240px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#64748b",
              }}
            >
              尚未生成改造圖
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "34px",
        }}
      >
        <button
          className="btn-primary"
          onClick={generate}
          disabled={loading}
          style={{
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading ? "AI 正在改造..." : "✨ 生成改造效果圖"}
        </button>
      </div>
    </main>
  );
}
