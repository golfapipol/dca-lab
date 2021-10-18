import 'tailwindcss/tailwind.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (<>
      <Head>
        <title>ความมั่งคั่งออกแบบได้ WHAT-IF DCA Fund</title>
        <meta property="og:type" content="article" key="type" />
        <meta property="og:title" content="ความมั่งคั่งออกแบบได้ WHAT-IF DCA Fund" key="title" />
        <meta property="og:description" content="ถ้าเราลง DCA กองทุนไว้ในอดีตจะเป็นอย่างไร จะกำไร หรือ ขาดทุน?" key="description" />
        <meta property="og:url" content="https://programmable-wealth-what-if-dca-fund.netlify.app"/>
        <meta property="og:image" content="https://programmable-wealth-what-if-dca-fund.netlify.app/cover-1.png"/>
        <meta property="og:image:secure_url" content="https://programmable-wealth-what-if-dca-fund.netlify.app/cover-1.png" /> 
        <meta property="og:image:type" content="image/png" /> 
        <meta property="twitter:title" content="ความมั่งคั่งออกแบบได้ WHAT-IF DCA Fund" />
        <meta property="twitter:description" content="ถ้าเราลง DCA กองทุนไว้ในอดีตจะเป็นอย่างไร จะกำไร หรือ ขาดทุน?" />
        <meta property="twitter:image" content="https://programmable-wealth-what-if-dca-fund.netlify.app/cover-1.png"/>
        <meta property="twitter:card" content="summary_large_image"/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YGN3J8VQVH"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());

          gtag('config', 'G-YGN3J8VQVH');
        `}</script>
        <script data-ad-client="ca-pub-4076028924879349" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>
      <Component {...pageProps} />
    </>)
}

export default MyApp
