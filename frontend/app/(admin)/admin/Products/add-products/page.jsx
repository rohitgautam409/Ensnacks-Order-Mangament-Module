'use client'

import { useState } from 'react'


const page = () => {

    {/*
  *Need to add more Field data in the FormData
   */}
    const [formData, setFormData] = useState({
        productName: " ",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>

            {/* PAGE HEADER */}
            <div className="bg-white rounded-2xl m-6 shadow-sm border border-gray-200">
                <h1 className="text-3xl text-[#1F2937] font-bold px-6 py-5">
                    Add New Product
                </h1>
            </div>

            {/* FORM CONTAINER */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 m-6">

                <form className="px-8 py-8">

                    {/* FORM FIELDS */}
                    <div className="space-y-6">

                        {/* PRODUCT NAME */}
                        <div className="flex items-center gap-6">

                            <label
                                htmlFor="productName"
                                className="w-40 text-sm font-bold text-[#1F2937]"
                            >
                                Product Name
                            </label>

                            <input
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter Product Name"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>

                        {/* BRAND */}
                        <div className="flex items-center gap-6">

                            <label className="w-40 text-sm font-bold text-[#1F2937]">
                                Brand
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Brand"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>


                        <div className="flex items-center gap-6">

                            <label className="w-40 text-sm font-bold text-[#1F2937]">
                                Category
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Category"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>

                        {/* WEIGHT */}
                        <div className="flex items-center gap-6">

                            <label className="w-40 text-sm font-bold text-[#1F2937]">
                                Weight
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Weight"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>


                        <div className="flex items-center gap-6">

                            <label className="w-40 text-sm font-bold text-[#1F2937]">
                                MRP
                            </label>

                            <input
                                type="text"
                                placeholder="Enter MRP"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>


                        <div className="flex items-center gap-6">

                            <label className="w-40 text-sm font-bold text-[#1F2937]">
                                GST
                            </label>

                            <input
                                type="text"
                                placeholder="Enter GST"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>


                        <div className="flex items-center gap-6">

                            <label className="w-40 text-sm font-bold text-[#1F2937]">
                                Case Size
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Case Size"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>


                        <div className="flex items-center gap-6">

                            <label className="w-40 text-sm font-bold text-[#1F2937]">
                                UOM
                            </label>

                            <input
                                type="text"
                                placeholder="Enter UOM"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>


                        <div className="flex items-center gap-6">

                            <label className="w-40 text-sm font-bold text-[#1F2937]">
                                Shelf Life
                            </label>

                            <input
                                type="text"
                                placeholder="Enter Shelf Life"

                                className="
              w-full
              max-w-md
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              bg-white
              text-gray-800
              shadow-sm
              outline-none

              transition-all
              duration-200

              focus:border-[#2D6A4F]
              focus:ring-2
              focus:ring-[#7A3412]/30
              focus:shadow-md

              placeholder:text-gray-400
            "
                            />

                        </div>

                    </div>


                    <div className="flex justify-end mt-10">

                        <button
                            type="submit"

                            className="
            px-8
            py-3
            rounded-xl

            bg-gradient-to-b
            from-[#1A3A25]
            to-[#102819]

            text-white
            font-semibold
            text-sm

            shadow-md

            hover:shadow-xl
            hover:scale-[1.02]
            hover:from-[#224730]
            hover:to-[#163522]

            active:scale-[0.98]

            transition-all
            duration-300

            cursor-pointer
          "
                        >
                            Submit Product
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default page