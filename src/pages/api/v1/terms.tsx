import { NextApiRequest, NextApiResponse } from 'next'
import { format } from '../../../libs/date'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const terms = []

  for (let index = 1; index <= 100; index++) {
    terms.push({
      id: index,
      rownum: 100 - index + 1,
      type: index % 2 == 0 ? 'PP' : 'TOS',
      title: index % 2 == 0 ? '개인 정보 처리 방침' : '이용 약관',
      isUse: true,
      registDate: new Date(),
    })
  }

  res.status(200).json(JSON.stringify(terms))
}
