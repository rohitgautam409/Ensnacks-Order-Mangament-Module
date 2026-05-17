const express = require('express');
const multer = require('multer');
const { verifyToken, requireAdmin } = require('../middleware/auth.middleware');
const { 
    ImportProducts, 
    getAllProducts, 
    getProductById, 
    addProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/product.controller');

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const isExcel =
            file.mimetype === 'application/vnd.ms-excel' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.originalname.endsWith('.xlsx') ||
            file.originalname.endsWith('.xls')

        if (isExcel) {
            cb(null, true)
        } else {
            cb(new Error('Only .xlsx and .xls files are allowed'), false)
        }
    }
})

// Client catalog - must be before /:id
router.get('/catalog', verifyToken, getAllProducts)

// Admin product routes
router.post('/import', verifyToken, requireAdmin, upload.single('file'), ImportProducts)
router.get('/', verifyToken, requireAdmin, getAllProducts)
router.get('/:id', verifyToken, requireAdmin, getProductById)
router.post('/', verifyToken, requireAdmin, addProduct)
router.put('/:id', verifyToken, requireAdmin, updateProduct)
router.delete('/:id', verifyToken, requireAdmin, deleteProduct)

module.exports = router;