
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReqStatus } from 'types';
import { getMessagesWithinRange } from 'util/db';

type Data = {
    results?: number[][];
    status: ReqStatus;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const { visitorId, lon, lat, min, max } = req.body

        const data = await getMessagesWithinRange<{ coords: { coordinates: number[] } }>({
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
                coords: 1
            },
            sampleSize: 5,
        })

        const results = data.map(item => item.coords.coordinates)

        res.status(200).json({ status: ReqStatus.SUCCESS, results })
    } catch (Error) {
        throw Error
    }
}