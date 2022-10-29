import DOMPurify from "dompurify";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components"
import { breakpoints } from "styles/constants";
import { MessagePacket, ReqStatus } from "types";
import { VisitorCoordsProps } from "util/index";
import { allowedHtmlTags, maxTextLength } from "util/constants";
import EyeIcon from "./icons/eye-icon";

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 1.5rem;
    padding: 1rem;
    background-color: lightblue;
    align-items: center;
    box-shadow: 2px 2px 2px lightgray;

    @media only screen and (min-width: ${breakpoints.md}px) {
        padding: 2rem;
  }
`
const TextArea = styled.textarea`
    height: 15rem;
    width: 100%;
    border-radius: 1rem;
    padding: 0.5rem;

    @media only screen and (min-width: ${breakpoints.md}px) {
        padding: 1rem;
  }
`

const BtnsWrapper = styled.div`
   width: 100%;
   display: flex;
   gap: 0.5rem;
`

const BtnBox = styled.div`
    display: flex;
`

const BtnBoxSide = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
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

const SubmitBtn = styled.button<{ disabled: boolean; }>`
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

const PreviewBtn = styled(SubmitBtn)`
    height: 3.5rem;
    width: 3.5rem;
    font-size: 1rem;
    padding: 0;
    background-color: lightgreen;

    :hover {
        background-color: palegreen;
    }

    :active {
        background-color: lime;
    }
`

type Props = {
    visitorCoords: VisitorCoordsProps;
    visitorId: string;
    msgs: MessagePacket[];
    setMsgs: Dispatch<SetStateAction<MessagePacket[]>>;
    newMsg: string;
    setNewMsg: Dispatch<SetStateAction<string>>;
    setPreview: Dispatch<SetStateAction<string>>;
}

const Form = ({
    newMsg,
    visitorCoords,
    visitorId,
    setMsgs,
    msgs,
    setNewMsg,
    setPreview
}: Props) => {
    const [newMsgReqStatus, SetNewMsgReqStatus] = useState<ReqStatus>(ReqStatus.IDLE)

    return (
        <StyledForm onSubmit={async (e) => {
            e.preventDefault()

            if (!newMsg) return

            if (!visitorCoords) {
                alert("Please share your location.")
                return
            }

            SetNewMsgReqStatus(ReqStatus.PENDING)

            const sanitised = DOMPurify.sanitize(
                newMsg,
                { ALLOWED_TAGS: allowedHtmlTags })

            const status = await handleSubmit(
                visitorId,
                sanitised,
                visitorCoords
            )

            if (status === "success") {
                SetNewMsgReqStatus(ReqStatus.SUCCESS)
                setMsgs([{ visitorId, message: sanitised }, ...msgs])
                setNewMsg("")
                setPreview("")

                setTimeout(() => {
                    SetNewMsgReqStatus(ReqStatus.IDLE)
                }, 10000)

                return
            }

            SetNewMsgReqStatus(ReqStatus.FAIL)
            alert("Could not post message. Please try again later.")
        }}>
            <TextArea maxLength={maxTextLength} onChange={(e) =>
                setNewMsg(e.target.value)
            } value={newMsg} />
            <BtnsWrapper>
                <BtnBoxSide></BtnBoxSide>
                <BtnBox>
                    <SubmitBtn
                        type="submit"
                        disabled={newMsgReqStatus === ReqStatus.PENDING}
                    >
                        Submit
                    </SubmitBtn>
                </BtnBox>

                <BtnBoxSide>
                    <PreviewBtn
                        type="button"
                        disabled={false}
                        aria-label="Preview"
                        onClick={() => {
                            const sanitised = DOMPurify.sanitize(
                                newMsg,
                                { ALLOWED_TAGS: allowedHtmlTags })

                            setPreview(sanitised)
                        }}
                    >
                        <EyeIcon width={30} height={30} />
                    </PreviewBtn>
                </BtnBoxSide>
            </BtnsWrapper>
        </StyledForm >
    )
}

export default Form