
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReqStatus } from 'types';
import { getMessagesWithinRange } from 'util/db';

type Data = {
    results?: string[];
    status: ReqStatus;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const { visitorId, lon, lat, min, max } = req.body

        const data = await getMessagesWithinRange<{ message: string; count: number; }>({
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
                count: 1
            },
            sampleSize: 5,
        })

        // Todo: batch delete and batch upsert

        const results = data.map(item => {

            if (item.count === 4) {
                // Delete message (current user is 5th reader)
            }

            if (item.count < 4) {
                // Upsert count +1
            }

            return item.message
        })

        res.status(200).json({ status: ReqStatus.SUCCESS, results })
    } catch (Error) {
        throw Error
    }
}