'use client'

import React, { useState, useEffect } from 'react'
import api from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ClientOrdersPage() {
    const router = useRouter()
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/api/orders/my')
                setOrders(res.data.orders)
            } catch (err) {
                console.error('Failed to load orders')
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrders()
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'confirmed': return 'bg-blue-100 text-blue-800'
            case 'processing': return 'bg-purple-100 text-purple-800'
            case 'dispatched': return 'bg-indigo-100 text-indigo-800'
            case 'delivered': return 'bg-green-100 text-green-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        })
    }

    const loadOrderDetails = async (orderId) => {
        if (expandedId === orderId) {
            setExpandedId(null)
            return
        }
        
        try {
            // Find order in list
            const currentOrder = orders.find(o => o._id === orderId)
            
            // If we don't have items, fetch the full order
            if (!currentOrder.items) {
                const res = await api.get(`/api/orders/my/${orderId}`)
                setOrders(prev => prev.map(o => o._id === orderId ? res.data.order : o))
            }
            
            setExpandedId(orderId)
        } catch (error) {
            console.error('Failed to load order details')
        }
    }

    return (
        <div className="bg-[#F4F7F2] min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-[#1F2937] mb-6">My Orders</h1>
                
                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-xl shadow-sm p-5 h-24 animate-pulse flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-48 mt-4"></div>
                            </div>
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <span className="text-6xl mb-4 block">🛒</span>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-6">Your order history will appear here after you place your first order</p>
                        <button onClick={() => router.push('/products')} className="px-6 py-3 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1A3A25] transition-colors">
                            Browse Products →
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                                {/* TOP ROW */}
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">#{order.orderNumber}</h3>
                                        <p className="text-xs text-gray-400 mt-1">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <p className="font-bold text-[#2D6A4F] mt-2">₹{order.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* MIDDLE ROW */}
                                <div className="mt-3 text-sm text-gray-500 flex justify-between items-center">
                                    <p>Company: {order.companyName}</p>
                                    <button 
                                        onClick={() => loadOrderDetails(order._id)}
                                        className="text-[#2D6A4F] font-medium hover:underline flex items-center gap-1"
                                    >
                                        {expandedId === order._id ? 'Hide Details ▴' : 'View Details ▾'}
                                    </button>
                                </div>

                                {/* EXPANDED DETAIL */}
                                {expandedId === order._id && order.items && (
                                    <div className="mt-4 border-t border-gray-100 pt-4 animate-[fade-in-up_0.2s_ease-out]">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs mb-4">
                                                <thead className="text-gray-500 border-b border-gray-100">
                                                    <tr>
                                                        <th className="pb-2 font-medium">Product Name</th>
                                                        <th className="pb-2 font-medium text-center">Qty</th>
                                                        <th className="pb-2 font-medium text-right">MRP</th>
                                                        <th className="pb-2 font-medium text-right">GST%</th>
                                                        <th className="pb-2 font-medium text-right">Line Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50 text-gray-700">
                                                    {order.items.map((item, idx) => (
                                                        <tr key={idx}>
                                                            <td className="py-2 pr-2">{item.productName}</td>
                                                            <td className="py-2 text-center">{item.quantity}</td>
                                                            <td className="py-2 text-right">₹{item.mrp.toFixed(2)}</td>
                                                            <td className="py-2 text-right">{(item.gst * 100).toFixed(0)}%</td>
                                                            <td className="py-2 text-right font-medium">₹{item.lineTotal.toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        <div className="flex flex-col items-end text-sm space-y-1 mt-2 mb-4 pr-1">
                                            <div className="flex justify-between w-48 text-gray-600">
                                                <span>Subtotal:</span>
                                                <span>₹{order.subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between w-48 text-gray-600">
                                                <span>GST:</span>
                                                <span>₹{order.totalGst.toFixed(2)}</span>
                                            </div>
                                            <div className="border-t border-gray-200 w-48 my-1"></div>
                                            <div className="flex justify-between w-48 font-bold text-[#2D6A4F] text-base">
                                                <span>Total:</span>
                                                <span>₹{order.totalAmount.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100 space-y-2">
                                            <p className="flex items-start gap-2">
                                                <span className="text-gray-400">📍</span> 
                                                <span>{order.deliveryAddress}</span>
                                            </p>
                                            {order.notes && (
                                                <p className="flex items-start gap-2">
                                                    <span className="text-gray-400">📝</span> 
                                                    <span>{order.notes}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
