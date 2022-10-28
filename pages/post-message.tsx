import DefaultLayout from 'components/layouts/default-layout'
import PastMessages from 'components/past-messages'
import * as DOMPurify from "dompurify";
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { breakpoints } from 'styles/constants'
import { MessagePacket, ReqStatus } from 'types'
import { maxMsgs, maxTextLength } from 'util/constants'
import { createVisitorId, VisitorCoordsProps } from 'util/index'
import { getvisitorCoords } from 'util/index'

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 1.5rem;
    padding: 2rem 1rem;
    background-color: lightblue;
    align-items: center;
    box-shadow: 2px 2px 2px lightgray;
`

const TextArea = styled.textarea`
    height: 15rem;
    width: 100%;
    border-radius: 1rem;
    padding: 0.5rem;

    @media only screen and (min-width: ${breakpoints.md}px) {
        width: ${breakpoints.sm}px;
        padding: 1rem;
  }
`

const Button = styled.button<{ disabled: boolean; }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    width: 5rem;
    padding: 1rem;
    border: 1px solid darkgray;
    background-color: ${({ disabled }) => disabled ? "lightgray" : "pink"};
    box-shadow: 2px 2px 2px lightgray;
    border-radius: 50%;
    color: ${({ disabled }) => disabled ? "gray" : "black"};

    :hover {
        background-color: ${({ disabled }) => disabled ? "lightgray" : "mistyrose"};
    }

    :active {
        background-color: ${({ disabled }) => disabled ? "lightgray" : "lavenderblush"};
    }
`

const Counter = styled.span`
    letter-spacing: 0.3px;
    align-self: end;
`

const handleSubmit = async (visitorId: string, message: string, visitorCoords: VisitorCoordsProps) => {
    const res = await fetch('/api/post-message', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ visitorId, message, visitorCoords })
    });

    const { status } = await res.json()

    return status
}

const PostMessage: NextPage = () => {
    const [visitorCoords, setvisitorCoords] = useState<VisitorCoordsProps | undefined>();
    const [visitorId, setVisitorId] = useState<string>('')

    const [pastMsgsReqStatus, setPastMsgsReqStatus] = useState<ReqStatus>(ReqStatus.IDLE)
    const [msgs, setMsgs] = useState<MessagePacket[]>([])

    const [newMsgReqStatus, SetNewMsgReqStatus] = useState<ReqStatus>(ReqStatus.IDLE)
    const [newMsg, setNewMsg] = useState<string>("")

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

                {pastMsgsReqStatus === ReqStatus.PENDING && "Please wait..."}

                {msgs.length === maxMsgs && <span>You've reached the maximum number of messages.</span>}

                {msgs.length < maxMsgs && pastMsgsReqStatus === ReqStatus.SUCCESS &&
                    <>
                        <Form onSubmit={async (e) => {
                            e.preventDefault()

                            if (!visitorCoords) {
                                alert("Please share your location.")
                                return
                            }

                            SetNewMsgReqStatus(ReqStatus.PENDING)

                            const sanitised = DOMPurify.sanitize(
                                newMsg,
                                {
                                    ALLOWED_TAGS:
                                        [
                                            'b',
                                            'strong',
                                            'em',
                                            'i',
                                            'u'
                                        ]
                                })

                            const status = await handleSubmit(
                                visitorId,
                                sanitised,
                                visitorCoords
                            )

                            if (status === "success") {
                                SetNewMsgReqStatus(ReqStatus.SUCCESS)
                                setMsgs([{ visitorId, message: sanitised }, ...msgs])
                                setNewMsg("")

                                setTimeout(() => {
                                    SetNewMsgReqStatus(ReqStatus.IDLE)
                                }, 10000)

                                return
                            }

                            SetNewMsgReqStatus(ReqStatus.FAIL)
                            alert("Could not post message. Please try again later.")
                        }}>
                            <TextArea maxLength={maxTextLength} onChange={(e) => setNewMsg(e.target.value)} value={newMsg} />
                            <Button
                                type="submit"
                                disabled={newMsgReqStatus === ReqStatus.PENDING}
                            >
                                Submit
                            </Button>
                        </Form>

                        <Counter>{maxTextLength - newMsg.length} characters left</Counter>
                    </>
                }

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