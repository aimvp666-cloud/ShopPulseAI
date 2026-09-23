
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  score: 80,
  google: "Google 商家分析：目前使用示範資料。",
  social: "社群分析：目前使用示範資料。",
  swot: {
    strengths: ["店面辨識度佳", "具備基本客群"],
    weaknesses: ["社群曝光不足", "Google 商家可再優化"],
    opportunities: ["短影音導流", "Google 在地 SEO"],
    threats: ["附近競爭增加", "回訪率下降"]
  }
};

export default function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report>(fallback);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            store: "示範店家",
            industry: "餐飲",
            visitors: "80",
            price: "250",
            revenue: "50萬",
            problem: "客流下降"
          })
        });

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();

        setReport({
          score: data.score ?? fallback.score,
          google: data.google ?? fallback.google,
          social: data.social ?? fallback.social,
          swot: {
            strengths: data.swot?.strengths ?? fallback.swot.strengths,
            weaknesses: data.swot?.weaknesses ?? fallback.swot.weaknesses,
            opportunities: data.swot?.opportunities ?? fallback.swot.opportunities,
            threats: data.swot?.threats ?? fallback.swot.threats
          }
        });
      } catch {
        setReport(fallback);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-6">🤖</div>
          <h1 className="text-3xl font-bold mb-3">AI 正在分析你的店面</h1>
          <p className="text-slate-500">
            正在分析 Google 商家、社群與 SWOT...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl p-6">

        <Link href="/" className="text-blue-600">
          ← 返回首頁
        </Link>

        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold">商脈 AI 健檢報告</h1>
          <p className="text-slate-500 mt-3">
            AI 根據店家資料產生的分析結果
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="relative h-56 w-56">
            <svg viewBox="0 0 220 220" className="h-full w-full">
              <circle
                cx="110"
                cy="110"
                r="90"
                stroke="#E2E8F0"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="110"
                cy="110"
                r="90"
                stroke="#2563EB"
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="565"
                strokeDashoffset={565 - (565 * report.score) / 100}
                transform="rotate(-90 110 110)"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold">{report.score}</div>
              <div className="text-slate-500">健康度</div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">Google 商家</h3>
            <p>{report.google}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">社群分析</h3>
            <p>{report.social}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">💪 優勢</h3>
            {report.swot.strengths.map((i) => (
              <p key={i}>• {i}</p>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">⚠️ 待改善</h3>
            {report.swot.weaknesses.map((i) => (
              <p key={i}>• {i}</p>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">🚀 機會</h3>
            {report.swot.opportunities.map((i) => (
              <p key={i}>• {i}</p>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">🛡️ 風險</h3>
            {report.swot.threats.map((i) => (
              <p key={i}>• {i}</p>
            ))}
          </div>

        </div>

      </section>
    </main>
  );
}
