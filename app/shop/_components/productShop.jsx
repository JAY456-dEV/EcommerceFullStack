'use client'

import { ChevronDown, Grid2X2, Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../../components/productCard';
import { useUser } from '@clerk/nextjs';
import { Button } from '../../../components/ui/button';
import { ShimmerDiv } from 'shimmer-effects-react';

function ProductShop() {
    // const products = [
    //     {
    //         id: "prod1", // Manually assigned ID
    //         title: "T-Shirt",
    //         department: "English Department",
    //         originalPrice: "$26.48",
    //         discountedPrice: "$16.48",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg1,
    //         imageAlt: "prodImg1"
    //     },
    //     {
    //         id: "prod2",
    //         title: "Girl Suit",
    //         department: "English Department",
    //         originalPrice: "$24.99",
    //         discountedPrice: "$14.99",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg2,
    //         imageAlt: "prodImg2"
    //     },
    //     {
    //         id: "prod3",
    //         title: "Top T-Shirt",
    //         department: "English Department",
    //         originalPrice: "$20.00",
    //         discountedPrice: "$12.00",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg3,
    //         imageAlt: "prodImg3"
    //     },
    //     {
    //         id: "prod4",
    //         title: "Graphic Design",
    //         department: "English Department",
    //         originalPrice: "$22.50",
    //         discountedPrice: "$15.00",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg4,
    //         imageAlt: "prodImg4"
    //     },
    //     {
    //         id: "prod5",
    //         title: "Graphic Design",
    //         department: "English Department",
    //         originalPrice: "$27.99",
    //         discountedPrice: "$19.99",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg5,
    //         imageAlt: "prodImg5"
    //     },
    //     {
    //         id: "prod6",
    //         title: "Graphic Design",
    //         department: "English Department",
    //         originalPrice: "$25.00",
    //         discountedPrice: "$18.00",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg6,
    //         imageAlt: "prodImg6"
    //     },
    //     {
    //         id: "prod7",
    //         title: "Polo T-Shirt",
    //         department: "English Department",
    //         originalPrice: "$23.48",
    //         discountedPrice: "$15.48",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg7,
    //         imageAlt: "prodImg7"
    //     },
    //     {
    //         id: "prod8",
    //         title: "T-Shirt",
    //         department: "English Department",
    //         originalPrice: "$21.99",
    //         discountedPrice: "$12.99",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg8,
    //         imageAlt: "prodImg8"
    //     },
    //     {
    //         id: "prod8",
    //         title: "T-Shirt",
    //         department: "English Department",
    //         originalPrice: "$21.99",
    //         discountedPrice: "$12.99",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg9,
    //         imageAlt: "prodImg8"
    //     },
    //     {
    //         id: "prod8",
    //         title: "T-Shirt",
    //         department: "English Department",
    //         originalPrice: "$21.99",
    //         discountedPrice: "$12.99",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg10,
    //         imageAlt: "prodImg8"
    //     },
    //     {
    //         id: "prod8",
    //         title: "T-Shirt",
    //         department: "English Department",
    //         originalPrice: "$21.99",
    //         discountedPrice: "$12.99",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg11,
    //         imageAlt: "prodImg8"
    //     },
    //     {
    //         id: "prod8",
    //         title: "T-Shirt",
    //         department: "English Department",
    //         originalPrice: "$21.99",
    //         discountedPrice: "$12.99",
    //         colors: ["#252B42", "#23856D", "#E77C40", "#252B42"],
    //         imageSrc: prodImg12,
    //         imageAlt: "prodImg8"
    //     },
    // ];


    // console.log(dbProducts)
    const { user } = useUser()
    const [dbProducts, setDbProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [copyData, setCopyData] = useState([])
    const [data, setData] = useState([])
    const [currentPageData, setCurrentPageData] = useState(1)
    const [perPageData, setPerPageData] = useState(6)
    const [filterOption, setFilterOption] = useState({
        priceRange: '',
        gender: '',
        rating: ''
    })

    async function handleCalldata() {
        setLoading(true)
        try {
            const response = await fetch('/api/get-product-shop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id
                })
            })

            const { data } = await response.json()
            setLoading(false)
            setDbProducts(data)
            setCopyData(data)
        } catch (error) {
            console.log('error to getfilterdData')
            setLoading(false)
        }
    }

    useEffect(() => {
        handleCalldata()
    }, [user])

    const [loadMoreLoading, setLoadMoreLoading] = useState(false)

    useEffect(() => {
        let filteredProdcuts = dbProducts.slice(perPageData * currentPageData - perPageData, perPageData * currentPageData)
        console.log(filteredProdcuts)
        setLoadMoreLoading(true)
        setTimeout(() => {
            setLoadMoreLoading(false)
            setData(prev => [...new Set([...prev, ...filteredProdcuts])])
        }, 1000);
    }, [currentPageData, dbProducts, perPageData])


    useEffect(() => {
        if (filterOption.priceRange !== '' || filterOption.rating !== '' || filterOption.gender !== '') {
            function handleFilterData(data) {
                let dataPrice = data.filter((item) => {
                    if (filterOption.priceRange == '0-10') {
                        return Number(item.discountedprice) < 10
                    } else if (filterOption.priceRange == '10-20') {
                        return Number(item.discountedprice) > 10 && Number(item.discountedprice) < 20
                    } else if (filterOption.priceRange == '20-30') {
                        return Number(item.discountedprice) > 20 && Number(item.discountedprice) < 30
                    } else if (filterOption.priceRange == '30-40') {
                        return Number(item.discountedprice) > 30 && Number(item.discountedprice) < 40
                    } else {
                        return item
                    }
                })
                handleGender(dataPrice)
            }

            function handleGender(Data) {
                let dataPrice = Data.filter((item) => {
                    console.log(item)
                    if (filterOption.gender == 'men') {
                        console.log(item.category)
                        return item.category == 'men'
                    } else if (filterOption.gender == 'women') {
                        return item.category == 'women'
                    } else {
                        return item
                    }
                })
                handleRating(dataPrice)
            }

            function handleRating(data) {
                let dataPrice = data.filter((item) => {
                    if (filterOption.rating == '1') {
                        return item.rating >= '0' && item.rating <= '1'
                    } else if (filterOption.rating == '2') {
                        return item.rating >= '1' && item.rating <= '2'
                    } else if (filterOption.rating == '3') {
                        return item.rating >= '2' && item.rating <= '3'
                    } else if (filterOption.rating == '4') {
                        return item.rating >= '3' && item.rating <= '4'
                    } else if (filterOption.rating == '5') {
                        return item.rating >= '4' && item.rating <= '5'
                    } else {
                        return item
                    }
                })
                console.log(data)
                setData(dataPrice)
            }
            handleFilterData(copyData)
        } else {
            setData(copyData)
        }

    }, [filterOption])

    // if (loading) {
    //     return (

    //     )
    // }

    function handleSelectedValue(e) {
        console.log(e.target.value)
        setFilterOption((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    console.log(filterOption)
    function handleLoadMore() {
        if (currentPageData < Math.ceil(copyData.length / perPageData)) {
            setCurrentPageData(prev => prev + 1)
        }
    }

    return (
        <div className='w-[90%] mx-auto px-5'>
            <div className='flex justify-between flex-wrap items-center mt-10 gap-5'>
                <div>
                    <p className='text-gray-500'>Showing all 12 results</p>
                </div>

                <div className='flex items-center gap-4'>
                    <p>Views:</p>
                    <div className='flex items-center gap-2'>
                        <div className='border p-2 rounded-lg cursor-pointer'>
                            <Grid2X2 />
                        </div>
                        <div className='border p-2 rounded-lg cursor-pointer'>
                            <Menu />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>
                    <div className='bg-blue-500 border rounded-md p-2 px-8 cursor-pointer text-white'>
                        <p>Filter</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <p>Popularity</p>
                        <ChevronDown size={20} />
                    </div>
                </div>
            </div>

            <div className='flex md:flex-row flex-col md:justify-center'>
                <div className="max-w-lg mt-14">
                    <h2 className="text-2xl font-bold mb-3">Filter Products</h2>
                    <Button className="mb-3" onClick={() => setFilterOption({
                        priceRange: '',
                        gender: '',
                        rating: ''
                    })}>
                        Remove Filter
                    </Button>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Price Range:</label>
                        <select
                            value={filterOption.priceRange}
                            name='priceRange'
                            onChange={handleSelectedValue}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select a price range</option>
                            <option value="0-10">$0 - $10</option>
                            <option value="10-20">$10 - $20</option>
                            <option value="20-30">$20 - $30</option>
                            <option value="30-40">$30 - $40</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Gender:</label>
                        <select
                            name='gender'
                            value={filterOption.gender}
                            onChange={handleSelectedValue}
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Gender</option>
                            <option value="men">man</option>
                            <option value="women">women</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Rating:</label>
                        <div className="">
                            {Array.from({ length: 5 }, (_, index) => (
                                <label key={index} className="flex items-center mr-4 mb-1">
                                    <input
                                        type="radio" // Use radio button
                                        value={index + 1}
                                        name='rating' // Group radio buttons with the same name
                                        onChange={handleSelectedValue}
                                        className="mr-1 leading-tight"
                                    />
                                    <span className="text-sm">{index + 1} Star</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='grid sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8'>
                        {
                            data && data.map((item) => {
                                return (
                                    <ProductCard item={item} key={item.id} />
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-center mt-10'>
                        <Button onClick={() => handleLoadMore()}>{!loadMoreLoading ? 'Load More' : 'Loading Data...'}</Button>
                    </div>
                </div>
            </div>
        </div>
        // :
        // <>
        //     <div className='w-[90%] mx-auto px-5'>
        //         <div className='flex justify-between flex-wrap items-center mt-10 gap-5'>
        //             <div>
        //                 <ShimmerDiv mode="light" height={45} width={200} />
        //             </div>

        //             <div className='flex items-center gap-4'>
        //                 <ShimmerDiv mode="light" height={45} width={170} />
        //             </div>

        //             <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>
        //                 <ShimmerDiv mode="light" height={45} width={200} />
        //             </div>
        //         </div>

        //         <div className='flex gap-12'>
        //             <div className="max-w-lg mt-14">
        //                 <h2 className="text-2xl font-bold mb-3">
        //                     <ShimmerDiv mode="light" height={15} width={120} />
        //                 </h2>
        //                 <div className="mb-4">
        //                     <label className="block mb-2 text-sm font-medium text-gray-700">
        //                         <ShimmerDiv mode="light" height={15} width={120} />
        //                     </label>
        //                     <div
        //                         name='priceRange'
        //                         className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        //                     >
        //                         <ShimmerDiv mode="light" height={45} width={200} />
        //                     </div>
        //                 </div>

        //                 <div className="mb-4">
        //                     <label className="block mb-2 text-sm font-medium text-gray-700">
        //                         <ShimmerDiv mode="light" height={15} width={120} />
        //                     </label>
        //                     <div
        //                         name='gender'
        //                         className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        //                     >
        //                         <ShimmerDiv mode="light" height={45} width={200} />
        //                     </div>
        //                 </div>

        //                 <div className="mb-4">
        //                     <label className="block mb-2 text-sm font-medium text-gray-700">
        //                         <ShimmerDiv mode="light" height={15} width={120} />
        //                     </label>
        //                     <div className="">
        //                         {Array.from({ length: 6 }, (_, index) => (
        //                             <ShimmerDiv mode="light" height={45} width={200} />
        //                         ))}
        //                     </div>
        //                 </div>
        //             </div>
        //             <div>
        //                 <div className='grid sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8'>
        //                     {Array.from({ length: 6 }, (_, index) => (
        //                         <ShimmerDiv mode="light" height={300} width={300} />
        //                     ))}
        //                 </div>
        //                 <div className='flex justify-center mt-10'>
        //                     <ShimmerDiv mode="light" height={45} width={200} />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
    )
}

export default ProductShop