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
        console.log(`Total rows read from excel:${data.length}`)

        if (data.length > 0) {
            console.log('First row keys:', Object.keys(data[0]))
            console.log('First row data:', data[0]);
        }
        if (!data || data.length === 0) {
            return res.status(400).json({
                error: 'Excel file is empty or has no readable rows'
            })
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
            const deleted = await ProductModel.deleteMany({});
            console.log(`Deleted ${deleted.deletedCount} existing products`)
        }
        const inserted = await ProductModel.insertMany(products)
        console.log(`Successfully inserted ${inserted.length} products`);

        return res.status(201).json({
            success: true,
            message: `Imported ${inserted.length} products successfully`,
            inserted: inserted.length
        });

    } catch (err) {
        console.log(`Import Failed`, err)
        return res.status(500).json({
            message: `Product import failed`,
            error: err.message
        })
    }
}

module.exports = {
    ImportProducts
}