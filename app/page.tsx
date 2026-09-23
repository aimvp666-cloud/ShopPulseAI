
import Link from "next/link";

const features = [
  { title: "AI 健檢", desc: "100 分健康度評分", icon: "🧠" },
  { title: "Google 商家", desc: "評論與照片分析", icon: "⭐" },
  { title: "社群分析", desc: "IG・FB・Threads", icon: "📱" },
  { title: "店面改造", desc: "Before / After 提案", icon: "🏪" },
];

export default function Home() {
  return (
    <main className="home">

      <section className="hero">
        <div className="hero-content">

          <div className="hero-text">

            <span className="badge">🚀 ShopPulse AI</span>

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

          </div>

          <div className="hero-visual">

            <svg viewBox="0 0 420 420">

              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#2563EB"/>
                  <stop offset="100%" stopColor="#06B6D4"/>
                </linearGradient>
              </defs>

              <circle cx="210" cy="210" r="150" fill="url(#g1)" opacity="0.15"/>
              <circle cx="210" cy="210" r="110" fill="url(#g1)" opacity="0.1"/>

              <rect
                x="90"
                y="90"
                width="240"
                height="220"
                rx="28"
                fill="white"
                stroke="#E5EEF8"
                strokeWidth="2"
              />

              <rect x="120" y="120" width="180" height="18" rx="9" fill="#DBEAFE"/>
              <rect x="120" y="155" width="140" height="12" rx="6" fill="#CBD5E1"/>
              <rect x="120" y="190" width="160" height="12" rx="6" fill="#CBD5E1"/>

              <rect x="120" y="225" width="160" height="55" rx="16" fill="url(#g1)"/>

              <polyline
                points="135,250 165,235 195,245 225,210 265,220"
                fill="none"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
              />

              <circle cx="315" cy="105" r="24" fill="#0EA5E9"/>

              <text
                x="315"
                y="112"
                textAnchor="middle"
                fontSize="18"
                fill="white"
              >
                AI
              </text>

            </svg>

          </div>

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

              <div className="icon">{f.icon}</div>

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
