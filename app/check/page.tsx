
"use client";

import { useState } from "react";

export default function CheckPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl">

        <h1 className="text-3xl font-bold mb-2">
          免費 AI 店家健檢
        </h1>

        <p className="text-slate-500 mb-6">
          約 3 分鐘完成分析
        </p>

        <div className="h-2 bg-slate-200 rounded-full mb-6">
          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${step * 20}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          {step === 1 && (
            <>
              <h2 className="font-semibold text-xl mb-4">基本資料</h2>

              <input placeholder="店名" className="w-full border rounded-xl p-3 mb-3" />
              <input placeholder="負責人" className="w-full border rounded-xl p-3 mb-3" />
              <input placeholder="電話" className="w-full border rounded-xl p-3" />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-semibold text-xl mb-4">聯絡方式</h2>

              <input placeholder="LINE ID" className="w-full border rounded-xl p-3 mb-3" />
              <input placeholder="Email" className="w-full border rounded-xl p-3" />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-semibold text-xl mb-4">店家資訊</h2>

              <select className="w-full border rounded-xl p-3 mb-3">
                <option>餐飲</option>
                <option>美業</option>
                <option>零售</option>
                <option>健身</option>
                <option>汽機車</option>
                <option>其他</option>
              </select>

              <input placeholder="每日來客數" className="w-full border rounded-xl p-3 mb-3" />
              <input placeholder="客單價" className="w-full border rounded-xl p-3" />
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="font-semibold text-xl mb-4">營運狀況</h2>

              <input placeholder="月營業額" className="w-full border rounded-xl p-3 mb-3" />
              <textarea
                placeholder="目前最大的困擾"
                className="w-full border rounded-xl p-3 h-32"
              />
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="font-semibold text-xl mb-4">店面照片</h2>

              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full border rounded-xl p-3"
              />

              <p className="text-sm text-slate-500 mt-3">
                最多可上傳 5 張照片
              </p>
            </>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className="px-5 py-3 rounded-xl border"
            >
              上一步
            </button>

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-3 rounded-xl bg-blue-600 text-white"
              >
                下一步
              </button>
            ) : (
              <button className="px-5 py-3 rounded-xl bg-blue-600 text-white">
                開始 AI 分析
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
