import MapLayout from 'components/layouts/map-layout'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Map = dynamic(() => import('components/map'), {
  ssr: false,
})

export default function Home() {

  return (
    <>
      <Head>
        <meta name="description" content="Look for messages around you on this map" />
      </Head>

      <MapLayout>
        <Map />
      </MapLayout>
    </>
  )
}
