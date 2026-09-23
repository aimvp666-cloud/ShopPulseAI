
import "./globals.css";
import Link from "next/link";

export const metadata={
  title:"ShopPulse AI",
  description:"AI 店家健檢"
};

export default function RootLayout({
  children,
}:{
  children:React.ReactNode;
}){

  return(

    <html lang="zh-Hant">

      <body>

        <header
          style={{
            position:"sticky",
            top:0,
            zIndex:1000,
            padding:"14px 18px"
          }}
        >

          <nav
            className="glass"
            style={{
              maxWidth:"1200px",
              margin:"auto",
              borderRadius:"999px",
              padding:"14px 22px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}
          >

            <Link href="/" style={{
              fontWeight:800,
              fontSize:"20px",
              color:"#2563eb"
            }}>
              🚀 ShopPulse AI
            </Link>

            <div style={{
              display:"flex",
              gap:"12px"
            }}>

              <Link href="/check" className="btn-primary">
                免費健檢
              </Link>

            </div>

          </nav>

        </header>

        {children}

      </body>

    </html>

  );

}
