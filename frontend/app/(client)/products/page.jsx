'use client'

import React, { useState, useEffect } from 'react'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function ClientCatalogPage() {
    const router = useRouter()
    const [products, setProducts] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [limit] = useState(50)
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [cart, setCart] = useState({})
    const [cartProductCache, setCartProductCache] = useState({})
    const [notes, setNotes] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [isPlacing, setIsPlacing] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(null)
    const [toast, setToast] = useState(null)

    const showToast = (message, type = 'success') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput)
            setPage(1)
        }, 400)
        return () => clearTimeout(timer)
    }, [searchInput])

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            try {
                const params = new URLSearchParams()
                params.append('page', page)
                params.append('limit', limit)
                if (search) params.append('search', search)
                if (selectedCategory) params.append('category', selectedCategory)
                if (selectedBrand) params.append('brand', selectedBrand)

                const res = await api.get(`/api/products/catalog?${params.toString()}`)
                setProducts(res.data.products || [])
                setTotalCount(res.data.pagination?.total || 0)
                setTotalPages(res.data.pagination?.totalPages || 0)

                if (!selectedCategory && !selectedBrand && !search && page === 1) {
                    const allRes = await api.get('/api/products/catalog?limit=2000')
                    const allProducts = allRes.data.products || []
                    const cats = [...new Set(allProducts.map(p => p.category).filter(Boolean))]
                    const brnds = [...new Set(allProducts.map(p => p.brand).filter(Boolean))]
                    setCategories(cats.sort())
                    setBrands(brnds.sort())
                }
            } catch (err) {
                console.error('Failed to load products:', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [page, search, selectedCategory, selectedBrand])

    const handleQtyChange = (product, value) => {
        const qty = parseInt(value) || 0
        if (qty > 0) {
            setCart(prev => ({ ...prev, [product._id]: qty }))
            setCartProductCache(prev => ({ ...prev, [product._id]: product }))
        } else {
            setCart(prev => {
                const updated = { ...prev }
                delete updated[product._id]
                return updated
            })
        }
    }

    const cartItems = Object.entries(cart)
        .filter(([_, qty]) => qty > 0)
        .map(([productId, quantity]) => {
            const product = products.find(p => p._id === productId) || cartProductCache[productId]
            if (!product) return null
            const subtotal = product.mrp * quantity
            const gstRate = typeof product.gst === 'string' ? parseFloat(product.gst) || 0 : product.gst || 0
            const gstAmount = subtotal * gstRate
            const lineTotal = subtotal + gstAmount
            return { ...product, quantity, subtotal, gstAmount, lineTotal }
        })
        .filter(Boolean)

    const orderSubtotal = cartItems.reduce((s, i) => s + i.subtotal, 0)
    const orderGst = cartItems.reduce((s, i) => s + i.gstAmount, 0)
    const orderTotal = orderSubtotal + orderGst
    const cartCount = cartItems.length

    const handlePlaceOrder = async () => {
        if (!deliveryAddress.trim()) {
            showToast('Please enter your delivery address', 'error')
            return
        }
        if (cartCount === 0) {
            showToast('Your cart is empty', 'error')
            return
        }

        setIsPlacing(true)

        try {
            const items = Object.entries(cart).map(([productId, quantity]) => ({
                productId,
                quantity: Number(quantity),
            }))

            const response = await api.post('/api/orders', {
                items,
                notes,
                deliveryAddress: deliveryAddress.trim(),
            })

            setCart({})
            setCartProductCache({})
            setNotes('')
            setDeliveryAddress('')
            setOrderPlaced(response.data.order)

        } catch (err) {
            showToast(
                err.response?.data?.error || 'Order failed. Please try again.',
                'error'
            )
        } finally {
            setIsPlacing(false)
        }
    }

    return (
        <div className="bg-[#F4F7F2] min-h-screen pb-10">
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-white transition-all ${toast.type === 'success' ? 'bg-[#2D6A4F]' : 'bg-red-600'}`}>
                    <p className="text-sm font-medium">{toast.message}</p>
                </div>
            )}
            
            <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-20">
                <h1 className="font-bold text-lg text-gray-800">🥜 Ensnacks Catalog</h1>
                {cartCount > 0 && (
                    <div className="bg-[#2D6A4F] text-white rounded-lg px-4 py-2 text-sm font-medium">
                        🛒 {cartCount} items — ₹{orderTotal.toFixed(2)}
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-6">
                {/* LEFT COLUMN */}
                <div className="flex-1 overflow-hidden">
                    <div className="mt-4 mb-3 flex flex-wrap gap-3 items-center">
                        <div className="relative w-64">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search by product name or brand..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <select
                            value={selectedBrand}
                            onChange={(e) => { setSelectedBrand(e.target.value); setPage(1); }}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                        >
                            <option value="">All Brands</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>

                        <span className="text-sm text-gray-500">
                            Showing {products.length} of {totalCount} products
                        </span>

                        {(search || selectedCategory || selectedBrand) && (
                            <button
                                onClick={() => { setSearchInput(''); setSelectedBrand(''); setSelectedCategory(''); setPage(1) }}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Clear ✕
                            </button>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-100">
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
                                    <th className="text-xs uppercase text-gray-800 font-bold px-3 py-3 text-center bg-gray-100 border-l border-gray-200">QTY TO ORDER</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    Array.from({ length: 8 }).map((_, idx) => (
                                        <tr key={idx}>
                                            {Array.from({ length: 12 }).map((_, cIdx) => (
                                                <td key={cIdx} className="px-3 py-4">
                                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan="12" className="px-6 py-16 text-center">
                                            <p className="text-gray-500">{search ? `No products match '${search}'` : 'No products available'}</p>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => {
                                        const qty = cart[product._id] || 0;
                                        const hasQty = qty > 0;
                                        return (
                                            <tr key={product._id} className={`transition-colors border-b border-gray-100 hover:bg-gray-50 ${hasQty ? 'border-l-4 border-l-[#2D6A4F] bg-green-50/30' : ''}`}>
                                                <td className="px-3 py-3 text-gray-400 text-xs">{product.sNo}</td>
                                                <td className="px-3 py-3 font-medium text-gray-800 min-w-[180px]">{product.productName}</td>
                                                <td className="px-3 py-3 text-gray-600">{product.brand}</td>
                                                <td className="px-3 py-3 text-gray-600">{product.category}</td>
                                                <td className="px-3 py-3 text-gray-600">{product.product}</td>
                                                <td className="px-3 py-3 text-gray-600 text-xs">{product.weight}</td>
                                                <td className="px-3 py-3 text-gray-600 text-xs">{product.uom}</td>
                                                <td className="px-3 py-3 font-semibold text-gray-800">₹{(product.mrp || 0).toFixed(2)}</td>
                                                <td className="px-3 py-3 text-gray-500 text-xs">{((product.gst || 0) * 100).toFixed(0)}%</td>
                                                <td className="px-3 py-3 text-gray-600 text-center">{product.caseSize}</td>
                                                <td className="px-3 py-3 text-gray-500 text-xs">{product.shelfLife}</td>
                                                <td className="px-3 py-2 text-center bg-gray-50/50 border-l border-gray-100">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={cart[product._id] || ''}
                                                        placeholder="0"
                                                        onChange={(e) => handleQtyChange(product, e.target.value)}
                                                        className={`w-20 text-center border rounded-lg px-2 py-1.5 text-sm outline-none transition-colors ${hasQty ? 'border-[#2D6A4F] bg-green-50 text-[#2D6A4F] font-semibold' : 'border-gray-200 hover:border-gray-400'} focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]`}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                            <p>Showing {(page - 1) * limit + 1}–{Math.min(page * limit, totalCount)} of {totalCount} products</p>
                            <div className="flex gap-1">
                                <button disabled={page === 1} onClick={() => {setPage(p => p - 1); window.scrollTo(0,0);}} className="px-3 py-1 border rounded bg-white disabled:opacity-50">Prev</button>
                                <span className="px-3 py-1 bg-[#2D6A4F] text-white rounded">{page}</span>
                                <button disabled={page >= totalPages} onClick={() => {setPage(p => p + 1); window.scrollTo(0,0);}} className="px-3 py-1 border rounded bg-white disabled:opacity-50">Next</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                {(cartCount > 0 || orderPlaced) && (
                    <div className="w-full lg:w-80 flex-shrink-0 sticky top-20 self-start">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            {orderPlaced ? (
                                <div className="text-center p-6">
                                    <span className="text-6xl mb-4 block">✅</span>
                                    <h2 className="text-2xl font-bold text-[#2D6A4F] mb-2">Order Placed!</h2>
                                    <div className="text-lg font-mono bg-green-50 text-[#2D6A4F] px-4 py-2 rounded-lg my-4">
                                        #{orderPlaced.orderNumber}
                                    </div>
                                    <p className="text-gray-600 mt-2 font-semibold">Total: ₹{orderPlaced.totalAmount.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500 mt-2">Our team will review and confirm your order shortly.</p>
                                    <div className="mt-6 flex flex-col gap-3">
                                        <button onClick={() => router.push('/orders')} className="w-full py-2.5 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1a5c3a]">
                                            View My Orders
                                        </button>
                                        <button onClick={() => setOrderPlaced(null)} className="w-full py-2.5 rounded-xl border border-[#2D6A4F] text-[#2D6A4F] font-medium hover:bg-green-50">
                                            Order More Products
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h2 className="font-bold text-gray-800">Your Order</h2>
                                            <p className="text-sm text-gray-500">{cartCount} product{cartCount > 1 ? 's' : ''} selected</p>
                                        </div>
                                        <button onClick={() => { setCart({}); setCartProductCache({}); }} className="text-xs text-red-400 hover:text-red-600">
                                            Clear all
                                        </button>
                                    </div>

                                    <div className="max-h-60 overflow-y-auto pr-2 mb-4">
                                        {cartItems.map((item) => (
                                            <div key={item._id} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                                                <div className="flex-1 pr-2">
                                                    <p className="text-sm font-medium text-gray-800 truncate">{item.productName}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.mrp}</p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <p className="text-sm font-semibold text-gray-700">₹{item.lineTotal.toFixed(2)}</p>
                                                    <button onClick={() => handleQtyChange(item, 0)} className="text-xs text-gray-300 hover:text-red-400 mt-1">✕</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-3 border-t border-gray-200 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium text-gray-800">₹{orderSubtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>GST</span>
                                            <span>₹{orderGst.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-100 my-2"></div>
                                        <div className="flex justify-between font-bold text-[#2D6A4F] text-base">
                                            <span>Total</span>
                                            <span>₹{orderTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-xs font-medium text-gray-600">Delivery Address *</label>
                                        <textarea
                                            value={deliveryAddress}
                                            onChange={e => setDeliveryAddress(e.target.value)}
                                            placeholder="Enter full delivery address..."
                                            rows={2}
                                            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2D6A4F] outline-none resize-none"
                                        />
                                    </div>

                                    <div className="mt-3">
                                        <label className="text-xs font-medium text-gray-600">Special Instructions (optional)</label>
                                        <textarea
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            placeholder="e.g. Deliver before 5pm, fragile items..."
                                            rows={2}
                                            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2D6A4F] outline-none resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={cartCount === 0 || !deliveryAddress.trim() || isPlacing}
                                        className={`w-full mt-4 py-3 rounded-xl font-semibold text-white transition ${cartCount === 0 || !deliveryAddress.trim() || isPlacing ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#2D6A4F] hover:bg-[#1a5c3a]'}`}
                                    >
                                        {isPlacing ? 'Placing order...' : `Place Order — ₹${orderTotal.toFixed(2)}`}
                                    </button>
                                    <p className="text-[10px] text-gray-400 text-center mt-2">Our team will confirm your order shortly</p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
