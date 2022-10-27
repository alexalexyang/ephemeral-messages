
import Head from 'next/head'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { createVisitorId, getvisitorCoords, VisitorCoordsProps } from 'util/index'
import { NextPage } from 'next'
import DefaultLayout from 'components/layouts/default-layout'
import { ReqStatus } from 'types'
import { radiusFromVisitor1 } from 'util/constants'

type NearbyMsgProps = {
    visitorId: string;
    lon: number;
    lat: number;
    min: number;
    max: number;
    setMessages: Dispatch<SetStateAction<string[]>>;
}

export const getNearbyMessages = async ({ visitorId, lon, lat, min, max, setMessages }: NearbyMsgProps) => {
    const res = await fetch('/api/get-messages-within-range', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ visitorId, lon, lat, min, max })
    });

    const { status, messages } = await res.json()

    if (status === ReqStatus.SUCCESS) {
        setMessages(messages)
    }

}

const ReadMessagesPage: NextPage = () => {
    const [visitorCoords, setvisitorCoords] = useState<VisitorCoordsProps | undefined>();
    const [visitorId, setVisitorId] = useState<string>('')
    const [messages, setMessages] = useState<string[]>([])

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
            max: radiusFromVisitor1,
            setMessages
        })

    }, [visitorId, visitorCoords])

    return (
        <>
            <Head>
                <meta name="description" content="Read messages near you" />
            </Head>

            <DefaultLayout>
                <h1>Read some messages around you</h1>

                {!!messages.length && messages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </DefaultLayout>
        </>
    )
}

export default ReadMessagesPage