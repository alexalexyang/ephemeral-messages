
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

        const results = await getMessagesWithinRange({
            visitorId: visitorId as string,
            coordinates: [
                lon,
                lat
            ],
            distance: {
                min: min,
                max: max,
            }
        })

        res.status(200).json({ status: ReqStatus.SUCCESS, results })
    } catch (Error) {
        throw Error
    }
}