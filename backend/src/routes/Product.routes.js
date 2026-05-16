const express = require('express');
const multer = require('multer');
const { verifyToken } = require('../middleware/auth.middleware');
const { ImportProducts } = require('../controllers/product.controller');
const router = express.Router();


const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        //Only allow Excel Files 
        const isExcel =
            file.mimetype === 'application/vnd.ms-excel' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.originalname.endsWith('.xlsx') ||
            file.originalname.endsWith('.xls')


        if (isExcel) {
            cb(null, true) //accept file
        } else {
            cb(new Error('Only .xlsx and .xls files are allowed'), false)
        }
    }


})

router.post('/import', verifyToken, upload.single('file'), ImportProducts)

module.exports = router;