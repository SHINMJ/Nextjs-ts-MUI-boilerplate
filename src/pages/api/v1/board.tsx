import { NextApiRequest, NextApiResponse } from 'next'
import { format } from '../../../libs/date'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const boards = []

  const type = req.query?.type || 'default'

  for (let index = 0; index < 100; index++) {
    boards.push({
      name: `board ${type}_${index}`,
      code: `code_${type}_${index}`,
      isUse: index % 2 == 0 ? true : false,
      date: format(Date.now(), 'yyyy-MM-dd'),
      datetime: Date.now(),
      isEdit: index % 3 == 0 ? true : false,
    })
  }

  res.status(200).json(JSON.stringify(boards))
}
