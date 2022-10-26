
export enum ReqStatus {
    IDLE = "idle",
    PENDING = "pending",
    SUCCESS = "success",
    FAIL = "fail"
}

export type MessagePacket = {
    visitorId: string;
    message: string;
}