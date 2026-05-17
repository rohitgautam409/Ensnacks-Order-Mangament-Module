const router = require('express').Router()
const {
  placeOrder, getMyOrders, getMyOrderById,
  getAllOrders, updateOrderStatus
} = require('../controllers/order.controller')
const { verifyToken, requireAdmin, requireClient } = require('../middleware/auth.middleware')

// Client routes
router.post('/', verifyToken, requireClient, placeOrder)
router.get('/my', verifyToken, requireClient, getMyOrders)
router.get('/my/:id', verifyToken, requireClient, getMyOrderById)

// Admin routes
router.get('/', verifyToken, requireAdmin, getAllOrders)
router.patch('/:id/status', verifyToken, requireAdmin, updateOrderStatus)

module.exports = router
