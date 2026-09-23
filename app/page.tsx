
import Link from "next/link";

const features = [
  { icon: "🧠", title: "AI 健檢", desc: "100 分健康度評分" },
  { icon: "⭐", title: "Google 商家", desc: "評論與照片分析" },
  { icon: "📱", title: "社群分析", desc: "IG、FB、Threads" },
  { icon: "🏪", title: "店面改造", desc: "Before / After AI 提案" },
];

export default function Home() {
  return (
    <main>

      {/* Hero */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "60px 24px 100px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "40px",
            alignItems: "center",
          }}
          className="fade-up"
        >
          {/* 左側 */}
          <div>

            <div
              className="glass"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "999px",
                marginBottom: "24px",
              }}
            >
              🚀 ShopPulse AI
            </div>

            <h1
              style={{
                fontSize: "clamp(44px,7vw,72px)",
                lineHeight: "1.05",
                fontWeight: "800",
                marginBottom: "24px",
              }}
            >
              你的店，
              <br />
              不缺努力。
              <br />
              缺的是知道下一步。
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "20px",
                lineHeight: "1.7",
                marginBottom: "36px",
              }}
            >
              3 分鐘完成 AI 店家健檢，
              自動分析 Google 商家、社群與店面，
              產生專業顧問級改善報告。
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/check" className="btn-primary">
                免費 AI 健檢
              </Link>

              <a href="#features" className="btn-secondary">
                查看功能
              </a>
            </div>

            {/* 信任指標 */}
            <div
              style={{
                display: "flex",
                gap: "30px",
                flexWrap: "wrap",
                marginTop: "42px",
              }}
            >
              <div>
                <div style={{ fontSize: "28px", fontWeight: "700" }}>
                  100+
                </div>
                <div style={{ color: "#64748b" }}>
                  可分析店家類型
                </div>
              </div>

              <div>
                <div style={{ fontSize: "28px", fontWeight: "700" }}>
                  3 分鐘
                </div>
                <div style={{ color: "#64748b" }}>
                  完成健檢
                </div>
              </div>

              <div>
                <div style={{ fontSize: "28px", fontWeight: "700" }}>
                  30 秒
                </div>
                <div style={{ color: "#64748b" }}>
                  AI 生成報告
                </div>
              </div>
            </div>

          </div>

          {/* 右側 AI 插畫 */}
          <div className="float">

            <div
              className="glass"
              style={{
                borderRadius: "36px",
                padding: "30px",
              }}
            >

              <svg viewBox="0 0 420 420" width="100%">

                <defs>

                  <linearGradient id="blue" x1="0" x2="1">

                    <stop offset="0%" stopColor="#2563EB"/>

                    <stop offset="100%" stopColor="#0EA5E9"/>

                  </linearGradient>

                </defs>

                <circle
                  cx="210"
                  cy="210"
                  r="150"
                  fill="url(#blue)"
                  opacity="0.12"
                />

                <circle
                  cx="210"
                  cy="210"
                  r="115"
                  fill="url(#blue)"
                  opacity="0.1"
                />

                <rect
                  x="95"
                  y="95"
                  width="230"
                  height="210"
                  rx="28"
                  fill="white"
                />

                <rect
                  x="125"
                  y="125"
                  width="170"
                  height="16"
                  rx="8"
                  fill="#DBEAFE"
                />

                <rect
                  x="125"
                  y="160"
                  width="130"
                  height="10"
                  rx="5"
                  fill="#CBD5E1"
                />

                <rect
                  x="125"
                  y="190"
                  width="150"
                  height="10"
                  rx="5"
                  fill="#CBD5E1"
                />

                <rect
                  x="125"
                  y="225"
                  width="170"
                  height="50"
                  rx="16"
                  fill="url(#blue)"
                />

                <polyline
                  points="140,248 170,232 195,244 225,210 265,220"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <circle
                  cx="315"
                  cy="105"
                  r="24"
                  fill="#0EA5E9"
                />

                <text
                  x="315"
                  y="112"
                  textAnchor="middle"
                  fill="white"
                  fontSize="18"
                  fontWeight="700"
                >
                  AI
                </text>

              </svg>

            </div>

          </div>

        </div>

      </section>

      {/* Logo 區 */}
      <section
        style={{
          textAlign: "center",
          padding: "20px 24px 80px",
        }}
      >

        <div
          style={{
            color: "#64748b",
            marginBottom: "22px",
          }}
        >
          支援店家數位經營分析
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "36px",
            fontSize: "30px",
            flexWrap: "wrap",
          }}
        >
          ⭐ Google
          💬 LINE
          📷 Instagram
          📍 Maps
        </div>

      </section>

      {/* 功能卡 */}
      <section
        id="features"
        style={{
          maxWidth: "1200px",
          margin: "auto",
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

          {features.map((f) => (

            <div
              key={f.title}
              className="card"
              style={{ padding: "28px" }}
            >

              <div
                style={{
                  fontSize: "42px",
                  marginBottom: "18px",
                }}
              >
                {f.icon}
              </div>

              <h3
                style={{
                  fontSize: "24px",
                  marginBottom: "12px",
                }}
              >
                {f.title}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                {f.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}
      <section
        style={{
          padding: "100px 24px",
          textAlign: "center",
        }}
      >

        <div
          className="glass"
          style={{
            maxWidth: "900px",
            margin: "auto",
            borderRadius: "36px",
            padding: "50px 30px",
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
            不需要安裝 App，三分鐘就能完成分析。
          </p>

          <Link href="/check" className="btn-primary">
            免費開始
          </Link>

        </div>

      </section>

    </main>
  );
}
