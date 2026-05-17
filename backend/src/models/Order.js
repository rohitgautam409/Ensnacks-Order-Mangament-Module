const mongoose = require('mongoose')

const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductsDetails', // Matches the name defined in ProductsDetail.js
        required: true
    },
    productName: { type: String, required: true },
    brand: { type: String, default: '' },
    category: { type: String, default: '' },
    weight: { type: String, default: '' },
    uom: { type: String, default: '' },
    mrp: { type: Number, required: true },
    gst: { type: Number, default: 0 },
    caseSize: { type: Number, default: 1 },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true },
    gstAmount: { type: Number, default: 0 },
    lineTotal: { type: Number, required: true }
}, { _id: false })

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientName: { type: String, required: true },
    companyName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    totalGst: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled'],
        default: 'pending'
    },
    notes: { type: String, default: '' },
    deliveryAddress: { type: String, default: '' }
}, {
    timestamps: true
})

// Pre-save hook to auto-generate orderNumber
OrderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose.model('Order').countDocuments()
        const year = new Date().getFullYear()
        const padded = String(count + 1).padStart(4, '0')
        this.orderNumber = `ENS-${year}-${padded}`
    }
    next()
})

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)
