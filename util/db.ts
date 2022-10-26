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
    visitorCoords: [number, number]
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
                    createdAt: new Date(),
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

/**
 * `distance` in metres.
 */
type GetVisitorsWithinRangeProps = {
    visitorId: string;
    coordinates: [number, number];
    distance: { min: number; max: number };
}


export const getMessagesWithinRange = async ({ visitorId, coordinates, distance }: GetVisitorsWithinRangeProps): Promise<number[][]> => {

    const { min, max } = distance

    console.log(`Looking for messages near ${coordinates[0]}, ${coordinates[1]}, between ${min} and ${max}m.`)

    const client = await connectDb();

    const res = client.db(ephemeralDb).collection(messagesColl).find(
        {
            coords: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates
                    },
                    $minDistance: min,
                    $maxDistance: max
                }
            },
            visitorId: {
                $ne: visitorId
            }
        }
    ).project({
        coords: 1
    })

    const data = await Promise.resolve(res.toArray()) as (WithId<Document & { coords: { coordinates: number[] } }>)[]

    const result = data.map(item => item.coords.coordinates)

    return result
}