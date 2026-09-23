
import Link from "next/link";

const [report, setReport] = useState(null);

const swot = {
  strengths: ["店面辨識度高", "Google 評論基礎不錯"],
  weaknesses: ["IG 更新頻率低", "門口招牌吸引力不足"],
  opportunities: ["短影音導流", "Google 在地 SEO"],
  threats: ["附近競爭店增加", "回訪率偏低"],
};

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <section className="mx-auto max-w-5xl p-6">

        <Link href="/" className="text-blue-600">← 返回首頁</Link>

        <div className="text-center mt-8">

          <h1 className="text-4xl font-bold">
            商脈 AI 健檢報告
          </h1>

          <p className="text-slate-500 mt-3">
            以下為 AI 根據店家資料產生的示範報告
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
                strokeDashoffset={565 - (565 * score) / 100}
                transform="rotate(-90 110 110)"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <div className="text-5xl font-bold">
                {score}
              </div>

              <div className="text-slate-500">
                健康度
              </div>

            </div>

          </div>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">💪 優勢</h3>
            {swot.strengths.map((i) => (
              <p key={i} className="mb-2">• {i}</p>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">⚠️ 待改善</h3>
            {swot.weaknesses.map((i) => (
              <p key={i} className="mb-2">• {i}</p>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">🚀 機會</h3>
            {swot.opportunities.map((i) => (
              <p key={i} className="mb-2">• {i}</p>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-3 text-xl font-bold">🛡️ 風險</h3>
            {swot.threats.map((i) => (
              <p key={i} className="mb-2">• {i}</p>
            ))}
          </div>

        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow">

          <h2 className="mb-4 text-2xl font-bold">
            七天改善計畫
          </h2>

          <ol className="space-y-3">
            <li>1. 更新 Google 商家照片。</li>
            <li>2. 發布兩支短影音。</li>
            <li>3. 增加店內指引牌。</li>
            <li>4. 優化招牌視覺。</li>
            <li>5. 建立回訪優惠。</li>
            <li>6. 回覆所有評論。</li>
            <li>7. 每日追蹤數據。</li>
          </ol>

        </div>

        <div className="mt-8 text-center">

          <button className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white">
            📄 下載 PDF（下一版）
          </button>

        </div>

      </section>

    </main>
  );
}
