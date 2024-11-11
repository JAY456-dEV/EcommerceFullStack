'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; // Use `useUser` hook for client-side user data
import { useDispatch, useSelector } from 'react-redux';
import { addAllData, addMultipleItem } from '../../cartSlice/addItemSlice';
import Image from 'next/image';
import RemoveCartItem from './_components/removeCartItem';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { useParams } from 'next/navigation';
import { setProductsDataRedux } from '../../cartSlice/getAllProducts';
import { chooseShippingOption } from '../../cartSlice/chooseShipping';

function CartPage() {
    const { user } = useUser();  // Fetch user details using Clerk's hook
    const [productsByUserId, setProductsByUserId] = useState([]);
    const [getAllProducts, setGetAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dataRedux = useSelector((state) => state.addedItem)
    const choosedShipping = useSelector((state) => state.choosedShipping)

    const dispatch = useDispatch()

    useEffect(() => {
        async function handleData() {
            if (!user) {
                setLoading(false);
                return; // If no user is logged in, stop further execution
            }

            try {
                const response = await fetch('/api/get-products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user.id,
                    }),
                });

                const mainData = await response.json();

                if (response.ok) {
                    dispatch(addAllData(mainData.productsByUserId))
                    setProductsByUserId(mainData.productsByUserId);
                    setGetAllProducts(mainData.getAllProducts);
                    dispatch(setProductsDataRedux(mainData.getAllProducts))
                    setError(null); // Clear any previous errors
                } else {
                    setError(mainData.error || 'Failed to retrieve products');
                }
            } catch (err) {
                setError('Error while fetching data: ' + err.message);
            } finally {
                setLoading(false); // Set loading to false after the request
            }
            console.log(dataRedux)
        }
        handleData(); // Call the async function inside useEffect
    }, [user]); // Re-run the effect when the user changes

    async function handleAddMultipleItem(productId, TypeOfBtn) {
        if (user) {
            try {
                setProductsByUserId((prev) => {
                    return prev.map((item, idx) => {
                        if (item.id == productId) {
                            if (TypeOfBtn == 'Increase') {
                                return { ...item, quantity: item.quantity + 1 }
                            } else if (TypeOfBtn == 'Decrease') {
                                if (item.quantity > 0) {
                                    return { ...item, quantity: item.quantity - 1 }
                                } else {
                                    prev.splice(idx, 1)
                                }
                            }
                        }
                        return item
                    })
                })
                dispatch(addMultipleItem({ productId, type: TypeOfBtn }))
                const response = await fetch('/api/add-multiple', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: productId,
                        TypeOfBtn
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Item added successfully:', data.message);
                    // setError(null); // Reset any previous error state
                } else {
                    console.error('Failed to add item:', data.error);
                    // setError(data.error || 'Failed to add item');
                }
            } catch (error) {
                console.error('Error while adding item:', error);
            }
        } else {
            console.warn('User is not authenticated');
        }
    }

    const param = useParams()
    // console.log(param)

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div className='mt-5 md:mt-10 max-w-[1700px] mx-auto px-5'>
                <div className='flex lg:flex-row flex-col gap-20 lg:gap-28  xl:gap-56 justify-center md:mt-16'>
                    <div>
                        <div className="w-full">
                            <div className="md:flex hidden justify-between md:gap-20 xl:gap-32  pb-2 border-b border-black">
                                <p className="mr-16 font-semibold">Products</p>
                                <p className="font-semibold ml-20">Quantity</p>
                                <p className="font-semibold ml-8">Price</p>
                                <p className="font-semibold">SubTotal</p>
                            </div>

                            <div className='md:hidden block border-b-2 mb-3'>
                                <p className="mr-16 font-semibold mb-2">Products</p>
                            </div>
                            {/* Render productsByUserId here */}
                            {/* <CartProductsCard productsByUserId={productsByUserId} getAllProducts={getAllProducts} /> */}
                            <div className='flex flex-col gap-6'>
                                {
                                    getAllProducts.map((products) => {
                                        let matchedProd = productsByUserId.find((item) => item.product_id == products.id)
                                        return matchedProd ? (
                                            <div className="flex justify-between items-center py-4 border-b border-gray-300 gap-10">
                                                <div className="flex items-center gap-4">
                                                    <div className=''>
                                                        <Image src={products.imagesrc} width={100} height={100} alt="Tray Table" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-lg">{products.title}</p>
                                                        <p className="text-gray-500">Color: black</p>
                                                        <div className='md:block hidden'>
                                                            <RemoveCartItem matchedProd={matchedProd} setProductsByUserId={setProductsByUserId} />
                                                        </div>

                                                        <div className="md:hidden my-2 flex items-center gap-2 rounded-md justify-center  border border-gray-400 py-1  p-1">
                                                            <MinusIcon size={20} className="cursor-pointer" onClick={() => handleAddMultipleItem(matchedProd.id, 'Decrease')} />
                                                            <p>{dataRedux && dataRedux?.find(item => item.id == matchedProd.id)?.quantity || 0}</p>
                                                            <PlusIcon size={20} className="cursor-pointer" onClick={() => handleAddMultipleItem(matchedProd.id, 'Increase')} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="md:flex hidden items-center justify-center gap-2 rounded-md  border border-gray-400 py-1  p-2">
                                                    <MinusIcon className="cursor-pointer" onClick={() => handleAddMultipleItem(matchedProd.id, 'Decrease')} />
                                                    <p>{dataRedux && dataRedux?.find(item => item.id == matchedProd.id)?.quantity || 0}</p>
                                                    <PlusIcon className="cursor-pointer" onClick={() => handleAddMultipleItem(matchedProd.id, 'Increase')} />
                                                </div>

                                                <p className='md:block hidden'>${Number(products.discountedprice)}</p> {/* Replace with dynamic price */}
                                                <div>
                                                    <p className='font-semibold'>${(dataRedux && dataRedux?.find(item => item.id == matchedProd.id)?.quantity * Number(products.discountedprice)).toFixed(2)}</p> {/* Replace with dynamic subtotal calculation */}
                                                    <div className='md:hidden block'>
                                                        <RemoveCartItem matchedProd={matchedProd} setProductsByUserId={setProductsByUserId} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : <>
                                            {/* <ShimmerDiv mode="light" height={20} width={150} />
                                            <ShimmerDiv mode="light" height={20} width={150} />
                                            <ShimmerDiv mode="light" height={20} width={150} />
                                            <ShimmerDiv mode="light" height={20} width={150} /> */}
                                        </>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <div className='w-full lg:w-72 bg-transparent border border-gray-400 px-4 py-4 rounded-md'>
                            <p className='font-semibold text-xl mb-3'>Cart Summary</p>
                            <label htmlFor='shipping' className='border mb-3 border-gray-300 h-9 rounded-sm flex justify-between items-center px-2'>
                                <div className='flex items-center gap-2'>
                                    <input type="checkbox" id='shipping' checked={!choosedShipping} onClick={() => dispatch(chooseShippingOption(false))} />
                                    <p className='text-sm'>Free Shipping</p>
                                </div>
                                <div className='text-sm'>
                                    $0.00
                                </div>
                            </label>

                            <label htmlFor='Expressshipping' className='border border-gray-300 h-9 rounded-sm flex justify-between items-center px-2'>
                                <div className='flex items-center gap-2'>
                                    <input type="checkbox" id='Expressshipping' checked={choosedShipping} onClick={() => dispatch(chooseShippingOption(true))} />
                                    <p className='text-sm'>Express shipping</p>
                                </div>
                                <div className='text-sm'>
                                    +$15.00
                                </div>
                            </label>

                            <div className='flex justify-between items-center mt-5 px-1'>
                                <p className='text-sm'>SubTotal</p>
                                <p className='font-semibold'>${
                                    getAllProducts.map((prods) => {
                                        let findItem = productsByUserId.find((items) => items.product_id == prods.id)
                                        if (findItem) {
                                            return findItem.quantity * Number(prods.discountedprice)
                                        }
                                        return 0
                                    }).reduce((acc, curr) => acc + curr, 0).toFixed(2)
                                }</p>
                            </div>

                            <div className='border border-b-[1px] border-gray-200 my-2'></div>

                            <div className='flex justify-between items-center mt-2 px-1 font-semibold text-lg'>
                                <p className=''>Total</p>
                                <p className=''>${
                                    getAllProducts.map((prods) => {
                                        let findItem = productsByUserId.find((items) => items.product_id == prods.id)
                                        if (findItem) {
                                            return findItem.quantity * Number(prods.discountedprice)
                                        }
                                        return 0
                                    }).reduce((acc, curr) => acc + curr, choosedShipping ? 15 : 0).toFixed(2)
                                }</p>
                            </div>

                            <Link href={'/cartpage/checkout?id=2'}>
                                <Button className='w-full mt-5'>
                                    Checkout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPage;