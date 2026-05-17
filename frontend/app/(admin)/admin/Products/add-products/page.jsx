'use client'

import React, { useState } from 'react'
import api from '@/lib/api'
import Link from 'next/link'
import Toast from '@/components/admin/Toast'

export default function AddProductPage() {
    const initialFormState = {
        productName: '', brand: '', category: '', product: '', uom: '', 
        mrp: '', caseSize: '', gst: '', weight: '', shelfLife: '', hsnCode: '', sNo: ''
    }

    const [formData, setFormData] = useState(initialFormState)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [toast, setToast] = useState(null)

    const handleAddProduct = async (e) => {
        e.preventDefault()
        
        // Validate required fields
        const newErrors = {}
        if (!formData.productName?.trim()) newErrors.productName = 'Product name is required'
        if (!formData.mrp || isNaN(formData.mrp)) newErrors.mrp = 'Valid MRP is required'
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)
        setErrors({})

        try {
            const res = await api.post('/api/products', {
                ...formData,
                mrp: parseFloat(formData.mrp),
                gst: parseFloat(formData.gst) || 0,
                caseSize: parseInt(formData.caseSize) || 1,
                sNo: formData.sNo ? parseInt(formData.sNo) : undefined,
            })

            setSuccess(res.data.product.productName)
            setFormData(initialFormState)
            setToast({ message: 'Product added successfully', type: 'success' })

        } catch (err) {
            setErrors({
                general: err.response?.data?.error || 'Failed to add product'
            })
            setToast({ message: 'Failed to add product', type: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="p-6">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 flex flex-col items-center">
                    <span className="text-5xl mb-4">✅</span>
                    <h3 className="text-2xl font-bold text-[#2D6A4F] mb-6">'{success}' added successfully!</h3>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setSuccess(null)} 
                            className="px-6 py-3 rounded-xl border border-[#2D6A4F] text-[#2D6A4F] font-medium hover:bg-green-100 transition-colors"
                        >
                            Add Another Product
                        </button>
                        <Link href="/admin/Products/view-all-products" className="px-6 py-3 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1A3A25] transition-colors">
                            View All Products →
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 m-6">
            <Toast toast={toast} setToast={setToast} />
            <div className="border-b border-gray-200 px-8 py-5">
                <h2 className="text-2xl font-bold text-[#1F2937]">Add New Product</h2>
                <p className="text-sm text-gray-500 mt-1">Enter details to add a single product to catalog</p>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                {errors.general && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium">
                        {errors.general}
                    </div>
                )}
                
                {/* Row 1 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        value={formData.productName}
                        onChange={e => setFormData({...formData, productName: e.target.value})}
                        className={`w-full border ${errors.productName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none transition-colors`}
                    />
                    {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName}</p>}
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                        <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                        <input type="text" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">UOM</label>
                        <input type="text" value={formData.uom} onChange={e => setFormData({...formData, uom: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹) <span className="text-red-500">*</span></label>
                        <input type="number" step="0.01" value={formData.mrp} onChange={e => setFormData({...formData, mrp: e.target.value})} className={`w-full border ${errors.mrp ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none`} />
                        {errors.mrp && <p className="text-red-500 text-xs mt-1">{errors.mrp}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Case Size</label>
                        <input type="number" value={formData.caseSize} onChange={e => setFormData({...formData, caseSize: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST (decimal e.g. 0.05)</label>
                        <input type="number" step="0.01" value={formData.gst} onChange={e => setFormData({...formData, gst: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                        <input type="text" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Life</label>
                        <input type="text" value={formData.shelfLife} onChange={e => setFormData({...formData, shelfLife: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">HSN Code</label>
                        <input type="text" value={formData.hsnCode} onChange={e => setFormData({...formData, hsnCode: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                </div>

                {/* Row 7 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">S.No (Optional)</label>
                        <input type="number" value={formData.sNo} onChange={e => setFormData({...formData, sNo: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#2D6A4F] outline-none" />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2D6A4F] hover:bg-[#1A3A25] hover:shadow-lg'}`}
                    >
                        {isLoading ? 'Saving...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    )
}