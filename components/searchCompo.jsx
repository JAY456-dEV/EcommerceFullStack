'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useUser } from '@clerk/nextjs'
import UseOutSideClick from '../hooks/useOutSideClick'
import { useRouter } from 'next/navigation'
import { Input } from "../components/ui/input"

function SearchCompo() {
    const { user } = useUser()
    const [allProducts, setAllProducts] = useState([])
    const [searchPopUp, setSearchPopup] = useState(false)
    const [query, setQuery] = useState('')
    const [searchedProductsList, setSearchedProductsList] = useState([])
    const router = useRouter()

    async function handleFetchProducts() {
        if (user) {
            try {
                const response = await fetch('api/get-products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id })
                })

                const { getAllProducts } = await response.json()
                setAllProducts(getAllProducts)
            } catch (error) {
                console.log('ERROR TO FETCH DATA', error)
            }
        }
    }

    useEffect(() => {
        handleFetchProducts()
    }, [user])

    const interValRef = useRef()
    useEffect(() => {
        clearTimeout(interValRef.current)

        interValRef.current = setTimeout(() => {
            let show = allProducts.filter((item) => item['title'].toLowerCase().indexOf(query.toLowerCase()) !== -1)
            setSearchedProductsList(show)
        }, 500)

        return (() => clearInterval(interValRef.current))
    }, [query])

    const searchBox = useRef()

    UseOutSideClick(searchBox, () => setSearchPopup(false))

    function handleSelectProduct(item) {
        router.push(`/productdetails/${item.id}`)
        setQuery(item.title)
        setSearchPopup(false)
    }

    return (
        <div className='relative' ref={searchBox}>
            <div className='cursor-pointer' onClick={() => setSearchPopup(prev => !prev)}>
                <BsSearch size={18} />
            </div>
            <div className='w-full h-full inset-0 bg-gray-800'>
                {
                    searchPopUp && (
                        <div className='relative'>
                            <div>
                                {/* <input type="text" placeholder='Enter Product Name' value={query} onChange={(e) => setQuery(e.target.value)} className='border outline-none border-gray-300 w-64 pl-1 font-medium absolute right-[30%] top-3 z-10' /> */}
                                <Input type="text" placeholder='Enter Product Name' value={query} onChange={(e) => setQuery(e.target.value)} className='border outline-none w-64 pl-1 font-medium absolute right-[30%] top-3 z-10 border-b-transparent bg-white ' />
                            </div>
                            {
                                searchedProductsList.length > 0 && <div className='absolute right-[30%] w-64 top-[48px]  z-[999] bg-white h-[400px] overflow-hidden overflow-y-scroll scrollbar-hide'>
                                    <div>
                                        {
                                            searchedProductsList.map((item, idx) => {
                                                return (
                                                    <div className='border border-gray-300 p-1 cursor-pointer' onClick={() => handleSelectProduct(item)}>
                                                        <p>{item.title}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SearchCompo