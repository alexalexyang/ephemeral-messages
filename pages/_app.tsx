import '../styles/tailwind-preflight.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Vapour</title>
      <meta name="description" content="Vapour by Supermeowkat" />
      <link rel="icon" href="/logo-512x512-white-bg.png" />

      <link rel="manifest" href="/manifest.json" />

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
        integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=" crossOrigin='' />
    </Head>
    <Component {...pageProps} />
  </>
}
