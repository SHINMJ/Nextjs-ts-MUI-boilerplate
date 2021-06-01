import { AUTH_TOKEN } from '@constants/env'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const authToken = req.headers[AUTH_TOKEN]

  if (authToken == '123212312312') {
    res.status(200).json({ email: 'admin@exmaple.com' })
  } else if (!req.headers[AUTH_TOKEN]) {
    res.status(401).json({ message: 'Authentication requried' })
  } else {
    res.status(403).json({ message: 'Not permitted' })
  }
}
