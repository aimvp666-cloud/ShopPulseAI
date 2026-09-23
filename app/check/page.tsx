
"use client";

import { useState } from "react";

const steps = [
  "店家資訊",
  "營運狀況",
  "客群分析",
  "目前困擾",
  "確認送出",
];

export default function CheckPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

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

  function submit() {
    setLoading(true);

    sessionStorage.setItem("shoppulse_form", JSON.stringify(form));

    setTimeout(() => {
      window.location.href = "/report";
    }, 2500);
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🤖</div>

          <h1 style={{ fontSize: "34px", marginBottom: "12px" }}>
            AI 正在分析
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
      <div className="glass" style={{ borderRadius: "30px", padding: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
            color: "#64748b",
            fontSize: "14px",
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
            marginBottom: "28px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${((step + 1) / steps.length) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg,#2563eb,#0ea5e9)",
              transition: ".3s",
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "34px",
            marginBottom: "10px",
          }}
        >
          免費 AI 健檢
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          三分鐘完成分析。
        </p>

        {step === 0 && (
          <>
            <input
              placeholder="店名"
              value={form.store}
              onChange={(e) => setForm({ ...form, store: e.target.value })}
            />

            <div style={{ height: "16px" }} />

            <input
              placeholder="行業（餐飲、美業、零售…）"
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            />
          </>
        )}

        {step === 1 && (
          <>
            <input
              placeholder="每日來客數"
              value={form.visitors}
              onChange={(e) => setForm({ ...form, visitors: e.target.value })}
            />

            <div style={{ height: "16px" }} />

            <input
              placeholder="平均客單價"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <div style={{ height: "16px" }} />

            <input
              placeholder="月營業額"
              value={form.revenue}
              onChange={(e) => setForm({ ...form, revenue: e.target.value })}
            />
          </>
        )}

        {step === 2 && (
          <>
            <select
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            >
              <option value="">主要客群</option>
              <option>學生</option>
              <option>上班族</option>
              <option>家庭客</option>
              <option>觀光客</option>
            </select>

            <div style={{ height: "16px" }} />

            <select defaultValue="">
              <option value="">回訪率</option>
              <option>很高</option>
              <option>普通</option>
              <option>偏低</option>
            </select>
          </>
        )}

        {step === 3 && (
          <textarea
            rows={6}
            placeholder="目前最大的經營困擾..."
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
          />
        )}

        {step === 4 && (
          <div className="card" style={{ padding: "24px" }}>
            <h3 style={{ marginBottom: "18px" }}>確認資料</h3>

            <p>
              <strong>店名：</strong>
              {form.store || "-"}
            </p>

            <p>
              <strong>行業：</strong>
              {form.industry || "-"}
            </p>

            <p>
              <strong>來客：</strong>
              {form.visitors || "-"}
            </p>

            <p>
              <strong>客單價：</strong>
              {form.price || "-"}
            </p>

            <p>
              <strong>營業額：</strong>
              {form.revenue || "-"}
            </p>

            <p style={{ marginTop: "14px" }}>
              <strong>困擾：</strong>
            </p>

            <p style={{ color: "#64748b" }}>
              {form.problem || "未填寫"}
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "34px",
          }}
        >
          <button
            onClick={prev}
            disabled={step === 0}
            className="btn-secondary"
            style={{
              opacity: step === 0 ? 0.5 : 1,
            }}
          >
            上一步
          </button>

          {step === 4 ? (
            <button onClick={submit} className="btn-primary">
              開始 AI 分析
            </button>
          ) : (
            <button onClick={next} className="btn-primary">
              下一步
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
