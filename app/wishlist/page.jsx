'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { MdCancel } from 'react-icons/md'
import { removeWishlist } from '../../cartSlice/wishlist'

function WishlistPage() {
    const { user } = useUser();
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [getAllProducts, setGetAllProducts] = useState([]);
    const [error, setError] = useState('')

    async function handleGetProducts() {
        console.log(user)
        try {
            const response = await fetch('/api/get-products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id
                })
            })

            const { getAllProducts, getWishlistProducts } = await response.json()
            setGetAllProducts(getAllProducts)
            setWishlistProducts(getWishlistProducts)
            console.log('user data geeted', data)
        } catch (error) {
            console.log('repsonse error data not getted', error)
        }
    }

    useEffect(() => {
        handleGetProducts()
    }, [user])

    async function handleAddWishlistToCart(productId) {
        try {
            const response = await fetch('/api/add-item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    quantity: 1,
                    userId: user.id
                })
            })

            if (response.ok) {
                setWishlistProducts((prev) => prev.filter((item) => item.product_id !== productId))
                handleRemoveAfterAdded(productId)
            }
        } catch (error) {
            console.log('Error To Add Item to Wishlist')
        }
    }

    async function handleRemoveAfterAdded(productId) {
        dispatch(removeWishlist({ product_id: item.id }))
        try {
            const response = await fetch('/api/remove-wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    userId: user.id
                })
            })

            if (response.ok) {
                console.log('Item Deleted Great!')
            }
        } catch (error) {
            console.log('Error To Add Item to Wishlist')
        }
    }

    function handleRemoveWishlist(productId) {
        setWishlistProducts((prev) => prev.filter((item) => item.product_id !== productId))
        handleRemoveAfterAdded(productId)
    }

    if (!wishlistProducts.length) {
        return (
            <div>
                <div className='mt-5 md:mt-10 max-w-[1700px] mx-auto px-5'>
                    <h1 className='text-center text-3xl font-bold leading-4'>Wishlist</h1>
                    <div className='flex lg:flex-row flex-col gap-20 lg:gap-28  xl:gap-56 justify-center md:mt-16'>
                        <div>
                            <div className="w-full">
                                <div className="md:flex hidden justify-between md:gap-20 xl:gap-32  pb-2 border-b border-black">
                                    <p className="mr-16 font-semibold">Products</p>
                                    <p className="font-semibold ml-20">Quantity</p>
                                    <p className="font-semibold ml-8">Price</p>
                                    <p className="font-semibold ml-8">Add Product</p>
                                </div>

                                <div className='md:hidden block border-b-2 mb-3'>
                                    <p className="mr-16 font-semibold mb-2">Products</p>
                                </div>
                                {/* Render productsByUserId here */}
                                {/* <CartProductsCard productsByUserId={productsByUserId} getAllProducts={getAllProducts} /> */}
                                <div className='flex flex-col gap-6 mt-5'>
                                    No Products In Wishlist
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <>
                <div className='mt-5 md:mt-10 max-w-[1700px] mx-auto px-5'>
                    <h1 className='text-center text-3xl font-bold leading-4'>Wishlist</h1>
                    <div className='flex lg:flex-row flex-col gap-20 lg:gap-28  xl:gap-56 justify-center md:mt-16'>
                        <div>
                            <div className="w-full">
                                <div className="md:flex hidden justify-between md:gap-20 xl:gap-32  pb-2 border-b border-black">
                                    <p className="mr-16 font-semibold">Products</p>
                                    <p className="font-semibold ml-20">Quantity</p>
                                    <p className="font-semibold ml-8">Price</p>
                                    <p className="font-semibold ml-8">Add Product</p>
                                </div>

                                <div className='md:hidden block border-b-2 mb-3'>
                                    <p className="mr-16 font-semibold mb-2">Products</p>
                                </div>
                                {/* Render productsByUserId here */}
                                {/* <CartProductsCard productsByUserId={productsByUserId} getAllProducts={getAllProducts} /> */}
                                <div className='flex flex-col gap-6'>
                                    {
                                        getAllProducts.map((products) => {
                                            let matchedProd = wishlistProducts.find((item) => item.product_id == products.id)
                                            return matchedProd ? (
                                                <div className="flex justify-between items-center py-4 border-b border-gray-300 gap-10">
                                                    <div className="flex items-center gap-4">
                                                        <div className=''>
                                                            <Image src={products.imagesrc} width={100} height={100} alt="Tray Table" />
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-lg">{products.title}</p>
                                                            <p className="text-gray-500">Color: black</p>
                                                            <div onClick={() => handleRemoveWishlist(matchedProd.product_id)} className='md:flex items-center gap-1 hidden cursor-pointer'>
                                                                <MdCancel /> Remove
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="md:flex hidden items-center justify-center gap-2 rounded-md py-1 p-2">
                                                        <p>1</p>
                                                    </div>

                                                    <p className='md:block hidden'>${Number(products.discountedprice)}</p> {/* Replace with dynamic price */}
                                                    {/* <p className='font-semibold'>${(dataRedux && dataRedux?.find(item => item.id == matchedProd.id)?.quantity * Number(products.discountedprice)).toFixed(2)}</p> Replace with dynamic subtotal calculation */}
                                                    <div className='flex items-center gap-1 md:hidden cursor-pointer'>
                                                        <MdCancel /> Remove
                                                    </div>

                                                    <div onClick={() => handleAddWishlistToCart(matchedProd.product_id)}>
                                                        <Button>Add To Cart</Button>
                                                    </div>
                                                </div>
                                            ) : ''
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </>
    )
}

export default WishlistPage 