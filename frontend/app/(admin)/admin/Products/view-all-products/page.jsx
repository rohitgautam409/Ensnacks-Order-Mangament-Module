'use client'

import {
    FiSearch,
    FiFilter,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiPlus,
    FiUpload
} from 'react-icons/fi'

export default function ProductCatalogPage() {

    const products = [
        {
            id: 1,
            product: 'Protein Bar',
            brand: 'RiteBite',
            category: 'Healthy Snacks',
            weight: '50g',
            mrp: '₹120',
            gst: '5%',
            stock: 'In Stock'
        },
        {
            id: 2,
            product: 'Kombucha',
            brand: 'Kultur’d',
            category: 'Beverages',
            weight: '330ml',
            mrp: '₹180',
            gst: '12%',
            stock: 'Low Stock'
        },
        {
            id: 3,
            product: 'Fox Nuts',
            brand: 'Mr Makhana',
            category: 'Snacks',
            weight: '80g',
            mrp: '₹99',
            gst: '5%',
            stock: 'Out of Stock'
        }
    ]

    return (

        <div className="bg-[#F4F7F2] min-h-screen p-4">

            {/* ================================================= */}
            {/* TOP HEADER */}
            {/* ================================================= */}

            <div className="flex items-start justify-between mb-4">

                {/* LEFT */}
                <div>

                    <h1 className="text-3xl font-bold text-[#1F2937]">
                        Product Catalog
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage all products across Ensnacks inventory
                    </p>

                </div>

                {/* RIGHT BUTTONS */}
                <div className="flex items-center gap-3">

                    {/* Upload */}
                    <button
                        className="
              flex
              items-center
              gap-2

              px-4
              py-2.5

              rounded-xl

              bg-white
              border
              border-gray-200

              text-sm
              font-medium
              text-[#1F2937]

              shadow-sm

              hover:shadow-md
              hover:bg-gray-50

              transition-all
              duration-300
            "
                    >

                        <FiUpload size={16} />

                        Upload Portfolio

                    </button>

                    {/* Add Product */}
                    <button
                        className="
              flex
              items-center
              gap-2

              px-4
              py-2.5

              rounded-xl

              bg-gradient-to-r
              from-[#1A3A25]
              to-[#2D6A4F]

              text-white
              text-sm
              font-medium

              shadow-sm

              hover:shadow-lg
              hover:scale-[1.01]

              transition-all
              duration-300
            "
                    >

                        <FiPlus size={16} />

                        Add Product

                    </button>

                </div>

            </div>

            {/* ================================================= */}
            {/* COMPACT STATS */}
            {/* ================================================= */}

            <div className="flex items-center gap-3 mb-4 flex-wrap">

                <div
                    className="
            bg-white
            border
            border-gray-200

            rounded-xl

            px-4
            py-3

            shadow-sm
          "
                >

                    <p className="text-xs text-gray-500">
                        Total Products
                    </p>

                    <h2 className="text-xl font-bold text-[#1F2937] mt-1">
                        1,284
                    </h2>

                </div>

                <div
                    className="
            bg-white
            border
            border-gray-200

            rounded-xl

            px-4
            py-3

            shadow-sm
          "
                >

                    <p className="text-xs text-gray-500">
                        Brands
                    </p>

                    <h2 className="text-xl font-bold text-[#1F2937] mt-1">
                        84
                    </h2>

                </div>

                <div
                    className="
            bg-white
            border
            border-gray-200

            rounded-xl

            px-4
            py-3

            shadow-sm
          "
                >

                    <p className="text-xs text-gray-500">
                        Categories
                    </p>

                    <h2 className="text-xl font-bold text-[#1F2937] mt-1">
                        12
                    </h2>

                </div>

                <div
                    className="
            bg-white
            border
            border-gray-200

            rounded-xl

            px-4
            py-3

            shadow-sm
          "
                >

                    <p className="text-xs text-gray-500">
                        Out Of Stock
                    </p>

                    <h2 className="text-xl font-bold text-red-500 mt-1">
                        28
                    </h2>

                </div>

            </div>

            {/* ================================================= */}
            {/* SEARCH + FILTER TOOLBAR */}
            {/* ================================================= */}

            <div
                className="
          bg-white

          rounded-2xl

          border
          border-gray-200

          shadow-sm

          p-3

          mb-4
        "
            >

                <div className="flex items-center justify-between gap-4">

                    {/* SEARCH */}
                    <div className="relative w-full max-w-md">

                        <FiSearch
                            size={16}
                            className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
                        />

                        <input
                            type="text"
                            placeholder="Search products, brands, categories..."

                            className="
                w-full

                pl-11
                pr-4
                py-2.5

                rounded-xl

                border
                border-gray-200

                bg-[#F8FAF8]

                text-sm

                outline-none

                focus:ring-2
                focus:ring-[#2D6A4F]/20
                focus:border-[#2D6A4F]

                transition-all
                duration-200
              "
                        />

                    </div>

                    {/* FILTER */}
                    <button
                        className="
              flex
              items-center
              gap-2

              px-4
              py-2.5

              rounded-xl

              border
              border-gray-200

              bg-white

              text-[#1F2937]
              text-sm
              font-medium

              hover:bg-gray-50
              hover:shadow-sm

              transition-all
              duration-300
            "
                    >

                        <FiFilter size={16} />

                        Filter

                    </button>

                </div>

            </div>

            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            <div
                className="
          bg-white

          rounded-2xl

          border
          border-gray-200

          shadow-sm

          overflow-hidden
        "
            >

                {/* SCROLLABLE TABLE */}
                <div className="overflow-auto max-h-[70vh]">

                    <table className="w-full">

                        {/* TABLE HEADER */}
                        <thead
                            className="
                sticky
                top-0
                z-10

                bg-[#F8FAF8]

                border-b
                border-gray-200
              "
                        >

                            <tr>

                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Product
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Brand
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Category
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Weight
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    MRP
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    GST
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Stock
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        {/* BODY */}
                        <tbody>

                            {products.map((product) => (

                                <tr
                                    key={product.id}

                                    className="
                    border-b
                    border-gray-100

                    hover:bg-[#F6FBF4]

                    transition-colors
                    duration-200
                  "
                                >

                                    {/* PRODUCT */}
                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-3">

                                            {/* PRODUCT IMAGE */}
                                            <div
                                                className="
                          w-10
                          h-10

                          rounded-lg

                          bg-[#EEF7F0]

                          flex
                          items-center
                          justify-center

                          text-sm
                        "
                                            >
                                                🥜
                                            </div>

                                            <div>

                                                <p className="font-medium text-sm text-[#1F2937]">
                                                    {product.product}
                                                </p>

                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    SKU-{product.id}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* BRAND */}
                                    <td className="px-5 py-4 text-sm text-gray-700">
                                        {product.brand}
                                    </td>

                                    {/* CATEGORY */}
                                    <td className="px-5 py-4">

                                        <span
                                            className="
                        px-2.5
                        py-1

                        rounded-full

                        bg-green-100
                        text-green-700

                        text-xs
                        font-medium
                      "
                                        >
                                            {product.category}
                                        </span>

                                    </td>

                                    {/* WEIGHT */}
                                    <td className="px-5 py-4 text-sm text-gray-700">
                                        {product.weight}
                                    </td>

                                    {/* MRP */}
                                    <td className="px-5 py-4 text-sm font-medium text-[#1F2937]">
                                        {product.mrp}
                                    </td>

                                    {/* GST */}
                                    <td className="px-5 py-4 text-sm text-gray-700">
                                        {product.gst}
                                    </td>

                                    {/* STOCK */}
                                    <td className="px-5 py-4">

                                        <span
                                            className={`
                        px-2.5
                        py-1

                        rounded-full

                        text-xs
                        font-medium

                        ${product.stock === 'In Stock'
                                                    ? 'bg-green-100 text-green-700'
                                                    : product.stock === 'Low Stock'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                                }
                      `}
                                        >
                                            {product.stock}
                                        </span>

                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-1">

                                            <button
                                                className="
                          p-2

                          rounded-lg

                          text-gray-500
                          hover:bg-blue-50
                          hover:text-blue-600

                          transition-all
                          duration-200
                        "
                                            >
                                                <FiEye size={16} />
                                            </button>

                                            <button
                                                className="
                          p-2

                          rounded-lg

                          text-gray-500
                          hover:bg-green-50
                          hover:text-green-600

                          transition-all
                          duration-200
                        "
                                            >
                                                <FiEdit2 size={16} />
                                            </button>

                                            <button
                                                className="
                          p-2

                          rounded-lg

                          text-gray-500
                          hover:bg-red-50
                          hover:text-red-600

                          transition-all
                          duration-200
                        "
                                            >
                                                <FiTrash2 size={16} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* FOOTER */}
                <div
                    className="
            flex
            items-center
            justify-between

            px-5
            py-3

            border-t
            border-gray-100

            bg-[#FAFBFA]
          "
                >

                    <p className="text-xs text-gray-500">
                        Showing 1-10 of 1,284 products
                    </p>

                    {/* PAGINATION */}
                    <div className="flex items-center gap-2">

                        <button
                            className="
                px-3
                py-1.5

                rounded-lg

                border
                border-gray-200

                text-[#1F2937]
                text-sm

                hover:bg-gray-50

                transition-all
              "
                        >
                            Previous
                        </button>

                        <button
                            className="
                px-3
                py-1.5

                rounded-lg

                bg-[#1A3A25]

                text-white
                text-sm
              "
                        >
                            1
                        </button>

                        <button
                            className="
                px-3
                py-1.5

                rounded-lg

                border
                border-gray-200

                text-[#1F2937]
                text-sm

                hover:bg-gray-50

                transition-all
              "
                        >
                            2
                        </button>

                        <button
                            className="
                px-3
                py-1.5

                rounded-lg

                border
                border-gray-200

                text-[#1F2937]
                text-sm

                hover:bg-gray-50

                transition-all
              "
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}