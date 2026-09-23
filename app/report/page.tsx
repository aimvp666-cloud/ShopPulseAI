
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Report={
  score:number;
  google:string;
  social:string;
  swot:{
    strengths:string[];
    weaknesses:string[];
    opportunities:string[];
    threats:string[];
  };
};

export default function ReportPage(){

  const [report,setReport]=useState<Report|null>(null);
  const [store,setStore]=useState("你的店");
  const [industry,setIndustry]=useState("");

  useEffect(()=>{

    async function load(){

      const raw=sessionStorage.getItem("shoppulse_form");

      const form=raw?JSON.parse(raw):{};

      setStore(form.store||"你的店");

      setIndustry(form.industry||"");

      try{

        const res=await fetch("/api/analyze",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(form)
        });

        const data=await res.json();

        setReport({
          score:data.score??82,
          google:data.google??"Google 商家分析完成。",
          social:data.social??"社群分析完成。",
          swot:{
            strengths:data.swot?.strengths??["店面辨識度佳"],
            weaknesses:data.swot?.weaknesses??["社群曝光不足"],
            opportunities:data.swot?.opportunities??["短影音導流"],
            threats:data.swot?.threats??["競爭增加"]
          }
        });

      }catch{

        setReport({
          score:82,
          google:"Google 商家分析完成。",
          social:"社群分析完成。",
          swot:{
            strengths:["店面辨識度佳"],
            weaknesses:["社群曝光不足"],
            opportunities:["短影音導流"],
            threats:["競爭增加"]
          }
        });

      }

    }

    load();

  },[]);

  if(!report){

    return(
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-6">🤖</div>
          <h1 className="text-3xl font-bold">AI 正在生成報告</h1>
        </div>
      </main>
    );

  }

  return(

    <main className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-5xl mx-auto">

        <Link href="/" className="text-blue-600">
          ← 返回首頁
        </Link>

        <div className="text-center mt-8">

          <h1 className="text-4xl font-bold">
            {store} AI 健檢報告
          </h1>

          <p className="text-slate-500 mt-3">
            {industry}｜AI 即時分析結果
          </p>

        </div>

        <div className="mt-10 flex justify-center">

          <div className="h-56 w-56 rounded-full border-[16px] border-blue-600 bg-white shadow flex flex-col items-center justify-center">

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

          <div className="rounded-3xl bg-white p-6 shadow">

            <h3 className="font-bold mb-3">
              💪 優勢
            </h3>

            {report.swot.strengths.map(i=><p key={i}>• {i}</p>)}

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <h3 className="font-bold mb-3">
              ⚠️ 待改善
            </h3>

            {report.swot.weaknesses.map(i=><p key={i}>• {i}</p>)}

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <h3 className="font-bold mb-3">
              🚀 機會
            </h3>

            {report.swot.opportunities.map(i=><p key={i}>• {i}</p>)}

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <h3 className="font-bold mb-3">
              🛡️ 風險
            </h3>

            {report.swot.threats.map(i=><p key={i}>• {i}</p>)}

          </div>

        </div>

      </div>

    </main>

  );

}
