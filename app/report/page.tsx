
"use client";

import { useEffect, useState } from "react";

export default function ReportPage() {

  const [loading,setLoading]=useState(true);
  const [report,setReport]=useState<any>(null);

  useEffect(()=>{

    async function load(){

      const res=await fetch("/api/analyze",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          store:"示範店家",
          industry:"餐飲",
          visitors:"80",
          price:"250",
          revenue:"50萬",
          problem:"客流下降"
        })
      });

      const data=await res.json();

      setReport(data);

      setLoading(false);

    }

    load();

  },[]);

  if(loading){

    return(

      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">

        <div className="animate-pulse text-center">

          <div className="text-5xl mb-6">🤖</div>

          <h1 className="text-3xl font-bold">
            AI 正在分析你的店面
          </h1>

          <p className="text-slate-500 mt-3">
            Google、社群、SWOT 正在生成...
          </p>

        </div>

      </main>

    );

  }

  return(

    <main className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center">
          商脈 AI 健檢報告
        </h1>

        <div className="mt-10 flex justify-center">

          <div className="h-56 w-56 rounded-full border-[16px] border-blue-600 flex flex-col items-center justify-center bg-white shadow">

            <div className="text-5xl font-bold">
              {report.score}
            </div>

            <div className="text-slate-500">
              健康度
            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="font-bold mb-3">
              Google 商家
            </h2>

            <p>{report.google}</p>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <h2 className="font-bold mb-3">
              社群分析
            </h2>

            <p>{report.social}</p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="rounded-3xl bg-white p-6 shadow">

            <h3 className="font-bold mb-3">
              💪 優勢
            </h3>

            {report.swot.strengths.map((i:string)=>(
              <p key={i}>• {i}</p>
            ))}

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <h3 className="font-bold mb-3">
              ⚠️ 待改善
            </h3>

            {report.swot.weaknesses.map((i:string)=>(
              <p key={i}>• {i}</p>
            ))}

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <h3 className="font-bold mb-3">
              🚀 機會
            </h3>

            {report.swot.opportunities.map((i:string)=>(
              <p key={i}>• {i}</p>
            ))}

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <h3 className="font-bold mb-3">
              🛡️ 風險
            </h3>

            {report.swot.threats.map((i:string)=>(
              <p key={i}>• {i}</p>
            ))}

          </div>

        </div>

      </div>

    </main>

  );

}
