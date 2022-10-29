import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styled from "styled-components";
import { Notice } from "styles/shared-comps";
import { MessagePacket, ReqStatus } from "types";

const MsgsWrapper = styled.section`
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

    messages && messages.forEach(msg => console.log(msg))

    return (
        <MsgsWrapper>
            <h2>Past messages</h2>

            {pastMsgsReqStatus === ReqStatus.PENDING && <Notice>"Getting your past messages..."</Notice>}

            {
                pastMsgsReqStatus !== ReqStatus.PENDING &&
                messages.length === 0 &&
                <Notice>No messages yet.</Notice>
            }

            {!!messages.length && messages.map((item, idx) => (
                <Message key={idx} dangerouslySetInnerHTML={{ __html: item.message }} />)
            )}
        </MsgsWrapper>
    )
}

export default PastMessages