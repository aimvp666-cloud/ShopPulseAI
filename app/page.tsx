import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold mb-4">商脈 AI</h1>

        <p className="text-slate-600 mb-8">
          AI 店家健檢｜SWOT 分析｜Google 商家分析｜30 天改善計畫
        </p>

        <Link
          href="/check"
          className="inline-block rounded-2xl bg-blue-600 px-8 py-4 text-white font-semibold"
        >
          免費 AI 健檢
        </Link>
      </div>
    </main>
  );
}
