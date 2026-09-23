
import Link from "next/link";

const features = [
  { title: "AI 健檢", desc: "100 分健康度評分" },
  { title: "Google 商家", desc: "評論與照片分析" },
  { title: "社群分析", desc: "IG・FB・Threads" },
  { title: "店面改造", desc: "Before / After 提案" },
];

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <span className="badge">ShopPulse AI</span>

        <h1>
          你的店，
          <br />
          不缺努力。
          <br />
          缺的是知道下一步。
        </h1>

        <p>
          三分鐘 AI 健檢，立即找出真正影響生意的關鍵。
        </p>

        <div className="cta">
          <Link href="/check" className="primary">
            免費 AI 健檢
          </Link>

          <a href="#features" className="secondary">
            查看功能
          </a>
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>100+</strong>
          <span>可分析店家類型</span>
        </div>

        <div>
          <strong>3 分鐘</strong>
          <span>完成健檢</span>
        </div>

        <div>
          <strong>30 秒</strong>
          <span>AI 生成報告</span>
        </div>
      </section>

      <section id="features" className="features">
        <h2>AI 能幫你完成什麼？</h2>

        <div className="grid">
          {features.map((f) => (
            <div className="card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bottom-cta">
        <h2>今天就開始你的第一份 AI 店家健檢。</h2>

        <Link href="/check" className="primary">
          立即開始
        </Link>
      </section>
    </main>
  );
}
