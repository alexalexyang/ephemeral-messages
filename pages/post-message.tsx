import DefaultLayout from 'components/layouts/default-layout'
import PastMessages from 'components/past-messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MessagePacket, ReqStatus } from 'types'
import { maxMsgs, maxTextLength } from 'util/constants'
import { createVisitorId, VisitorCoordsProps } from 'util/index'
import { getvisitorCoords } from 'util/index'
import Form from 'components/form';
import Preview from 'components/preview'
import { Notice } from 'styles/shared-comps'

const Counter = styled.span`
    letter-spacing: 0.3px;
    align-self: end;
`

const PostMessage: NextPage = () => {
    const [visitorCoords, setvisitorCoords] = useState<VisitorCoordsProps | undefined>();
    const [visitorId, setVisitorId] = useState<string>('')

    const [pastMsgsReqStatus, setPastMsgsReqStatus] = useState<ReqStatus>(ReqStatus.IDLE)
    const [msgs, setMsgs] = useState<MessagePacket[]>([])

    const [newMsg, setNewMsg] = useState<string>("")
    const [preview, setPreview] = useState<string>("")

    useEffect(() => {
        getvisitorCoords(setvisitorCoords);
        createVisitorId(setVisitorId)
    }, []); // eslint-disable-line

    if (visitorCoords && visitorCoords.denied) {
        return (
            <>
                <h1>Please allow sharing of GPS coordinates.</h1>
            </>
        )
    }

    return (
        <>
            <Head>
                <meta name="description" content="Post a message" />
            </Head>

            <DefaultLayout>
                <h1>Post a message</h1>

                {pastMsgsReqStatus === ReqStatus.PENDING && <Notice>"Please wait..."</Notice>}

                {msgs.length === maxMsgs && <Notice>You've reached the maximum number of messages.</Notice>}

                {msgs.length < maxMsgs && pastMsgsReqStatus === ReqStatus.SUCCESS && visitorCoords &&
                    <>
                        <Form
                            newMsg={newMsg}
                            visitorCoords={visitorCoords}
                            visitorId={visitorId}
                            setMsgs={setMsgs}
                            msgs={msgs}
                            setNewMsg={setNewMsg}
                            setPreview={setPreview}
                        />

                        <Counter>{maxTextLength - newMsg.length} characters left</Counter>
                    </>
                }

                {preview &&
                    <section>
                        <Preview content={preview} />
                    </section>}

                <PastMessages
                    visitorId={visitorId}
                    messages={msgs}
                    setMessages={setMsgs}
                    pastMsgsReqStatus={pastMsgsReqStatus}
                    setPastMsgsReqStatus={setPastMsgsReqStatus}
                />
            </DefaultLayout>
        </>
    )
}

export default PostMessage