
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F8FBFF 0%,#EEF6FF 100%)",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Navbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#2563eb",
            }}
          >
            ShopPulse AI
          </div>

          <Link
            href="/admin"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            CRM 後台
          </Link>
        </div>

        {/* Hero */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "40px",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "#DBEAFE",
                color: "#2563eb",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              AI 商家健檢
            </div>

            <h1
              style={{
                fontSize: "52px",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              三分鐘看懂
              <br />
              店家的成長機會
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "18px",
                lineHeight: 1.8,
                marginBottom: "32px",
              }}
            >
              上傳店面照片，AI 立即分析 Google 商家、社群與門面，
              自動產生專業顧問報告。
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/check"
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "16px 28px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                免費開始健檢 →
              </Link>

              <Link
                href="/admin"
                style={{
                  border: "1px solid #CBD5E1",
                  color: "#334155",
                  padding: "16px 28px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: 700,
                  background: "white",
                }}
              >
                查看 CRM
              </Link>
            </div>
          </div>

          {/* Mockup */}
          <div
            style={{
              background: "white",
              borderRadius: "28px",
              padding: "30px",
              boxShadow: "0 20px 50px rgba(37,99,235,.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <strong>AI 健檢預覽</strong>

              <span style={{ color: "#2563eb", fontWeight: 700 }}>
                86 分
              </span>
            </div>

            <div
              style={{
                height: "12px",
                background: "#E5E7EB",
                borderRadius: "999px",
                overflow: "hidden",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "86%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg,#2563eb,#0EA5E9)",
                }}
              />
            </div>

            {[
              "Google 商家曝光可提升",
              "社群更新頻率偏低",
              "店面招牌辨識度可加強",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "18px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#2563eb",
                  }}
                />

                <span style={{ color: "#475569" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
            marginTop: "80px",
          }}
        >
          {[
            ["📍", "Google 商家分析", "找出曝光改善機會"],
            ["📱", "社群健檢", "分析內容更新節奏"],
            ["🏪", "店面檢查", "整理門面改善建議"],
            ["📄", "PDF 報告", "一鍵下載顧問報告"],
          ].map(([icon, title, desc]) => (
            <div
              key={title}
              style={{
                background: "white",
                borderRadius: "22px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(15,23,42,.06)",
              }}
            >
              <div style={{ fontSize: "34px", marginBottom: "14px" }}>
                {icon}
              </div>

              <h3>{title}</h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: 1.7,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
