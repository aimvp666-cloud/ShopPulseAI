
"use client";

import { useState } from "react";

export default function CheckPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    store: "",
    owner: "",
    phone: "",
    line: "",
    email: "",
    industry: "",
    visitors: "",
    price: "",
    revenue: "",
    problem: ""
  });

  const update = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  async function submit() {
    setLoading(true);

    await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setLoading(false);
    alert("AI 分析已送出！");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl">

        <h1 className="text-3xl font-bold mb-2">
          免費 AI 店家健檢
        </h1>

        <p className="text-slate-500 mb-6">
          約 3 分鐘完成分析
        </p>

        <div className="h-2 bg-slate-200 rounded-full mb-8">
          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${step * 20}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          {step === 1 && (
            <>
              <input
                placeholder="店名"
                className="w-full border rounded-xl p-3 mb-3"
                value={form.store}
                onChange={(e)=>update("store",e.target.value)}
              />

              <input
                placeholder="負責人"
                className="w-full border rounded-xl p-3 mb-3"
                value={form.owner}
                onChange={(e)=>update("owner",e.target.value)}
              />

              <input
                placeholder="電話"
                className="w-full border rounded-xl p-3"
                value={form.phone}
                onChange={(e)=>update("phone",e.target.value)}
              />
            </>
          )}

          {step === 2 && (
            <>
              <input
                placeholder="LINE"
                className="w-full border rounded-xl p-3 mb-3"
                value={form.line}
                onChange={(e)=>update("line",e.target.value)}
              />

              <input
                placeholder="Email"
                className="w-full border rounded-xl p-3"
                value={form.email}
                onChange={(e)=>update("email",e.target.value)}
              />
            </>
          )}

          {step === 3 && (
            <>
              <select
                className="w-full border rounded-xl p-3 mb-3"
                value={form.industry}
                onChange={(e)=>update("industry",e.target.value)}
              >
                <option value="">請選擇行業</option>
                <option>餐飲</option>
                <option>美業</option>
                <option>零售</option>
                <option>健身</option>
                <option>汽機車</option>
                <option>其他</option>
              </select>

              <input
                placeholder="每日來客數"
                className="w-full border rounded-xl p-3 mb-3"
                value={form.visitors}
                onChange={(e)=>update("visitors",e.target.value)}
              />

              <input
                placeholder="客單價"
                className="w-full border rounded-xl p-3"
                value={form.price}
                onChange={(e)=>update("price",e.target.value)}
              />
            </>
          )}

          {step === 4 && (
            <>
              <input
                placeholder="月營業額"
                className="w-full border rounded-xl p-3 mb-3"
                value={form.revenue}
                onChange={(e)=>update("revenue",e.target.value)}
              />

              <textarea
                placeholder="目前最大的困擾"
                className="w-full border rounded-xl p-3 h-32"
                value={form.problem}
                onChange={(e)=>update("problem",e.target.value)}
              />
            </>
          )}

          {step === 5 && (
            <>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full border rounded-xl p-3"
              />

              <p className="text-sm text-slate-500 mt-3">
                最多上傳五張店面照片
              </p>
            </>
          )}

          <div className="flex justify-between mt-8">

            <button
              onClick={()=>setStep(Math.max(1,step-1))}
              className="px-5 py-3 border rounded-xl"
            >
              上一步
            </button>

            {step<5 ? (
              <button
                onClick={()=>setStep(step+1)}
                className="px-5 py-3 bg-blue-600 text-white rounded-xl"
              >
                下一步
              </button>
            ):(
              <button
                onClick={submit}
                disabled={loading}
                className="px-5 py-3 bg-blue-600 text-white rounded-xl"
              >
                {loading ? "分析中..." : "開始 AI 分析"}
              </button>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}
