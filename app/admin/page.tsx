
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lead = {
  id: number;
  store: string;
  industry: string;
  score: number;
  date: string;
  preview?: string | null;
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("shoppulse_leads") || "[]"
    );

    setLeads(data);
  }, []);

  function deleteLead(id: number) {
    const next = leads.filter((item) => item.id !== id);

    setLeads(next);

    localStorage.setItem(
      "shoppulse_leads",
      JSON.stringify(next)
    );
  }

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
            永久保存健檢紀錄
          </p>
        </div>

        <Link href="/" style={{ color: "#2563eb" }}>
          返回首頁
        </Link>
      </div>

      <div
        className="glass"
        style={{
          borderRadius: "28px",
          padding: "26px",
        }}
      >
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
            Local DB
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
              {leads.map((lead) => (
                <tr
                  key={lead.id}
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

            {selected.preview && (
              <img
                src={selected.preview}
                alt="store"
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  marginTop: "16px",
                }}
              />
            )}

            <button
              className="btn-primary"
              style={{
                width: "100%",
                marginTop: "20px",
              }}
              onClick={() => setSelected(null)}
            >
              關閉
            </button>

            <button
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #ef4444",
                background: "white",
                color: "#ef4444",
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={() => {
                deleteLead(selected.id);
                setSelected(null);
              }}
            >
              刪除紀錄
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
