
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReportPage() {

  const [score, setScore] = useState(0);
  const [store, setStore] = useState("你的店");
  const [preview, setPreview] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("shoppulse_form");

    if (raw) {
      const form = JSON.parse(raw);

      setStore(form.store || "你的店");
      setPreview(form.preview || null);
    }

    let value = 0;

    const timer = setInterval(() => {
      value++;

      if (value >= 86) {
        value = 86;
        clearInterval(timer);
      }

      setScore(value);
    }, 20);

    return () => clearInterval(timer);
  }, []);

  async function generate() {

    if (!preview) return;

    setLoading(true);

    try {
      const res = await fetch("/api/makeover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: preview
        })
      });

      const data = await res.json();

      if (data.image) {
        setAfter(`data:image/png;base64,${data.image}`);
      }

    } catch {}

    setLoading(false);
  }

  return (

    <main
      style={{
        maxWidth:"1100px",
        margin:"auto",
        padding:"30px 20px 80px"
      }}
    >

      <Link href="/" style={{color:"#2563eb"}}>
        ← 返回首頁
      </Link>

      <div
        className="glass"
        style={{
          borderRadius:"36px",
          padding:"40px",
          textAlign:"center",
          marginTop:"20px"
        }}
      >

        <h1>{store} AI 健檢報告</h1>

        <div
          style={{
            width:"220px",
            height:"220px",
            margin:"30px auto",
            borderRadius:"999px",
            background:"conic-gradient(#2563eb 310deg,#e5e7eb 0)",
            padding:"14px"
          }}
        >

          <div
            style={{
              background:"white",
              width:"100%",
              height:"100%",
              borderRadius:"999px",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column"
            }}
          >

            <div
              style={{
                fontSize:"54px",
                fontWeight:800
              }}
            >
              {score}
            </div>

            健康度

          </div>

        </div>

      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
          gap:"24px",
          marginTop:"30px"
        }}
      >

        <div className="card" style={{padding:"20px"}}>

          <h3>📸 Before</h3>

          {preview ? (
            <img
              src={preview}
              alt="before"
              style={{
                width:"100%",
                borderRadius:"20px",
                marginTop:"12px"
              }}
            />
          ) : (
            <div
              style={{
                height:"240px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                color:"#64748b"
              }}
            >
              尚未上傳照片
            </div>
          )}

        </div>

        <div className="card" style={{padding:"20px"}}>

          <h3>✨ AI After</h3>

          {after ? (
            <img
              src={after}
              alt="after"
              style={{
                width:"100%",
                borderRadius:"20px",
                marginTop:"12px"
              }}
            />
          ) : (
            <div
              style={{
                height:"240px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                color:"#64748b"
              }}
            >
              點下面按鈕生成改造圖
            </div>
          )}

        </div>

      </div>

      <div
        style={{
          textAlign:"center",
          marginTop:"30px"
        }}
      >

        <button
          className="btn-primary"
          onClick={generate}
          disabled={loading || !preview}
        >
          {loading ? "AI 正在改造..." : "✨ 生成改造效果圖"}
        </button>

      </div>

    </main>

  );

}
