import { AnyBulkWriteOperation, BulkWriteResult, MongoClient, WithId } from "mongodb";
import { MessagePacket, ReqStatus } from "types";

const ephemeralDb = "ephemeral"
const messagesColl = "messages"

const connectDb = async (): Promise<MongoClient> =>
    await MongoClient.connect(
        `mongodb+srv://nate:${process.env.MONGODB_PW}@cluster0.es9vt.mongodb.net/${ephemeralDb}?retryWrites=true&w=majority`
    );

export const getVisitorMessages = async (visitorId: string): Promise<MessagePacket[]> => {

    const client = await connectDb();

    const res = (await client
        .db(ephemeralDb)
        .collection(messagesColl)
        .find({ visitorId })
        .toArray()) as WithId<MessagePacket & Document>[]

    client.close();

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
                    readCount: 0,
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
    projection: Record<string, any>,
    sampleSize: number;
}


export const getMessagesWithinRange = async <T>({ visitorId, coordinates, distance, projection, sampleSize }: GetVisitorsWithinRangeProps): Promise<WithId<Document & T>[]> => {

    const { min, max } = distance


    const client = await connectDb();

    const res = client.db(ephemeralDb).collection(messagesColl).aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates },
                distanceField: "dist.calculated",
                minDistance: min,
                maxDistance: max,
                includeLocs: "dist.location",
                spherical: true,
                query: {
                    visitorId: {
                        $ne: visitorId
                    }
                }
            }
        },
        { $sample: { size: sampleSize } }
    ])
        .project(projection)

    const data = await Promise.resolve(res.toArray()) as (WithId<Document & T>)[]

    return data
}

export const bulkWrite = async (commands: AnyBulkWriteOperation<object>[]): Promise<BulkWriteResult> => {
    const client = await connectDb();

    const result = await client
        .db(ephemeralDb)
        .collection(messagesColl)
        .bulkWrite(commands)

    client.close();

    return result
}