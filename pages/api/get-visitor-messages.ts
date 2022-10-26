// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ReqStatus } from 'types';
import { getVisitorMessages, insertMessage } from 'util/db';

type Data = {
  messages?: unknown;
  status: ReqStatus;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { visitorId } = req.body

    const messages = await getVisitorMessages(visitorId);

    res.status(200).json({ status: ReqStatus.SUCCESS, messages })
  } catch (Error) {
    throw Error
  }
}
