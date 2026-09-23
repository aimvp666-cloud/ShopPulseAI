
"use client";

import { useState } from "react";

export default function CheckPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    store: "",
    industry: "",
    visitors: "",
    price: "",
    revenue: "",
    problem: "",
  });

  async function submit() {
    setLoading(true);

    sessionStorage.setItem("shoppulse_form", JSON.stringify(form));

    setTimeout(() => {
      window.location.href = "/report";
    }, 2500);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-6">🤖</div>
          <h1 className="text-3xl font-bold">AI 正在分析你的店面</h1>
          <p className="text-slate-500 mt-3">
            正在整理 Google、社群與營運資料...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow p-6 space-y-5">

        <h1 className="text-3xl font-bold text-center">
          免費 AI 健檢
        </h1>

        <input
          className="w-full rounded-xl border p-3"
          placeholder="店名"
          value={form.store}
          onChange={(e)=>setForm({...form,store:e.target.value})}
        />

        <input
          className="w-full rounded-xl border p-3"
          placeholder="行業（例如：餐飲、美業）"
          value={form.industry}
          onChange={(e)=>setForm({...form,industry:e.target.value})}
        />

        <input
          className="w-full rounded-xl border p-3"
          placeholder="每日來客數"
          value={form.visitors}
          onChange={(e)=>setForm({...form,visitors:e.target.value})}
        />

        <input
          className="w-full rounded-xl border p-3"
          placeholder="平均客單價"
          value={form.price}
          onChange={(e)=>setForm({...form,price:e.target.value})}
        />

        <input
          className="w-full rounded-xl border p-3"
          placeholder="月營業額"
          value={form.revenue}
          onChange={(e)=>setForm({...form,revenue:e.target.value})}
        />

        <textarea
          className="w-full rounded-xl border p-3"
          rows={4}
          placeholder="目前最大的困擾"
          value={form.problem}
          onChange={(e)=>setForm({...form,problem:e.target.value})}
        />

        <button
          onClick={submit}
          className="w-full rounded-2xl bg-blue-600 text-white font-bold py-4"
        >
          開始 AI 分析
        </button>

      </div>
    </main>
  );
}
