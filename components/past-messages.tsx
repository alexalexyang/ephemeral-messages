import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styled from "styled-components";
import { MessagePacket, ReqStatus } from "types";

const MsgsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Message = styled.div`
    border: 1px solid lightgray;
    box-shadow: 1px 1px 1px lightgray;
    border-radius: 1rem;
    padding: 1rem;
    width: 100%;
`

const getVisitorMessages = async (
    visitorId: string,
    setMessages: Dispatch<SetStateAction<MessagePacket[]>>,
    SetReqStatus: Dispatch<SetStateAction<ReqStatus>>
) => {
    const res = await fetch('/api/get-visitor-messages', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ visitorId })
    });

    const { status, messages } = await res.json()

    if (status === ReqStatus.SUCCESS) {
        setMessages(messages)
        SetReqStatus(ReqStatus.SUCCESS)
        return
    }

    SetReqStatus(ReqStatus.FAIL)
}

type Props = {
    visitorId: string;
    messages: MessagePacket[];
    setMessages: Dispatch<SetStateAction<MessagePacket[]>>;
    pastMsgsReqStatus: ReqStatus, setPastMsgsReqStatus: Dispatch<SetStateAction<ReqStatus>>;
}

const PastMessages = ({
    visitorId,
    messages,
    setMessages,
    pastMsgsReqStatus,
    setPastMsgsReqStatus
}: Props) => {
    useEffect(() => {
        if (!visitorId) return
        setPastMsgsReqStatus(ReqStatus.PENDING)
        getVisitorMessages(visitorId, setMessages, setPastMsgsReqStatus)
    }, [visitorId])

    return (
        <MsgsWrapper>
            <h2>Past messages</h2>

            {pastMsgsReqStatus === ReqStatus.PENDING && "Getting your past messages..."}

            {
                pastMsgsReqStatus !== ReqStatus.PENDING &&
                messages.length === 0 &&
                <span>No messages yet.</span>
            }

            {!!messages.length && messages.map((item, idx) => (
                <Message key={idx}>
                    <span>{item.message}</span>
                </Message>)
            )}
        </MsgsWrapper>
    )
}

export default PastMessages