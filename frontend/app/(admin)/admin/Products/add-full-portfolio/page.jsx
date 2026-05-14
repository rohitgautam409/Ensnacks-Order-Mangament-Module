import React from 'react'

const page = () => {
    return (
        <div className='bg-white rounded-2xl shadow-sm border-grey-200 m-6'>
            <div className='border-b border-gray-200 px-8 py-5'>
                <h2 className='text-2xl font-bold text-[#1F29237]'>Upload Product Portfolio</h2>
                <p className='text-sm text-gray-500 mt-1'>Upload Excel Sheet Containing all products details</p>
            </div>
            <div className='p-8'>
                <div className='border-2 border-dashed border-[#2D6A4F]/40 rounded-2xl bg-[#F6F8F6] hover:border-[#2D6A4F] hover:bg-[#EEF7F0] transition-all duration-300 cusor-pointer flex flex-col items-center jsutify-center py-16 p-8'>
                    <div className='w-20 h-20 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center m-6'>
                        <span className="text-4xl">
                            📊
                        </span>
                    </div>
                    <h3 className='text-xl font-semifold text-[#1F2937]'>Drag & Drop Excel File</h3>
                    <p className='text-sm text-gray-500 mt-2 text-center'>Upload .xlsx or .csv portfolio sheets</p>
                    <div className='flex items-center gap-4 my-6 w-full max-w-xs'>
                        <div className='h-px bg-gray-300 flex-1'></div>
                        <span className='text-gray-400 text-sm'>
                            OR
                        </span>
                        <div className="h-px bg-gray-300 flex-1"></div>
                    </div>

                    <label className='px-6 py-3 rounded-xl bg-gradient-to-b from-[#1A3A25] to-[#102819] text-white font-medium text-sm shadow-md hover:shadow-xl hover:scale-[1.02] transition-all dusration-300 cursor-pointer'>Choose Excel File
                        <input type='file' accept='.xlsx,.xls.,.csv' className='hidden' />
                    </label>

                    <p className='text-xs text-gray-400 mt-5'>Supported formats: XLSX, XLS, CSV</p>
                </div>
                <div className='flex justify-end mt-8'>
                    <button type='submit' className='px-8 py-3 rounded-xl bg-[#8B4513] text-white font-semibold text-sm shadow-md hover:bg-[#A0522D] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer'>Upload Portfolio</button>
                </div>

            </div>
        </div>
    )
}

export default page