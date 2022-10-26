// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReqStatus } from 'types';
import { insertMessage } from 'util/db';

type Data = {
  result?: string;
  status: ReqStatus;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { visitorId, message, visitorCoords } = req.body

    const { status } = await insertMessage(visitorId, message, visitorCoords);

    res.status(200).json({ status })
  } catch (Error) {
    throw Error
  }
}
