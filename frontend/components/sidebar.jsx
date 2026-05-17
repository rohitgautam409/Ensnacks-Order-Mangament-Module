'use client'

import { IoMdHome } from "react-icons/io";
import { BiPackage } from 'react-icons/bi'
import { FaClipboardList } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import Image from 'next/image'
import companyImg from '../assets/company-logo.png'
import { useRouter } from 'next/navigation'


export default function Sidebar() {


    const pathname = usePathname()
    const [activeSection, setActiveSection] = useState(null);

    const router = useRouter();
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('ensnacks_user');
        const storedToken = localStorage.getItem('ensnacks_token');

        if (!storedToken || !storedUser) {
            router.push('/ensnacks-admin'); //not logged in
            return

        }

        const parsedUser = JSON.parse(storedUser);

        //role protection
        if (parsedUser.role !== 'admin') {
            router.push('/login') //not admin might be client redirecting him to clients Login
        }
        setUser(parsedUser)
    }, [router])


    const handleLogout = () => {
        localStorage.removeItem('ensnacks_user')
        localStorage.removeItem('ensnacks_token')
        router.push('/ensnacks-admin')
    }





    return (

        <div className="h-screen flex flex-col justify-between w-72 fixed shadow-2xl">
            <aside className="bg-gradient-to-b from-[#1A3A25] to-[#102819] h-screen flex flex-col">
                <div className="border-b-2 border-[#5A1E08] flex justify-center items-center py-4">
                    <div className=" bg-[#F1E2D1] rounded-lg flex justify-center items-center overflow-hidden p-2">
                        <Image src={companyImg} alt="company-logo" width={40} height={40} />
                    </div>
                    <p className="text-md font-bold text-[#F8FAF8] my-6 mx-2 ">Ensnacks Admin Portal</p>
                </div>

                {/* Home */}
                <Link onClick={() => setActiveSection(activeSection === 'home' ? null : 'home')} href='/admin/dashboard' className={`${pathname === '/admin/dashboard' ? `bg-[#7A3412]` : " "}  ${activeSection === 'home' && `bg-[#7A3412]`} text-[#F8FAF8] hover:bg-[#7A3412] py-2 px-2 flex items-center mx-1.5 rounded-lg mt-8 transition-all duration-300 ease-in-out`}>
                    <IoMdHome size={22} />
                    <p className="ml-4 text-sm">Home</p>
                </Link>


                {/* Manage Products */}

                <div onClick={() => setActiveSection(activeSection === 'products' ? null : 'products')} className={`text-[#F8FAF8] hover:bg-[#7A3412] py-2 px-2 flex justify-between items-center mx-1.5  mt-4 cusor-pointer ${activeSection === 'products' ? `bg-[#7A3412] rounded-tl-lg rounded-tr-lg ` : `rounded-lg`} transition-all duration-300 ease-in-out`}>

                    <div className="flex">
                        <BiPackage size={22} />
                        <p className="ml-4 text-sm">Manage Products</p>
                    </div>

                    {activeSection === "products" ? <RiArrowDropDownLine size={20} /> : <MdKeyboardArrowRight size={20} />}

                </div>
                {activeSection === "products" && (
                    <div className="flex flex-col bg-[#7A3412] rounded-bl-lg rounded-br-lg mx-1.5">
                        <Link href="/admin/Products/add-products" className={`${pathname === '/admin/Products/add-products' && `bg-[#5A1E08]`} text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mx-1.5 rounded-lg cursor-pointer flex items-center transition-all duration-300 ease-in-out `}><FaPlus size={16} />
                            <p className="ml-4">Add Products</p> </Link>
                        <Link href="/admin/Products/add-full-portfolio" className={`${pathname === '/admin/Products/add-full-portfolio' && `bg-[#5A1E08]`} text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 rounded-lg mx-1.5 cursor-pointer flex items-center transition-all duration-300 ease-in-out `}><FaPlus size={16} />
                            <p className="ml-4">Add Full Portfolio</p></Link>
                        <Link href="/admin/Products/view-all-products" className={`${pathname === '/admin/Products/view-all-products' && `bg-[#5A1E08]`} text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mb-2 rounded-lg mx-1.5 cursor-pointer flex items-center transition-all duration-300 ease-in-out `}><FaPlus size={16} />
                            <p className="ml-4">View All Products</p></Link>
                    </div>
                )}

                {/* All Orders  */}

                <div onClick={() => setActiveSection(activeSection === 'Orders' ? null : 'Orders')} className={`text-[#F8FAF8] hover:bg-[#7A3412] py-2 px-2 flex justify-between items-center mx-1.5  mt-4 cusor-pointer ${activeSection === 'Orders' ? `bg-[#7A3412] rounded-tl-lg rounded-tr-lg ` : `rounded-lg`} transition-all duration-300 ease-in-out `}>

                    <div className="flex">
                        <FaClipboardList size={22} />
                        <p className="ml-4 text-sm">Orders</p>
                    </div>

                    {activeSection === 'Orders' ? <RiArrowDropDownLine size={20} /> : <MdKeyboardArrowRight size={20} />}

                </div>
                {activeSection === 'Orders' && (
                    <div className="flex flex-col bg-[#7A3412] rounded-bl-lg rounded-br-lg mx-1.5">
                        <div className="text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mx-1.5 rounded-lg cursor-pointer flex items-center transition-all duration-300 ease-in-out "><FaPlus size={16} />
                            <p className="ml-4">Add Products</p> </div>
                        <div className="text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mb-2 mx-1.5 rounded-lg cursor-pointer flex items-center transition-all duration-300 ease-in-out "><FaPlus size={16} />
                            <p className="ml-4">View All Products</p></div>
                    </div>
                )}


                {/* Clients Management */}

                <div onClick={() => setActiveSection(activeSection === 'Clients' ? null : 'Clients')} className={`text-[#F8FAF8] hover:bg-[#7A3412] py-2 px-2 flex justify-between items-center mx-1.5  mt-4 cusor-pointer ${activeSection === 'Clients' ? `bg-[#7A3412] rounded-tl-lg rounded-tr-lg ` : `rounded-lg`} transition-all duration-300 ease-in-out `}>

                    <div className="flex">
                        <HiUsers size={22} />
                        <p className="ml-4 text-sm">Clients Management</p>
                    </div>

                    {activeSection === 'Clients' ? <RiArrowDropDownLine size={20} /> : <MdKeyboardArrowRight size={20} />}

                </div>
                {activeSection === 'Clients' && (
                    <div className="flex flex-col bg-[#7A3412] rounded-bl-lg rounded-br-lg mx-1.5">
                        <div className="text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mx-1.5 rounded-lg cursor-pointer flex items-center transition-all duration-300 ease-in-out "><FaPlus size={16} />
                            <p className="ml-4">Add Products</p> </div>
                        <div className="text-sm text-[#F8FAF8] hover:bg-[#5A1E08] py-2 px-2 mt-2 mb-2 mx-1.5 rounded-lg cursor-pointer flex items-center transition-all duration-300 ease-in-out "><FaPlus size={16} />
                            <p className="ml-4">View All Products</p></div>
                    </div>
                )}

            </aside>
            <div className=" bg-[#F1E2D1]/40 p-4">

                {/* Admin Info */}
                <div className="flex items-center  gap-3 mb-4">

                    <div className="w-10 h-10 rounded-full bg-[#7A3412] flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>

                    <div>
                        <p className="text-[#7A3412] text-sm font-semibold">
                            {user?.name || 'Admin Name'}
                        </p>

                        <p className="text-[#7A3412]/50 text-xs">
                            {user?.email || 'Email id not found'}
                        </p>
                    </div>

                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-[#7A3412] hover:bg-[#5A1E08] hover:scale-105 text-white py-2 rounded-lg transition-all duration-300 cursor-pointer ease-in-out"
                >
                    <FiLogOut size={18} />

                    Logout
                </button>

            </div>


        </div>


    )
}