import { NextApiRequest, NextApiResponse } from 'next'

/**
 * test api
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`api login  ${req.body.email}`)
  if (req.body.email === 'admin@example.com') {
    res.status(200).json({ authToken: '123212312312' })
  } else {
    res.status(400).json({ error: 'Invalid Credentials' })
  }
}
