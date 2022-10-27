
import { AnyBulkWriteOperation, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReqStatus } from 'types';
import { bulkWrite, getMessagesWithinRange } from 'util/db';

type Message = { message: string; readCount: number; }

type Data = {
    messages?: string[];
    status: ReqStatus;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const { visitorId, lon, lat, min, max } = req.body

        const data = await getMessagesWithinRange<Message>({
            visitorId: visitorId as string,
            coordinates: [
                lon,
                lat
            ],
            distance: {
                min: min,
                max: max,
            },
            projection: {
                message: 1,
                readCount: 1
            },
            sampleSize: 5,
        })

        // Todo: batch delete and batch upsert

        const reduced = data.reduce((acc, item) => {

            return {
                messages: [...acc.messages, item.message],

                toUpsert: item.readCount < 4 ? [...acc.toUpsert, {
                    updateOne: {
                        filter: { _id: item._id },
                        update: {
                            $inc: { readCount: 1 },
                            $addToSet: { visitors: visitorId }
                        }
                    }
                }] : acc.toUpsert,

                toDelete: item.readCount === 4 ? [...acc.toDelete, {
                    deleteOne: { filter: { _id: item._id } }
                }] : acc.toDelete
            }
        }, {
            messages: [] as string[],
            toUpsert: [] as AnyBulkWriteOperation<object>[],
            toDelete: [] as AnyBulkWriteOperation<object>[]
        })

        if (reduced.toUpsert.length || reduced.toDelete.length) {
            const result = await bulkWrite([...reduced.toUpsert, ...reduced.toDelete])
        }

        res.status(200).json({ status: ReqStatus.SUCCESS, messages: reduced.messages })
    } catch (Error) {
        throw Error
    }
}