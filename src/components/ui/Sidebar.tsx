'use client'

import { logout } from "@/actions/auth/logout"
import { bodyFont } from "@/config/font"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { IoShirtOutline } from "react-icons/io5"

export const Sidebar = () => {

  const path = usePathname();
  const router = useRouter();

  const onLogout = async()=>{
    await logout();
    router.replace('/');
    
  }

  return (
    <aside
      id="sidebar"
      className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 borderR border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">

              <li>
                <Link
                  href="/dashboard/home"
                  className={`${path === '/dashboard/home' ? 'bg-gray-300 hover:bg-gray-400' : ''} text-base capitalize text-gray-900 font-bold rounded-lg flex items-center p-2 group`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                  </svg>

                  <span className={`ml-3 ${bodyFont.className}`}>
                    Inicio
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/products"
                  className={`${path === '/dashboard/products' ? 'bg-gray-300 hover:bg-gray-400' : ''} text-base capitalize text-gray-900 font-bold rounded-lg flex items-center p-2 group`}
                >

                  <IoShirtOutline size={22} />
                  <span className={`ml-3 ${bodyFont.className}`}>
                    Productos
                  </span>
                </Link>
              </li>
            </ul>


          </div>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <button 
          className="mb-10 btn-primary"
          onClick={onLogout}
        >
          Cerrar sesion
        </button>
      </div>

    </aside>
  )
}
