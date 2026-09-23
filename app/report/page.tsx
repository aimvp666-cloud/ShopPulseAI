
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

const fallback:Report={
  score:86,
  google:"Google 商家仍有曝光提升空間。",
  social:"社群更新頻率偏低。",
  swot:{
    strengths:["店面辨識度高"],
    weaknesses:["社群曝光不足"],
    opportunities:["短影音導流"],
    threats:["附近競爭增加"]
  }
};

export default function ReportPage(){

  const [report,setReport]=useState(fallback);
  const [score,setScore]=useState(0);
  const [store,setStore]=useState("你的店");

  useEffect(()=>{

    const raw=sessionStorage.getItem("shoppulse_form");

    if(raw){

      const form=JSON.parse(raw);

      setStore(form.store||"你的店");

    }

  },[]);

  useEffect(()=>{

    let value=0;

    const timer=setInterval(()=>{

      value++;

      if(value>=report.score){

        value=report.score;

        clearInterval(timer);

      }

      setScore(value);

    },20);

    return()=>clearInterval(timer);

  },[report.score]);

  async function download(){

    const res=await fetch("/api/pdf",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        store,
        score:report.score,
        google:report.google,
        social:report.social
      })
    });

    const html=await res.text();

    const w=window.open("");

    if(w){

      w.document.write(html);

      w.document.close();

      setTimeout(()=>w.print(),500);

    }

  }

  return(

    <main
      style={{
        maxWidth:"1000px",
        margin:"auto",
        padding:"30px 20px 80px"
      }}
    >

      <Link href="/" style={{color:"#2563eb"}}>
        ← 返回首頁
      </Link>

      <div
        className="glass"
        style={{
          borderRadius:"36px",
          padding:"40px",
          marginTop:"20px",
          textAlign:"center"
        }}
      >

        <h1 style={{fontSize:"42px"}}>
          {store} AI 健檢報告
        </h1>

        <div
          style={{
            width:"220px",
            height:"220px",
            margin:"40px auto",
            borderRadius:"999px",
            background:"conic-gradient(#2563eb 310deg,#e5e7eb 0)",
            padding:"14px"
          }}
        >

          <div
            style={{
              background:"white",
              width:"100%",
              height:"100%",
              borderRadius:"999px",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column"
            }}
          >

            <div style={{fontSize:"54px",fontWeight:800}}>
              {score}
            </div>

            <div style={{color:"#64748b"}}>
              健康度
            </div>

          </div>

        </div>

      </div>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
          gap:"22px",
          marginTop:"30px"
        }}
      >

        <div className="card" style={{padding:"24px"}}>

          <h3>⭐ Google 商家</h3>

          <p>{report.google}</p>

        </div>

        <div className="card" style={{padding:"24px"}}>

          <h3>📱 社群分析</h3>

          <p>{report.social}</p>

        </div>

      </div>

      <div
        style={{
          textAlign:"center",
          marginTop:"40px"
        }}
      >

        <button
          className="btn-primary"
          onClick={download}
        >
          📄 下載 PDF 顧問報告
        </button>

      </div>

    </main>

  );

}
