'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import api from '@/lib/api'
import Link from 'next/link'

export default function ImportProductsPage() {
    const [file, setFile] = useState(null)
    const [replaceAll, setReplaceAll] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0])
            setError('')
            setResult(null)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv']
        },
        maxFiles: 1
    })

    const handleImport = async () => {
        if (!file) {
            setError('Please select an Excel file first')
            return
        }

        setIsLoading(true)
        setError('')
        setResult(null)
        setUploadProgress(0)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('replaceAll', String(replaceAll))

            const response = await api.post('/api/products/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        setUploadProgress(percent)
                    }
                },
            })

            setResult({
                count: response.data.count,
                message: response.data.message,
                sample: response.data.sample || [],
            })
            setFile(null)
            setUploadProgress(0)

        } catch (err) {
            setError(err.response?.data?.error || 'Import failed. Please try again.')
            setUploadProgress(0)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 m-6'>
            <div className='border-b border-gray-200 px-8 py-5'>
                <h2 className='text-2xl font-bold text-[#1F2937]'>Upload Product Portfolio</h2>
                <p className='text-sm text-gray-500 mt-1'>Upload Excel Sheet Containing all products details</p>
            </div>
            <div className='p-8'>
                {!result ? (
                    <>
                        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center py-16 p-8 ${isDragActive ? 'border-[#2D6A4F] bg-[#EEF7F0]' : 'border-[#2D6A4F]/40 bg-[#F6F8F6] hover:border-[#2D6A4F] hover:bg-[#EEF7F0]'}`}>
                            <input {...getInputProps()} />
                            <div className='w-20 h-20 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center m-6'>
                                <span className="text-4xl">📊</span>
                            </div>
                            <h3 className='text-xl font-semibold text-[#1F2937]'>Drag & Drop Excel File</h3>
                            <p className='text-sm text-gray-500 mt-2 text-center'>Upload .xlsx or .csv portfolio sheets</p>
                            
                            {file && (
                                <div className="mt-4 px-4 py-2 bg-[#2D6A4F]/10 rounded-lg text-[#2D6A4F] font-medium border border-[#2D6A4F]/20">
                                    Selected file: {file.name}
                                </div>
                            )}

                            <div className='flex items-center gap-4 my-6 w-full max-w-xs'>
                                <div className='h-px bg-gray-300 flex-1'></div>
                                <span className='text-gray-400 text-sm'>OR</span>
                                <div className="h-px bg-gray-300 flex-1"></div>
                            </div>

                            <button className='px-6 py-3 rounded-xl bg-gradient-to-b from-[#1A3A25] to-[#102819] text-white font-medium text-sm shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 pointer-events-none'>
                                Choose Excel File
                            </button>

                            <p className='text-xs text-gray-400 mt-5'>Supported formats: XLSX, XLS, CSV</p>
                        </div>
                        
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        
                        {isLoading && uploadProgress > 0 && (
                            <div className="w-full mt-6">
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                    <div
                                    className="bg-[#2D6A4F] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1 text-center">
                                    Uploading... {uploadProgress}%
                                </p>
                            </div>
                        )}

                        <div className='flex justify-end mt-8'>
                            <button 
                                onClick={handleImport}
                                disabled={isLoading}
                                className={`px-8 py-3 rounded-xl font-semibold text-sm shadow-md transition-all duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B4513] text-white hover:bg-[#A0522D] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'}`}
                            >
                                {isLoading ? 'Importing...' : 'Upload Portfolio'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 flex flex-col items-center">
                        <span className="text-5xl mb-4">✅</span>
                        <h3 className="text-2xl font-bold text-[#2D6A4F] mb-2">{result.count} products imported successfully!</h3>
                        <p className="text-gray-600 mb-8">{result.message}</p>
                        
                        {result.sample && result.sample.length > 0 && (
                            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                                    <h4 className="text-sm font-semibold text-gray-700">First 3 imported rows — verify columns mapped correctly:</h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-medium">
                                            <tr>
                                                <th className="px-4 py-3">S.No</th>
                                                <th className="px-4 py-3">Product Name</th>
                                                <th className="px-4 py-3">Brand</th>
                                                <th className="px-4 py-3">Category</th>
                                                <th className="px-4 py-3">MRP</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                            {result.sample.map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3">{row.sNo}</td>
                                                    <td className="px-4 py-3 font-medium">{row.productName}</td>
                                                    <td className="px-4 py-3">{row.brand}</td>
                                                    <td className="px-4 py-3">{row.category}</td>
                                                    <td className="px-4 py-3">₹{row.mrp?.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        
                        <Link href="/admin/Products/view-all-products" className="px-6 py-3 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1A3A25] transition-colors">
                            View All Products →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}