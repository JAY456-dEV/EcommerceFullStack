import React from 'react'
import Image from 'next/image';
import { BsAlarm } from 'react-icons/bs';
import { MdArrowRight, MdComment } from 'react-icons/md';

function FeaturedCard({ cardData }) {

    const { img, title, category, desc, time, comment, } = cardData

    return (
        <div className='max-w-[400px] shadow-md  pb-4 relative'>
            <div className='bg-red-600 text-white uppercase font-bold  w-fit absolute py-1 px-5 rounded-sm top-3 left-3'>New</div>
            <div>
                <Image src={img} className='w-full h-[290px]  object-cover' />
            </div>

            <div className='py-3 px-4'>
                <div className='flex gap-5'>
                    {category.map((item, idx) => <p key={idx} className={`${idx == 0 ? 'text-blue-500' : ''}`}>{item}</p>)}
                </div>

                <div className='mt-3'>
                    <h3 className='text-3xl font-light'>{title}</h3>
                    <p className='mt-5 text-gray-500'>
                        {desc}
                    </p>
                </div>

                <div className='mt-4 flex items-center justify-between text-gray-500'>
                    <div className='flex items-center gap-1'>
                        <BsAlarm />
                        <p>{time}</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <MdComment />
                        <p>{comment}</p>
                    </div>
                </div>

                <div className='flex gap-1 items-center mt-3'>
                    <p className='text-2xl font-bold text-gray-600'>Learn More</p>
                    <MdArrowRight size={35} className='mt-2' />
                </div>
            </div>
        </div>
    )
}

export default FeaturedCard