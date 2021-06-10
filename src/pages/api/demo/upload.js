import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import multer from 'multer'

/**
 * editor image upload test api
 */

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
})

// const uploadMiddleware = upload.array('upload')

const handler = nc({
  onError(err, req, res) {
    console.log('onError', err)
    res
      .status(501)
      .json({ error: `Sorry something happened!!! ${err.message}` })
  },
  onNoMatch(req, res) {
    console.log('onnomatch')
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

handler.use(upload.single('upload'))

handler.post((req, res) => {
  const filename = req.file.filename
  res.status(200).json({
    uploaded: 1,
    fileName: `${filename}`,
    url: `/uploads/${filename}`,
    data: 'success',
  })
})

export default handler

// api routes에서는 config를 내보내 기본 구성을 변경할 수 있다.
export const config = {
  api: {
    bodyParser: false, //Disallow body parsing, consume as stream
  },
}
