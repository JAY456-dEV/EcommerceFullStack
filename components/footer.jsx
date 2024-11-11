import React from 'react'
import { BsFacebook, BsInstagram, BsTwitterX } from 'react-icons/bs'

function Footer() {
    const footerData = {
        "companyInfo": [
            "Legal",
            "About Us",
            "Carrier",
            "We Are Hiring",
            "Blog"
        ],
        "Legal": [
            "Legal",
            "About Us",
            "Carrier",
            "We Are Hiring",
            "Blog"
        ],
        "features": [
            "Business Marketing",
            "User Analytic",
            "Live Chat",
            "Unlimited Support"
        ],
        "resources": [
            "IOS & Android",
            "Watch a Demo",
            "Customers",
            "API"
        ]
    };

    return (
        <div className=' w-full mt-28'>
            <div className='w-full bg-[#FAFAFA] py-8'>
                <div className='w-[90%] mx-auto'>
                    <div className='flex justify-between items-center'>
                        <h2 className='md:text-3xl text-xl  font-bold'>Clothing</h2>
                        <div className='flex gap-3'>
                            <BsFacebook className='md:text-2xl text-xl' />
                            <BsInstagram className='md:text-2xl text-xl' />
                            <BsTwitterX className='md:text-2xl text-xl' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white py-7'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-[90%] mx-auto pt-8 flex-wrap'>
                    {
                        Object.keys(footerData).map((item) => {
                            return (
                                <div>
                                    <h3 className='text-xl font-bold capitalize text-[#252B42]'>{item}</h3>
                                    <div className='mt-1'>
                                        {
                                            footerData[item].map((data) => {
                                                return (
                                                    <p className='text-lg font-semibold capitalize text-gray-500'>{data}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div>
                        <p className='text-lg font-bold capitalize'>Get In Touch</p>
                        <div>
                            <div className='flex items-center mt-6'>
                                <input type="text" placeholder='Your Email' className='border py-2 pl-2 pr-6 outline-none w-full xl:w-[12vw]' />
                                <button className='bg-blue-500 text-white py-2 px-6'>Subscribe</button>
                            </div>
                            <p className='text-gray-500 mt-2'>Lore imp sum dolor Amit</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full bg-[#FAFAFA] py-8'>
                <div className='flex justify-between items-center text-lg font-bold capitalize w-[90%] mx-auto text-gray-500'>
                    Made With Love By  All Right Reserved ❤️
                </div>
            </div>
        </div>
    )
}

export default Footer