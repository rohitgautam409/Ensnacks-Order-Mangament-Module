import React, { useEffect } from 'react'

export default function Toast({ toast, setToast }) {
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000)
            return () => clearTimeout(timer)
        }
    }, [toast, setToast])

    if (!toast) return null

    const isSuccess = toast.type === 'success'

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white transition-all animate-[fade-in-up_0.3s_ease-out] ${isSuccess ? 'bg-[#2D6A4F]' : 'bg-red-600'}`}>
            <span>{isSuccess ? '✅' : '❌'}</span>
            <p className="text-sm font-medium">{toast.message}</p>
            <button onClick={() => setToast(null)} className="ml-2 text-white/80 hover:text-white font-bold">
                ✕
            </button>
        </div>
    )
}
