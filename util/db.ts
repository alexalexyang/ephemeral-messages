import { MongoClient, WithId } from "mongodb";
import { MessagePacket, ReqStatus } from "types";
import type { VisitorCoordsProps } from "util/index";

const ephemeralDb = "ephemeral"
const messagesColl = "messages"

const connectDb = async (): Promise<MongoClient> =>
    await MongoClient.connect(
        `mongodb+srv://nate:${process.env.MONGODB_PW}@cluster0.es9vt.mongodb.net/${ephemeralDb}?retryWrites=true&w=majority`
    );

export const getVisitorMessages = async (visitorId: string): Promise<MessagePacket[]> => {

    const client = await connectDb();

    console.log({ visitorId })

    const res = (await client
        .db(ephemeralDb)
        .collection(messagesColl)
        .find({ visitorId })
        .toArray()) as WithId<MessagePacket & Document>[]

    client.close();

    console.log({ res })

    const messages = res.map(item => ({
        visitorId: item.visitorId,
        message: item.message
    }))

    return messages
}


export const insertMessage = async (
    visitorId: string,
    message: string,
    visitorCoords: VisitorCoordsProps
): Promise<{ status: ReqStatus; }> => {
    try {
        const client = await connectDb();

        const result = await client
            .db(ephemeralDb)
            .collection(messagesColl)
            .insertOne(
                {
                    visitorId,
                    message,
                    coords: {
                        type: "Point",
                        coordinates: visitorCoords,
                    },
                },
            );

        client.close();

        return {
            status: result.insertedId ? ReqStatus.SUCCESS : ReqStatus.FAIL
        }
    } catch (error) {
        throw error
    }
};