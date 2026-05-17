const Order = require('../models/Order')
const Product = require('../models/ProductsDetail') // Note: Using the actual filename

const placeOrder = async (req, res) => {
    try {
        const { items, notes, deliveryAddress } = req.body

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order must have at least one item' })
        }
        if (!deliveryAddress || !deliveryAddress.trim()) {
            return res.status(400).json({ error: 'Delivery address is required' })
        }

        for (const item of items) {
            if (!item.productId) return res.status(400).json({ error: 'Each item must have a productId' })
            if (!item.quantity || item.quantity < 1) return res.status(400).json({ error: 'Quantity must be at least 1' })
        }

        const productIds = items.map(i => i.productId)
        const products = await Product.find({
            _id: { $in: productIds },
            active: true
        })

        if (products.length !== items.length) {
            const foundIds = products.map(p => p._id.toString())
            const missing = productIds.filter(id => !foundIds.includes(id))
            return res.status(400).json({ error: `Products not found or inactive: ${missing}` })
        }

        const orderItems = items.map(item => {
            const product = products.find(p => p._id.toString() === item.productId.toString())
            const qty = Number(item.quantity)
            const subtotal = product.mrp * qty
            // Need to parse gst carefully since schema defines it as String but the new implementation expects Number, handling both
            const gstRate = typeof product.gst === 'string' ? parseFloat(product.gst) || 0 : product.gst || 0
            const gstAmt = subtotal * gstRate
            const lineTotal = subtotal + gstAmt

            return {
                productId: product._id,
                productName: product.productName,
                brand: product.brand || '',
                category: product.category || '',
                weight: product.weight || '',
                uom: product.uom || '',
                mrp: product.mrp,
                gst: gstRate,
                caseSize: typeof product.caseSize === 'string' ? parseInt(product.caseSize) || 1 : product.caseSize || 1,
                quantity: qty,
                subtotal: parseFloat(subtotal.toFixed(2)),
                gstAmount: parseFloat(gstAmt.toFixed(2)),
                lineTotal: parseFloat(lineTotal.toFixed(2)),
            }
        })

        const subtotal = orderItems.reduce((s, i) => s + i.subtotal, 0)
        const totalGst = orderItems.reduce((s, i) => s + i.gstAmount, 0)
        const totalAmount = parseFloat((subtotal + totalGst).toFixed(2))

        const order = new Order({
            clientId: req.user.id,
            clientName: req.user.name,
            companyName: req.user.companyName,
            clientEmail: req.user.email,
            items: orderItems,
            subtotal: parseFloat(subtotal.toFixed(2)),
            totalGst: parseFloat(totalGst.toFixed(2)),
            totalAmount,
            notes: notes || '',
            deliveryAddress: deliveryAddress,
        })

        await order.save()

        return res.status(201).json({ order, message: 'Order placed successfully' })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to place order: ' + error.message })
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ clientId: req.user.id })
            .sort({ createdAt: -1 })
            .select('-items') // exclude items for list view to be faster
        return res.status(200).json({ orders })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch orders' })
    }
}

const getMyOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, clientId: req.user.id })
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        return res.status(200).json({ order })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch order details' })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 50
        const search = req.query.search || ''
        const status = req.query.status || ''

        const query = {}
        if (status) query.status = status
        if (search) {
            query.$or = [
                { clientName: { $regex: search, $options: 'i' } },
                { orderNumber: { $regex: search, $options: 'i' } },
            ]
        }

        const total = await Order.countDocuments(query)
        const orders = await Order.find(query)
            .populate('clientId', 'name email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)

        return res.status(200).json({
            orders,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch orders' })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body
        const validStatuses = ['pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled']
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' })
        }

        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }

        order.status = status
        await order.save()

        return res.status(200).json({ order, message: 'Status updated' })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update order status' })
    }
}

module.exports = {
    placeOrder, getMyOrders, getMyOrderById,
    getAllOrders, updateOrderStatus
}
