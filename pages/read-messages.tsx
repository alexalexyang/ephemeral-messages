
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { createVisitorId, getvisitorCoords, VisitorCoordsProps } from 'util/index'
import { NextPage } from 'next'
import { getNearbyMessages } from 'pages'
import DefaultLayout from 'components/layouts/default-layout'

const ReadMessagesPage: NextPage = () => {
    const [visitorCoords, setvisitorCoords] = useState<VisitorCoordsProps | undefined>();
    const [visitorId, setVisitorId] = useState<string>('')
    const [msgLocs, setMsgLocs] = useState<[number, number][]>([])

    useEffect(() => {
        getvisitorCoords(setvisitorCoords);
        createVisitorId(setVisitorId)
    }, [])

    useEffect(() => {
        if (!visitorCoords || !visitorId) return

        const { lon, lat } = visitorCoords

        getNearbyMessages({
            visitorId,
            lon,
            lat,
            min: 0,
            max: 10,
            setMsgLocs
        })

    }, [visitorId, visitorCoords])

    return (
        <>
            <Head>
                <meta name="description" content="Read messages near you" />
            </Head>

            <DefaultLayout>
                <h1>Read some messages around you</h1>
            </DefaultLayout>
        </>
    )
}

export default ReadMessagesPage