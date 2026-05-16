const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    sNo: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        trim: true,
        default: '',

    },
    product: {
        type: String,
        trim: true,
        default: '',
    },
    brand: {
        type: String,
        trim: true,
        default: '',
    },
    productName: {
        type: String,
        trim: true,
        required: true,

    },
    uom: {
        type: String,
        trim: true,
        default: '',
    },
    mrp: {
        type: Number,
        required: true,
        default: 0,
    },
    shelfLife: {
        type: String,
        trim: true,
        default: '',
    },
    weight: {
        type: String,
        trim: true,
        default: '',
    },
    hsnCode: {
        type: String,
        trim: true,
        default: '',
    },
    gst: {
        type: String,
        trim: true,
        default: '',
    },
    caseSize: {
        type: String,
        trim: true,
        default: '',
    },
    active: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true,
});

//Indexes for faster search and filtering
ProductSchema.index({ productName: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ active: 1 });
ProductSchema.index({ sNo: 1 });

module.exports = ProductModel = mongoose.model('ProductsDetails', ProductSchema)
