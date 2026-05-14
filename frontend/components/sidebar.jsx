'use client'

import { IoMdHome } from "react-icons/io";
import { BiPackage } from 'react-icons/bi'
import { FaClipboardList } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";


export default function Sidebar() {
    const pathname = usePathname()

    const [activeSection, setActiveSection] = useState(null);





    return (

        <aside className="bg-gradient-to-b from-[#1A3A25] to-[#102819] min-h-screen w-64 flex flex-col">
            <div className="border-b-2 border-[#5A1E08] ">

                <p className="text-[#F8FAF8] my-8 mx-4 ">Ensnacks Admin Portal</p>
            </div>

            {/* Home */}
            <Link onClick={() => setActiveSection(activeSection === 'home' ? null : 'home')} href='/admin/dashboard' className={`${pathname === '/admin/dashboard' ? `bg-[#7A3412]` : " "}  ${activeSection === 'home' && `bg-[#7A3412]`} text-[#F8FAF8] hover:bg-[#7A3412] py-2 px-2 flex items-center mx-1.5 rounded-lg mt-8`}>
                <IoMdHome size={22} />
                <p className="ml-4 text-sm">Home</p>
            </Link>


            {/* Manage Products */}

            <div onClick={() => setActiveSection(activeSection === 'products' ? null : 'products')} className={`text-[#F8FAF8] hover:bg-[#7A3412] py-2 px-2 flex justify-between items-center mx-1.5  mt-4 cusor-pointer ${activeSection === 'products' ? `bg-[#7A3412] rounded-tl-lg rounded-tr-lg ` : `rounded-lg`}`}>

                <div className="flex">
                    <BiPackage size={22} />
                    <p className="ml-4 text-sm">Manage Products</p>
                </div>

                {activeSection === "products" ? <RiArrowDropDownLine size={20} /> : <MdKeyboardArrowRight size={20} />}

            </div>
            {activeSection === "products" && (
                <div className="flex flex-col bg-[#7A3412] rounded-bl-lg rounded-br-lg mx-1.5">
                    <Link href="/admin/Products/add-products" className={`${pathname === '/admin/Products/add-products' && `bg-[#5A1E08]`} text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mx-1.5 rounded-lg cursor-pointer flex items-center`}><FaPlus size={16} />
                        <p className="ml-4">Add Products</p> </Link>
                    <Link href="/admin/Products/add-full-portfolio" className={`${pathname === '/admin/Products/add-full-portfolio' && `bg-[#5A1E08]`} text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 rounded-lg mx-1.5 cursor-pointer flex items-center`}><FaPlus size={16} />
                        <p className="ml-4">Add Full Portfolio</p></Link>
                    <Link href="/admin/Products/view-all-products" className={`${pathname === '/admin/Products/view-all-products' && `bg-[#5A1E08]`} text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 rounded-lg mx-1.5 cursor-pointer flex items-center`}><FaPlus size={16} />
                        <p className="ml-4">View All Products</p></Link>
                </div>
            )}

            {/* All Orders  */}

            <div onClick={() => setActiveSection(activeSection === 'Orders' ? null : 'Orders')} className={`text-[#F8FAF8] hover:bg-[#7A3412] py-2 px-2 flex justify-between items-center mx-1.5  mt-4 cusor-pointer ${activeSection === 'Orders' ? `bg-[#7A3412] rounded-tl-lg rounded-tr-lg ` : `rounded-lg`}`}>

                <div className="flex">
                    <FaClipboardList size={22} />
                    <p className="ml-4 text-sm">Orders</p>
                </div>

                {activeSection === 'Orders' ? <RiArrowDropDownLine size={20} /> : <MdKeyboardArrowRight size={20} />}

            </div>
            {activeSection === 'Orders' && (
                <div className="flex flex-col bg-[#7A3412] rounded-bl-lg rounded-br-lg mx-1.5">
                    <div className="text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mx-1.5 rounded-lg cursor-pointer flex items-center"><FaPlus size={16} />
                        <p className="ml-4">Add Products</p> </div>
                    <div className="text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 rounded-lg mx-1.5 cursor-pointer flex items-cente"><FaPlus size={16} />
                        <p className="ml-4">View All Products</p></div>
                </div>
            )}


            {/* Clients Management */}

            <div onClick={() => setActiveSection(activeSection === 'Clients' ? null : 'Clients')} className={`text-[#F8FAF8] hover:bg-[#7A3412] py-2 px-2 flex justify-between items-center mx-1.5  mt-4 cusor-pointer ${activeSection === 'Clients' ? `bg-[#7A3412] rounded-tl-lg rounded-tr-lg ` : `rounded-lg`}`}>

                <div className="flex">
                    <HiUsers size={22} />
                    <p className="ml-4 text-sm">Clients Management</p>
                </div>

                {activeSection === 'Clients' ? <RiArrowDropDownLine size={20} /> : <MdKeyboardArrowRight size={20} />}

            </div>
            {activeSection === 'Clients' && (
                <div className="flex flex-col bg-[#7A3412] rounded-bl-lg rounded-br-lg mx-1.5">
                    <div className="text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mx-1.5 rounded-lg cursor-pointer flex items-center"><FaPlus size={16} />
                        <p className="ml-4">Add Products</p> </div>
                    <div className="text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 rounded-lg mx-1.5 cursor-pointer flex items-cente"><FaPlus size={16} />
                        <p className="ml-4">View All Products</p></div>
                </div>
            )}

        </aside>



    )
}