const xlsx = require('xlsx')
const ProductModel = require('../models/ProductsDetail');

const ImportProducts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }
        const workbook = xlsx.read(req.file.buffer, {
            type: "buffer",
        })
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(workSheet);

        if (!data || data.length === 0) {
            return res.status(400).json({ error: 'Excel file is empty or has no readable rows' })
        }

        const products = data.map((row, index) => ({
            sNo: row['S.NO'] ?? row['s.no'] ?? row['S NO'] ?? row['S.No.'] ?? row['s.no.'] ?? index + 1,
            category: row['Category'] ? String(row['Category']).trim() : ' ',
            product: row['Product'] ? String(row['Product']).trim() : ' ',
            brand: row['Brand'] ? String(row['Brand']).trim() : ' ',
            productName: row['Product Name'] ? String(row['Product Name']).trim() : ' ',
            uom: row['UOM'] ? String(row['UOM']).trim() : '',
            mrp: parseFloat(row['MRP']) || 0,
            shelfLife: row['Shelf Life'] ? String(row['Shelf Life']).trim() : '',
            weight: row['Weight'] ? String(row['Weight']).trim() : '',
            hsnCode: row['HSN Code '] ? String(row['HSN Code']).trim() : '',
            gst: parseFloat(row['GST']) || 0,
            caseSize: parseInt(row['Case size']) || 1,
            active: true,
        })).filter((item) => item.productName && item.productName.trim() !== '')

        const replaceAll = req.body.replaceAll === 'true'

        if (replaceAll) {
            await ProductModel.deleteMany({});
        }
        const inserted = await ProductModel.insertMany(products)

        return res.status(201).json({
            success: true,
            message: `Imported ${inserted.length} products successfully`,
            count: inserted.length,
            sample: inserted.slice(0, 3)
        });

    } catch (err) {
        return res.status(500).json({
            message: `Product import failed`,
            error: err.message
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 50
        const search = req.query.search || ''
        const brand = req.query.brand || ''
        const category = req.query.category || ''

        const query = { active: true }

        if (search) {
            query.$or = [
                { productName: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ]
        }
        if (brand) query.brand = { $regex: brand, $options: 'i' }
        if (category) query.category = { $regex: category, $options: 'i' }

        const total = await ProductModel.countDocuments(query)
        const products = await ProductModel.find(query)
            .sort({ sNo: 1, productName: 1 })
            .skip((page - 1) * limit)
            .limit(limit)

        return res.status(200).json({
            products,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch products' })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product) return res.status(404).json({ error: 'Product not found' })
        return res.status(200).json({ product })
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch product' })
    }
}

const addProduct = async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body)
        await newProduct.save()
        return res.status(201).json({ product: newProduct, message: 'Product added successfully' })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!product) return res.status(404).json({ error: 'Product not found' })
        return res.status(200).json({ product, message: 'Product updated successfully' })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, { active: false }, { new: true })
        if (!product) return res.status(404).json({ error: 'Product not found' })
        return res.status(200).json({ message: 'Product deleted successfully' })
    } catch (err) {
        return res.status(500).json({ error: 'Failed to delete product' })
    }
}

module.exports = {
    ImportProducts,
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}