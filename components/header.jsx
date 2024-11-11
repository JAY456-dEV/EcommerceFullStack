import React from 'react'
import { BsCart, BsPerson, BsSearch, BsShop } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { checkUser } from '../actions/checkUser';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import ClientBurgerMenu from './burgerMenu/clientBurgerMenu'

async function Header() {
    await checkUser()
    const user = await currentUser()

    return (
        <div className="w-full bg-white py-6 text-[14px] font-bold leading-6  text-black relative">
            <div className="w-[90%] mx-auto flex gap-10 items-center md:justify-normal justify-between">
                <p className="text-2xl lg:w-full  w-fit max-w-[187px] font-bold">Clothing</p>
                <div className="hidden md:flex  w-full items-center justify-between">
                    <div>
                        <ul className="md:flex gap-4">
                            {[
                                ...Array("Home", "Shop", "About", "Blog", "Contact", "Pages"),
                            ].map((item, idx) => {
                                return <Link href={`${item == 'Home' ? '/' : item.toLocaleLowerCase()}`} key={idx}>{item}</Link>;
                            })}
                        </ul>
                    </div>
                    <div className="flex lg:gap-7 gap-3 items-center">
                        <div className="flex gap-2 items-center">
                            <BsPerson size={20} />
                            {user?.firstName}
                            <div className='flex'>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                            </div>
                        </div>
                        <div className='cursor-pointer'>
                            <BsSearch size={18} />
                        </div>
                        <Link href={'/cartpage?id=1'} className='cursor-pointer'>
                            <BsCart size={18} />
                        </Link>
                        <Link href={'/wishlist'} className='cursor-pointer'>
                            <CiHeart size={24} />
                        </Link>
                    </div>
                </div>

                <div className='md:hidden flex gap-4 items-center'>
                    <div className="flex gap-2 items-center">
                        <div className='sm:flex gap-1 hidden'>
                            <BsPerson size={20} />
                            {user?.firstName}
                        </div>
                        <div className='flex'>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                        </div>
                    </div>
                    <BsSearch size={18} className='cursor-pointer' />
                    <BsShop size={18} className='cursor-pointer' />
                    <ClientBurgerMenu />
                </div>
            </div >
        </div >
    )
}

export default Header