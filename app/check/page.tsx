"use client";

import { useState } from "react";

const steps = [
  "店家資訊",
  "營運狀況",
  "客群分析",
  "店面照片",
  "確認送出",
];

export default function CheckPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const [form, setForm] = useState({
    store: "",
    industry: "",
    visitors: "",
    price: "",
    revenue: "",
    problem: "",
  });

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function handlePhoto(file: File) {
    setPhoto(file);

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
    };

    reader.readAsDataURL(file);
  }

  async function submit() {
    setLoading(true);

    sessionStorage.setItem(
      "shoppulse_form",
      JSON.stringify({
        ...form,
        preview,
      })
    );

    if (photo) {
      const fd = new FormData();
      fd.append("file", photo);

      try {
        await fetch("/api/vision", {
          method: "POST",
          body: fd,
        });
      } catch {}
    }

    setTimeout(() => {
      window.location.href = "/report";
    }, 2000);
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🤖</div>

          <h1 style={{ fontSize: "34px", marginBottom: "12px" }}>
            AI 正在分析店面
          </h1>

          <p style={{ color: "#64748b", marginBottom: "24px" }}>
            正在整理 Google、社群與店面資料...
          </p>

          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "620px",
        margin: "0 auto",
        padding: "30px 20px 80px",
      }}
    >
      <div
        className="glass"
        style={{
          borderRadius: "30px",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
            color: "#64748b",
          }}
        >
          <span>步驟 {step + 1}/5</span>
          <span>{steps[step]}</span>
        </div>

        <div
          style={{
            width: "100%",
            height: "8px",
            background: "#e5e7eb",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              width: `${((step + 1) / steps.length) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg,#2563eb,#0ea5e9)",
            }}
          />
        </div>

        <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
          免費 AI 健檢
        </h1>

        <p style={{ color: "#64748b", marginBottom: "26px" }}>
          三分鐘完成分析。
        </p>

        {step === 0 && (
          <>
            <input
              placeholder="店名"
              value={form.store}
              onChange={(e) =>
                setForm({ ...form, store: e.target.value })
              }
            />

            <div style={{ height: "16px" }} />

            <input
              placeholder="行業（餐飲、美業、零售…）"
              value={form.industry}
              onChange={(e) =>
                setForm({ ...form, industry: e.target.value })
              }
            />
          </>
        )}

        {step === 1 && (
          <>
            <input
              placeholder="每日來客數"
              value={form.visitors}
              onChange={(e) =>
                setForm({ ...form, visitors: e.target.value })
              }
            />

            <div style={{ height: "16px" }} />

            <input
              placeholder="平均客單價"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <div style={{ height: "16px" }} />

            <input
              placeholder="月營業額"
              value={form.revenue}
              onChange={(e) =>
                setForm({ ...form, revenue: e.target.value })
              }
            />
          </>
        )}

        {step === 2 && (
          <textarea
            rows={5}
            placeholder="目前最大的經營困擾..."
            value={form.problem}
            onChange={(e) =>
              setForm({ ...form, problem: e.target.value })
            }
          />
        )}

        {step === 3 && (
          <>
            <label
              style={{
                display: "block",
                border: "2px dashed #bfdbfe",
                borderRadius: "24px",
                padding: "30px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "48px" }}>📷</div>

              <p>點擊拍攝或上傳店面照片</p>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePhoto(file);
                }}
              />
            </label>

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  borderRadius: "20px",
                }}
              />
            )}
          </>
        )}

        {step === 4 && (
          <div className="card" style={{ padding: "22px" }}>
            <h3 style={{ marginBottom: "16px" }}>確認資料</h3>

            <p><strong>店名：</strong>{form.store || "-"}</p>
            <p><strong>行業：</strong>{form.industry || "-"}</p>
            <p><strong>每日來客：</strong>{form.visitors || "-"}</p>
            <p><strong>平均客單：</strong>{form.price || "-"}</p>
            <p><strong>月營業額：</strong>{form.revenue || "-"}</p>

            <div style={{ marginTop: "16px" }}>
              <strong>目前困擾：</strong>
              <p style={{ color: "#64748b" }}>
                {form.problem || "未填寫"}
              </p>
            </div>

            {preview && (
              <img
                src={preview}
                alt="store"
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  marginTop: "18px",
                }}
              />
            )}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <button
            onClick={prev}
            disabled={step === 0}
            className="btn-secondary"
            style={{ opacity: step === 0 ? 0.5 : 1 }}
          >
            上一步
          </button>

          {step === 4 ? (
            <button
              onClick={submit}
              className="btn-primary"
            >
              開始 AI 分析
            </button>
          ) : (
            <button
              onClick={next}
              className="btn-primary"
            >
              下一步
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
