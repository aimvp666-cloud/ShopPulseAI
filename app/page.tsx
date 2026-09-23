
import Link from "next/link";

const cards = [
  { icon: "🧠", title: "AI 健檢", desc: "100 分健康度分析" },
  { icon: "⭐", title: "Google 商家", desc: "評論與曝光分析" },
  { icon: "📱", title: "社群分析", desc: "IG、FB、Threads 分析" },
  { icon: "🏪", title: "店面改造", desc: "AI 視覺改善建議" },
];

export default function Home() {
  return (
    <main>
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "70px 24px 90px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "50px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="glass"
              style={{
                display: "inline-block",
                padding: "8px 18px",
                borderRadius: "999px",
                marginBottom: "24px",
              }}
            >
              ShopPulse AI
            </div>

            <h1
              style={{
                fontSize: "clamp(46px,8vw,74px)",
                lineHeight: "1.05",
                marginBottom: "24px",
              }}
            >
              讓 AI
              <br />
              成為你的店長。
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "20px",
                lineHeight: "1.8",
                marginBottom: "36px",
              }}
            >
              三分鐘完成 AI 店家健檢，自動分析 Google 商家、社群與店面表現，
              快速找到真正影響營收的關鍵。
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/check" className="btn-primary">
                免費開始
              </Link>

              <Link href="/report" className="btn-secondary">
                查看範例
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                gap: "28px",
                marginTop: "42px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: "30px", fontWeight: 700 }}>100+</div>
                <div style={{ color: "#64748b" }}>可分析店家</div>
              </div>

              <div>
                <div style={{ fontSize: "30px", fontWeight: 700 }}>3 分鐘</div>
                <div style={{ color: "#64748b" }}>完成健檢</div>
              </div>

              <div>
                <div style={{ fontSize: "30px", fontWeight: 700 }}>30 秒</div>
                <div style={{ color: "#64748b" }}>生成報告</div>
              </div>
            </div>
          </div>

          <div className="float">
            <div
              className="glass"
              style={{
                borderRadius: "36px",
                padding: "28px",
              }}
            >
              <svg viewBox="0 0 420 420" width="100%">
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>
                </defs>

                <circle cx="210" cy="210" r="145" fill="url(#g)" opacity=".12" />
                <circle cx="210" cy="210" r="110" fill="url(#g)" opacity=".08" />

                <rect x="90" y="90" width="240" height="220" rx="30" fill="white" />

                <rect x="120" y="120" width="170" height="16" rx="8" fill="#DBEAFE" />
                <rect x="120" y="155" width="140" height="10" rx="5" fill="#CBD5E1" />
                <rect x="120" y="185" width="160" height="10" rx="5" fill="#CBD5E1" />
                <rect x="120" y="220" width="170" height="54" rx="16" fill="url(#g)" />

                <polyline
                  points="140,246 170,232 195,242 226,208 266,218"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <circle cx="312" cy="104" r="24" fill="#0EA5E9" />

                <text x="312" y="111" textAnchor="middle" fill="white" fontSize="18">
                  AI
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          textAlign: "center",
          padding: "20px 24px 70px",
        }}
      >
        <p style={{ color: "#64748b", marginBottom: "20px" }}>
          支援店家數位經營分析
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "34px",
            flexWrap: "wrap",
            fontSize: "28px",
          }}
        >
          ⭐ Google 💬 LINE 📷 Instagram 📍 Maps
        </div>
      </section>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 24px 100px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "50px",
          }}
        >
          AI 能幫你完成什麼？
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "24px",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="card"
              style={{ padding: "28px" }}
            >
              <div style={{ fontSize: "42px", marginBottom: "18px" }}>
                {card.icon}
              </div>

              <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>
                {card.title}
              </h3>

              <p style={{ color: "#64748b", lineHeight: "1.7" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "90px 24px 120px",
        }}
      >
        <div
          className="glass"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: "36px",
            padding: "50px 30px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(34px,5vw,52px)",
              marginBottom: "20px",
            }}
          >
            今天就開始你的第一份 AI 店家健檢
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            不需要安裝 App，立即獲得專業改善建議。
          </p>

          <Link href="/check" className="btn-primary">
            免費開始
          </Link>
        </div>
      </section>
    </main>
  );
}
