
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lead = {
  store: string;
  industry: string;
  score: number;
  date: string;
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("shoppulse_form");

    if (raw) {
      const form = JSON.parse(raw);

      setLeads([
        {
          store: form.store || "未命名店家",
          industry: form.industry || "未分類",
          score: 86,
          date: new Date().toLocaleString("zh-TW"),
        },
      ]);
    } else {
      setLeads([
        {
          store: "示範咖啡",
          industry: "餐飲",
          score: 91,
          date: "2026/09/26 14:30",
        },
      ]);
    }
  }, []);

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px 20px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>📊 ShopPulse CRM</h1>
          <p style={{ color: "#64748b", marginTop: "8px" }}>
            店家健檢後台 v1
          </p>
        </div>

        <Link href="/" style={{ color: "#2563eb" }}>
          返回首頁
        </Link>
      </div>

      <div className="glass" style={{ borderRadius: "28px", padding: "26px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>客戶列表</h2>
            <p style={{ color: "#64748b" }}>
              共 {leads.length} 位店家
            </p>
          </div>

          <div
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px 18px",
              borderRadius: "999px",
              fontWeight: 700,
            }}
          >
            CRM v1
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <th align="left">店名</th>
                <th align="left">行業</th>
                <th align="center">健康度</th>
                <th align="left">提交時間</th>
                <th align="center">操作</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <td style={{ padding: "16px 0" }}>
                    {lead.store}
                  </td>

                  <td>{lead.industry}</td>

                  <td align="center">
                    <span
                      style={{
                        background: "#dbeafe",
                        color: "#2563eb",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontWeight: 700,
                      }}
                    >
                      {lead.score}
                    </span>
                  </td>

                  <td>{lead.date}</td>

                  <td align="center">
                    <button
                      className="btn-primary"
                      onClick={() => setSelected(lead)}
                    >
                      查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,.35)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            className="glass"
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "28px",
              padding: "30px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selected.store}</h2>

            <p>🏷️ {selected.industry}</p>

            <p>⭐ 健康度：{selected.score}</p>

            <p>📅 {selected.date}</p>

            <button
              className="btn-primary"
              style={{ width: "100%", marginTop: "20px" }}
              onClick={() => setSelected(null)}
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
