
import Head from 'next/head'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { createVisitorId, getvisitorCoords, VisitorCoordsProps } from 'util/index'
import { NextPage } from 'next'
import DefaultLayout from 'components/layouts/default-layout'
import { ReqStatus } from 'types'
import { radiusFromVisitor1 } from 'util/constants'
import styled from 'styled-components'

const MsgsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    margin-bottom: 5rem;

    color: #444444;
    font-size: 1.2rem;
    font-weight: 200;
    letter-spacing: 0.09px;
    line-height: 1.9rem;
`

const MsgBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Msg = styled.div`
    width: 100%;
`

const Hr = styled.hr`
    border-top: none;
    border-bottom: 1px solid red;
    margin: 2rem 0;
`

type NearbyMsgProps = {
    visitorId: string;
    lon: number;
    lat: number;
    min: number;
    max: number;
    setMessages: Dispatch<SetStateAction<string[]>>;
    setGetReqStatus: Dispatch<SetStateAction<ReqStatus>>
}

export const getNearbyMessages = async ({ visitorId, lon, lat, min, max, setMessages, setGetReqStatus }: NearbyMsgProps) => {
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
        setGetReqStatus(ReqStatus.SUCCESS)
        return
    }
    setGetReqStatus(ReqStatus.FAIL)
}

const ReadMessagesPage: NextPage = () => {
    const [visitorCoords, setvisitorCoords] = useState<VisitorCoordsProps | undefined>();
    const [visitorId, setVisitorId] = useState<string>('')
    const [messages, setMessages] = useState<string[]>([])

    const [getReqStatus, setGetReqStatus] = useState<ReqStatus>(ReqStatus.IDLE)

    useEffect(() => {
        getvisitorCoords(setvisitorCoords);
        createVisitorId(setVisitorId)
    }, [])

    useEffect(() => {
        if (!visitorCoords || !visitorId) return

        const { lon, lat } = visitorCoords

        setGetReqStatus(ReqStatus.PENDING)

        getNearbyMessages({
            visitorId,
            lon,
            lat,
            min: 0,
            max: radiusFromVisitor1,
            setMessages,
            setGetReqStatus
        })

    }, [visitorId, visitorCoords])

    return (
        <>
            <Head>
                <meta name="description" content="Read messages near you" />
            </Head>

            <DefaultLayout>
                <h1>Messages within {radiusFromVisitor1}m of you</h1>

                <MsgsWrapper>
                    {
                        (getReqStatus === ReqStatus.IDLE ||
                            getReqStatus === ReqStatus.PENDING) &&
                        <span>Please wait...</span>
                    }

                    {getReqStatus === ReqStatus.SUCCESS &&
                        messages.length === 0 &&
                        <span>No message here yet.</span>}

                    {!!messages.length && messages.map((msg, idx) => (
                        <MsgBox key={idx}>
                            <Msg>{msg}</Msg>
                            {idx + 1 !== messages.length && <Hr />}
                        </MsgBox>
                    ))}
                </MsgsWrapper>
            </DefaultLayout>
        </>
    )
}

export default ReadMessagesPage