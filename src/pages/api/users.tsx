import { NextApiRequest, NextApiResponse } from 'next'

//test
/**
 * @TODO
 * user 인증 api
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    user: '',
  })
}
