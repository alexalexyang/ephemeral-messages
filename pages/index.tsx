import MapLayout from 'components/layouts/map-layout'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { createVisitorId, getvisitorCoords, VisitorCoordsProps } from 'util/index'
import { ReqStatus } from 'types'

const Map = dynamic(() => import('components/map'), {
  ssr: false,
})

type NearbyMsgProps = {
  visitorId: string;
  lon: number;
  lat: number;
  min: number;
  max: number;
  setMsgLocs: Dispatch<SetStateAction<[number, number][]>>;
}

export const getNearbyMsgLocs = async ({ visitorId, lon, lat, min, max, setMsgLocs }: NearbyMsgProps) => {
  const res = await fetch('/api/get-msg-locs-within-range', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ visitorId, lon, lat, min, max })
  });

  const { status, results } = await res.json()

  if (status === ReqStatus.SUCCESS) {
    setMsgLocs(results)
  }

}

export default function Home() {
  const [visitorCoords, setvisitorCoords] = useState<VisitorCoordsProps | undefined>();
  const [visitorId, setVisitorId] = useState<string>('')
  const [msgLocs, setMsgLocs] = useState<[number, number][]>([])

  console.log(msgLocs)

  useEffect(() => {
    getvisitorCoords(setvisitorCoords);
    createVisitorId(setVisitorId)
  }, [])

  useEffect(() => {
    if (!visitorCoords || !visitorId) return

    const { lon, lat } = visitorCoords

    getNearbyMsgLocs({
      visitorId,
      lon,
      lat,
      min: 0,
      max: 100000,
      setMsgLocs
    })

  }, [visitorId, visitorCoords])

  return (
    <>
      <Head>
        <meta name="description" content="Look for messages around you on this map" />
      </Head>

      {visitorCoords && <MapLayout>
        <Map visitorCoords={[visitorCoords.lat, visitorCoords.lon]} msgLocs={msgLocs} />
      </MapLayout>}
    </>
  )
}
