'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useUser } from '@clerk/nextjs'
import { addAllData, addMultipleItem } from '../../../cartSlice/addItemSlice'
import { setProductsDataRedux } from '../../../cartSlice/getAllProducts'
import { MinusIcon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaValidation } from '../../../lib/schemaValidation'
import { addUserAddress } from '../../..//cartSlice/userAddress'
import { ShimmerDiv } from 'shimmer-effects-react'

function ContactDetail() {

    const totalProducts = useSelector((state) => state.getReduxProductsData)
    const addedCartItem = useSelector((state) => state.addedItem)
    const dispatch = useDispatch()
    const { user } = useUser()
    const [loading, setLoading] = useState(true)
    const choosedShipping = useSelector((state) => state.choosedShipping)
    // // console.log(user.firstName)
    // console.log(user.primaryEmailAddress.emailAddress)

    async function getData() {
        if (!user) {
            setLoading(false);
            return; // If no user is logged in, stop further execution
        }

        try {
            const res = await fetch('/api/get-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                }),
            })


            const mainData = await res.json();

            if (res.ok) {
                dispatch(addAllData(mainData.productsByUserId))
                dispatch(setProductsDataRedux(mainData.getAllProducts))
            }
            setLoading(false)
        } catch (err) {
            setError('Error while fetching data: ' + err.message);
            setLoading(false)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {// Set loading to false after the request
        getData()
    }, [user])

    // console.log(totalProducts, addedCartItem)

    async function handleAddMultipleItem(productId, TypeOfBtn) {
        try {
            dispatch(addMultipleItem({ productId, type: TypeOfBtn }))
            const res = await fetch('/api/add-multiple', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    TypeOfBtn
                })
            })
            const data = await res.json()

            if (res.ok) {
                console.log('Item Added SuccessFully')
            }
        } catch (error) {
            console.error('Error while adding item:', error);
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schemaValidation) })

    const router = useRouter()

    function onSubmit(data) {
        console.log('Form Data', data)
        dispatch(addUserAddress(data))
        router.replace(`/payment?totalAmount=${totalProducts.map((item) => {
            let searchCart = addedCartItem.find((prod) => prod.product_id == item.id)
            if (searchCart) {
                return Number(item.originalprice) * searchCart.quantity
            }
            return 0
        }).reduce((acc, curr) => acc + curr, choosedShipping ? 15 : 0).toFixed(2)}`)
    }

    return (
        <div className='flex lg:flex-row flex-col-reverse justify-between gap-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7'>
                <div className='border border-gray-500 w-full p-3 py-6 rounded-sm'>
                    <h2 className='text-lg pb-3 font-semibold'>Contact Information</h2>
                    <div className='flex flex-wrap md:justify-between gap-6'>
                        <div className='flex flex-col w-full md:w-[48%]'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>First Name</label><p className='text-sm text-red-500 font-semibold'>{errors.firstName?.message}</p>
                            <input type="text" name='firstName' placeholder='First Name'{...register("firstName")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>

                        <div className='flex flex-col w-full md:w-[48%]'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>Last Name</label>
                            <p className='text-sm text-red-500 font-semibold'>{errors.lastName?.message}</p>
                            <input type="text" placeholder='Last Name' name='lastName' {...register("lastName")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>

                        <div className='flex flex-col  w-full'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>Phone Number</label>
                            <p className='text-sm text-red-500 font-semibold'>{errors.phoneNumber?.message}</p>
                            <input type="text" placeholder='Phone Number' name='phoneNumber' {...register("phoneNumber")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>Email Address</label>
                            <p className='text-sm text-red-500 font-semibold'>{errors.email?.message}</p>
                            <input type="text" placeholder='Your Email' name='email'{...register("email")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>
                    </div>
                </div>

                <div className='border border-gray-500 w-full p-3 py-6 rounded-sm'>
                    <h2 className='text-lg pb-3 font-semibold'>Shipping Address</h2>
                    <div className='flex flex-wrap md:justify-between gap-6'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>STREET ADDRESS</label>
                            <p className='text-sm text-red-500 font-semibold'>{errors.address?.message}</p>
                            <input type="text" placeholder='Street Address' name='address' {...register("address")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>COUNTRY</label>
                            <p className='text-sm text-red-500 font-semibold'>{errors.country?.message}</p>
                            <input type="text" placeholder='Country' name='country' {...register("country")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>Town / City</label>
                            <p className='text-sm text-red-500 font-semibold'>{errors.city?.message}</p>
                            <input type="text" placeholder='Town / City' name='city' {...register("city")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>

                        <div className='flex flex-col w-full md:w-[48%]'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>State</label>
                            <p className='text-sm text-red-500 font-semibold'>{errors.state?.message}</p>
                            <input type="text" placeholder='State' name='state' {...register("state")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>

                        <div className='flex flex-col w-full md:w-[48%]'>
                            <label htmlFor="" className='text-[12px] font-bold text-gray-500 pb-1 uppercase'>Zip Code</label>
                            <p className='text-sm text-red-500 font-semibold'>{errors.zipCode?.message}</p>
                            <input type="text" placeholder='Zip Code' name='zipCode' {...register("zipCode")} className='border outline-none py-1 w-full pl-3 rounded-md' />
                        </div>
                    </div>
                </div>

                <Button className='w-full' type='submit'>
                    Place Order
                </Button>
            </form>

            <div className='border border-gray-500 w-full lg:w-[55%] rounded-sm py-3 px-5'>
                <h2 className='text-lg pb-3 font-semibold'>Order Summary</h2>
                <div className='h-[470px] lg:h-[500px] overflow-y-auto'>
                    {
                        !loading ? totalProducts.map((products) => {
                            let matchedProd = addedCartItem.find((item) => item.product_id == products.id)
                            console.log(matchedProd, products)
                            return matchedProd ? (
                                <>
                                    <div className="flex justify-between items-center mb-6 border-b-[1px] pt-2 pb-5">
                                        <div className='flex items-center gap-4'>
                                            <Image src={products.imagesrc} width={70} height={70} alt="Tray Table" />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-base font-bold">{products.title}</p>
                                                <p className="text-gray-500 text-sm">Color: black</p>
                                                <div className="flex lg:my-0 my-2 items-center gap-2 rounded-md py-[2px] px-2 border border-gray-400">
                                                    <MinusIcon className="cursor-pointer" size={19} onClick={() => handleAddMultipleItem(matchedProd.id, 'Decrease')} />
                                                    <p>{matchedProd.quantity}</p>
                                                    <PlusIcon className="cursor-pointer" size={19} onClick={() => handleAddMultipleItem(matchedProd.id, 'Increase')} />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='font-semibold'>${(Number(products.originalprice) * matchedProd.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className='border-gray-400'></div>
                                </>
                            ) : <div>
                                {
                                    Array.from({ length: 4 }).map((item) => {
                                        return (
                                            <div></div>
                                        )
                                    })
                                }
                            </div>
                        }) : <>
                            {
                                Array.from({ length: 5 }).map((_, idx) => {
                                    return <div key={idx} className="flex justify-between items-center mb-6 border-b-[1px] pt-2 pb-5">
                                        <div className='flex items-center gap-4'>
                                            <ShimmerDiv mode="light" height={70} width={70} />
                                            <div className="flex flex-col gap-1">
                                                <ShimmerDiv mode="light" height={10} width={30} />
                                                <p className="text-gray-500 text-sm">Color: black</p>
                                                <div className="flex lg:my-0 my-2 items-center gap-2 rounded-md py-[2px] px-2 border border-gray-400">
                                                    <ShimmerDiv mode="light" height={20} width={20} />
                                                    <ShimmerDiv mode="light" height={10} width={10} />
                                                    <ShimmerDiv mode="light" height={20} width={20} />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <ShimmerDiv mode="light" height={20} width={20} />
                                        </div>
                                    </div>
                                })
                            }
                        </>}

                </div>

                <div className='border-b-[2px] borde-gray-300 mt-8 mb-3'></div>
                <div className='flex justify-between'>
                    <p>Shipping</p>
                    <p className='font-semibold'>{choosedShipping ? '$15' : '0'}</p>
                </div>

                <div className='border-b-[2px] borde-gray-300 my-4 mb-3'></div>
                <div className='flex justify-between'>
                    <p>Sub Total</p>
                    <p className='font-semibold'>${
                        totalProducts.map((item) => {
                            let searchCart = addedCartItem.find((prod) => prod.product_id == item.id)
                            if (searchCart) {
                                return Number(item.originalprice) * searchCart.quantity
                            }
                            return 0
                        }).reduce((acc, curr) => acc + curr, 0).toFixed(2)
                    }</p>
                </div>

                <div className='border-b-[2px] borde-gray-300 my-4 mb-3'></div>
                <div className='flex justify-between font-bold text-lg'>
                    <p> Total</p>
                    <p >${
                        totalProducts.map((item) => {
                            let searchCart = addedCartItem.find((prod) => prod.product_id == item.id)
                            if (searchCart) {
                                return Number(item.originalprice) * searchCart.quantity
                            }
                            return 0
                        }).reduce((acc, curr) => acc + curr, choosedShipping ? 15 : 0).toFixed(2)
                    }</p>
                </div>
            </div>
        </div >
    )
}

export default ContactDetail