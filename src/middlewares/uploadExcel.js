// middlewares/uploadExcel.js
import multer from 'multer'

const storage = multer.memoryStorage()

export const uploadExcel = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      cb(null, true)
    } else {
      cb(new Error('Solo archivos Excel (.xlsx)'))
    }
  },
})
