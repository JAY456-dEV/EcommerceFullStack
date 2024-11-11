import React from 'react'
import mediacover1 from '../../public/mediacover1.png'
import mediacover2 from '../../public/mediacover2.png'
import mediacover3 from '../../public/mediacover3.png'
import { ChevronRight } from "lucide-react";
import Image from 'next/image';

import ProductShop from './_components/productShop';

function ShopPage() {

    const MediaCoverCategory = [
        {
            img: mediacover1,
            title: 'CLOTHS',
            desc: '5 Items'
        },
        {
            img: mediacover3,
            title: 'CLOTHS',
            desc: '5 Items'
        },
        {
            img: mediacover2,
            title: 'CLOTHS',
            desc: '5 Items'
        },
        {
            img: mediacover3,
            title: 'CLOTHS',
            desc: '5 Items'
        },
        {
            img: mediacover1,
            title: 'CLOTHS',
            desc: '5 Items'
        },
    ]


    return (
        <>
            <div className='bg-[#FAFAFA] w-full py-5'>
                <div className='container pb-10'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-3xl font-light'>Shop</h2>
                        <div className='flex items-center gap-2'>
                            <p>Home</p>
                            <ChevronRight className='text-gray-600' />
                            <p className='text-gray-400'>Shop</p>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5 gap-4'>
                            {
                                MediaCoverCategory.map((media) => {
                                    return (
                                        <div className='relative'>
                                            <Image src={media.img} className='w-full md:w-[300px]' />
                                            <div className='absolute top-[50%] left-[50%] text-white -translate-y-[50%] -translate-x-[50%] text-center'>
                                                <p className='mb-2 text-xl'>{media.title}</p>
                                                <p className='font-bold'>{media.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ProductShop />
        </>
    );
}

export default ShopPage