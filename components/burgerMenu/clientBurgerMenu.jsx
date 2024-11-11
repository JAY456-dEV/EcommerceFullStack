'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { RxCross2 } from "react-icons/rx";

function ClientBurgerMenu() {

    const [popUp, setPopUp] = useState(false)

    function handleOpenPopup() {
        setPopUp(true)
    }

    return (
        <div>
            {!popUp ? <CiMenuBurger size={23} className='cursor-pointer' onClick={() => handleOpenPopup()} /> : <RxCross2 size={24} className='cursor-pointer' onClick={() => setPopUp(false)} />}
            {
                <div className={`absolute top-[79px] left-0 w-full z-10 bg-white pt-3 pb-6 ${popUp ? `h-[320px] opacity-100` : 'h-0 opacity-0'} transition-all ease-linear`}>
                    <div className='max-w-[90%] mx-auto'>
                        <ul className="flex flex-col gap-5">
                            {[
                                ...Array("Home", "Shop", "About", "Blog", "Contact", "Pages"),
                            ].map((item, idx) => {
                                return <Link className='text-2xl' href={`${item == 'Home' ? '/' : item.toLocaleLowerCase()}`} key={idx}>{item}</Link>;
                            })}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default ClientBurgerMenu