'use client'

import React, { useState, useEffect } from 'react'
import {
    FiSearch,
    FiFilter,
    FiEdit2,
    FiTrash2,
    FiPlus,
    FiUpload
} from 'react-icons/fi'
import api from '@/lib/api'
import Link from 'next/link'
import Toast from '@/components/admin/Toast'

export default function ProductCatalogPage() {
    const [products, setProducts] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [limit] = useState(50)
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editData, setEditData] = useState({})
    const [deletingId, setDeletingId] = useState(null)
    const [toast, setToast] = useState(null)
    
    // For dropdowns
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    const showToast = (message, type = 'success') => {
        setToast({ message, type })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput)
            setPage(1)
        }, 400)
        return () => clearTimeout(timer)
    }, [searchInput])

    useEffect(() => {
        fetchProducts()
    }, [page, search, selectedCategory, selectedBrand])

    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams()
            params.append('page', page)
            params.append('limit', limit)
            if (search) params.append('search', search)
            if (selectedCategory) params.append('category', selectedCategory)
            if (selectedBrand) params.append('brand', selectedBrand)

            const res = await api.get(`/api/products?${params.toString()}`)
            setProducts(res.data.products || [])
            setTotalCount(res.data.pagination?.total || 0)
            setTotalPages(res.data.pagination?.totalPages || 0)

            if (!selectedCategory && !selectedBrand && !search && page === 1) {
                const allRes = await api.get('/api/products?limit=2000')
                const allProducts = allRes.data.products || []
                const cats = [...new Set(allProducts.map(p => p.category).filter(Boolean))]
                const brnds = [...new Set(allProducts.map(p => p.brand).filter(Boolean))]
                setCategories(cats.sort())
                setBrands(brnds.sort())
            }

        } catch (err) {
            showToast('Failed to load products', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const startEdit = (product) => {
        setEditingId(product._id)
        setEditData({ ...product })
        setDeletingId(null)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditData({})
    }

    const handleSave = async (productId) => {
        try {
            await api.put(`/api/products/${productId}`, {
                ...editData,
                mrp: parseFloat(editData.mrp),
                gst: parseFloat(editData.gst),
                caseSize: parseInt(editData.caseSize),
                sNo: parseInt(editData.sNo),
            })
            setProducts(prev =>
                prev.map(p => p._id === productId ? { ...p, ...editData } : p)
            )
            setEditingId(null)
            setEditData({})
            showToast('Product updated successfully', 'success')
        } catch (err) {
            showToast(
                'Update failed: ' + (err.response?.data?.error || err.message),
                'error'
            )
        }
    }

    const handleDelete = async (productId) => {
        try {
            await api.delete(`/api/products/${productId}`)
            setProducts(prev => prev.filter(p => p._id !== productId))
            setTotalCount(prev => prev - 1)
            setDeletingId(null)
            showToast('Product removed from catalog', 'success')
        } catch (err) {
            showToast('Delete failed', 'error')
            setDeletingId(null)
        }
    }

    return (
        <div className="bg-[#F4F7F2] min-h-screen p-4">
            <Toast toast={toast} setToast={setToast} />
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1F2937]">Product Catalog</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all products across Ensnacks inventory</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/Products/add-full-portfolio" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-[#1F2937] shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300">
                        <FiUpload size={16} /> Upload Portfolio
                    </Link>
                    <Link href="/admin/Products/add-products" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1A3A25] to-[#2D6A4F] text-white text-sm font-medium shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
                        <FiPlus size={16} /> Add Product
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 mb-4 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div className="relative w-64">
                        <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search product name or brand..."
                            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#2D6A4F] outline-none"
                        />
                    </div>
                    <select 
                        value={selectedCategory} 
                        onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                        className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select 
                        value={selectedBrand} 
                        onChange={(e) => { setSelectedBrand(e.target.value); setPage(1); }}
                        className="border rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    >
                        <option value="">All Brands</option>
                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{totalCount} products total</span>
                    <button onClick={fetchProducts} className="text-sm text-[#2D6A4F] hover:underline font-medium">Refresh</button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-200">
                        <tr>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">S.No</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">Product Name</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">Brand</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">Category</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">Product</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">Weight</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">UOM</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">MRP</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">GST</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">Case Size</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">Shelf Life</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3">HSN Code</th>
                            <th className="text-xs uppercase text-gray-500 font-medium px-3 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, idx) => (
                                <tr key={idx}>
                                    {Array.from({ length: 13 }).map((_, cIdx) => (
                                        <td key={cIdx} className="px-3 py-4">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="13" className="px-6 py-16 text-center">
                                    <div className="text-4xl mb-4">📦</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                                    {totalCount === 0 && !search ? (
                                        <>
                                            <p className="text-sm text-gray-500 mb-4">Import your Excel portfolio to get started</p>
                                            <Link href="/admin/Products/add-full-portfolio" className="text-[#2D6A4F] font-medium hover:underline">Import Excel →</Link>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-500 mb-4">No products match your search</p>
                                            <button onClick={() => { setSearchInput(''); setSelectedBrand(''); setSelectedCategory('') }} className="text-[#2D6A4F] font-medium hover:underline">Clear search</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => {
                                const isEditing = editingId === product._id;
                                const isDeleting = deletingId === product._id;
                                
                                return (
                                    <tr key={product._id} className={`text-sm text-gray-700 transition-colors ${isEditing ? 'bg-blue-50 border-l-4 border-l-blue-400' : isDeleting ? 'bg-red-50 border-l-4 border-l-red-400' : 'hover:bg-gray-50'}`}>
                                        {isEditing ? (
                                            <>
                                                <td className="px-3 py-2"><input type="number" value={editData.sNo || ''} onChange={e => setEditData({...editData, sNo: e.target.value})} className="border rounded px-2 py-1 text-sm w-16" /></td>
                                                <td className="px-3 py-2"><input type="text" value={editData.productName || ''} onChange={e => setEditData({...editData, productName: e.target.value})} className="border rounded px-2 py-1 text-sm w-full min-w-[160px]" /></td>
                                                <td className="px-3 py-2"><input type="text" value={editData.brand || ''} onChange={e => setEditData({...editData, brand: e.target.value})} className="border rounded px-2 py-1 text-sm w-24" /></td>
                                                <td className="px-3 py-2"><input type="text" value={editData.category || ''} onChange={e => setEditData({...editData, category: e.target.value})} className="border rounded px-2 py-1 text-sm w-28" /></td>
                                                <td className="px-3 py-2"><input type="text" value={editData.product || ''} onChange={e => setEditData({...editData, product: e.target.value})} className="border rounded px-2 py-1 text-sm w-24" /></td>
                                                <td className="px-3 py-2"><input type="text" value={editData.weight || ''} onChange={e => setEditData({...editData, weight: e.target.value})} className="border rounded px-2 py-1 text-sm w-20" /></td>
                                                <td className="px-3 py-2"><input type="text" value={editData.uom || ''} onChange={e => setEditData({...editData, uom: e.target.value})} className="border rounded px-2 py-1 text-sm w-16" /></td>
                                                <td className="px-3 py-2"><input type="number" step="0.01" value={editData.mrp || ''} onChange={e => setEditData({...editData, mrp: e.target.value})} className="border rounded px-2 py-1 text-sm w-20" /></td>
                                                <td className="px-3 py-2"><input type="number" step="0.01" value={editData.gst || ''} onChange={e => setEditData({...editData, gst: e.target.value})} className="border rounded px-2 py-1 text-sm w-16" /></td>
                                                <td className="px-3 py-2"><input type="number" value={editData.caseSize || ''} onChange={e => setEditData({...editData, caseSize: e.target.value})} className="border rounded px-2 py-1 text-sm w-16" /></td>
                                                <td className="px-3 py-2"><input type="text" value={editData.shelfLife || ''} onChange={e => setEditData({...editData, shelfLife: e.target.value})} className="border rounded px-2 py-1 text-sm w-20" /></td>
                                                <td className="px-3 py-2"><input type="text" value={editData.hsnCode || ''} onChange={e => setEditData({...editData, hsnCode: e.target.value})} className="border rounded px-2 py-1 text-sm w-24" /></td>
                                                <td className="px-3 py-2 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => handleSave(product._id)} className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700">Save</button>
                                                        <button onClick={cancelEdit} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-300">Cancel</button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-3 py-3 text-gray-500">{product.sNo}</td>
                                                <td className="px-3 py-3 font-medium text-gray-900">{product.productName}</td>
                                                <td className="px-3 py-3">{product.brand}</td>
                                                <td className="px-3 py-3"><span className="px-2 py-1 bg-gray-100 rounded text-xs">{product.category}</span></td>
                                                <td className="px-3 py-3">{product.product}</td>
                                                <td className="px-3 py-3">{product.weight}</td>
                                                <td className="px-3 py-3">{product.uom}</td>
                                                <td className="px-3 py-3 font-semibold text-gray-900">₹{(product.mrp || 0).toFixed(2)}</td>
                                                <td className="px-3 py-3 text-gray-500">{((product.gst || 0) * 100).toFixed(0)}%</td>
                                                <td className="px-3 py-3">{product.caseSize}</td>
                                                <td className="px-3 py-3 text-gray-500">{product.shelfLife}</td>
                                                <td className="px-3 py-3 text-gray-500">{product.hsnCode}</td>
                                                <td className="px-3 py-3 text-right">
                                                    {isDeleting ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <span className="text-xs text-red-600 font-medium mr-1">Delete?</span>
                                                            <button onClick={() => handleDelete(product._id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-red-700">Yes</button>
                                                            <button onClick={() => setDeletingId(null)} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-300">No</button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button onClick={() => startEdit(product)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"><FiEdit2 size={15} /></button>
                                                            <button onClick={() => setDeletingId(product._id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"><FiTrash2 size={15} /></button>
                                                        </div>
                                                    )}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, totalCount)} of {totalCount} products
                    </p>
                    <div className="flex gap-1">
                        <button 
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-3 py-1 border rounded bg-white disabled:opacity-50 text-sm"
                        >Prev</button>
                        <span className="px-3 py-1 bg-[#2D6A4F] text-white rounded text-sm">{page}</span>
                        <button 
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-3 py-1 border rounded bg-white disabled:opacity-50 text-sm"
                        >Next</button>
                    </div>
                </div>
            )}
        </div>
    )
}