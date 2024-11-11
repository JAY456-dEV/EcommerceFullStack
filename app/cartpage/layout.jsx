'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

export default function Layout({ children }) {
    // Extracting specific parameters if needed
    const [currentParam, setCurrentParam] = useState(1)
    const cartHeader = [
        {
            id: 1,
            pageName: 'Shopping Cart',
            navigateRoute: '/'
        },
        {
            id: 2,
            pageName: 'Checkout details',
            navigateRoute: '/checkout'
        },
        {
            id: 3,
            pageName: 'Order complete',
            navigateRoute: '/ordercomplete'
        },
    ];

    const router = useRouter();
    const param = useSearchParams()

    // function handleNavigate(route, routeId) {
    //     router.push(`/cartpage${route}?id=${routeId}`);
    // }

    useEffect(() => {
        setCurrentParam(param.get('id'))
    }, [param])

    return (
        <>
            <div className="w-full">
                <div className="max-w-[1400px] mx-auto">
                    <div className='pt-6'>
                        {/* common content start */}
                        <h1 className='text-center text-[2.8rem] font-semibold'>Cart</h1>
                        <div className='mt-5 flex justify-around items-center overflow-x-auto whitespace-nowrap gap-10 md:gap-0 px-5'>
                            {
                                cartHeader.map((nav) => {
                                    return (
                                        <div key={nav.id} className="flex flex-col w-64 cursor-pointer">
                                            <div className="flex gap-2 items-center">
                                                <div className={`w-10 h-10 rounded-full ${currentParam > nav.id && 'bg-green-500'} ${currentParam == nav.id ? 'bg-black' : 'bg-[#B1B5C3]'} flex justify-center items-center  text-white rounded-full}`}>{currentParam > nav.id ? <Check /> : nav.id}</div>
                                                <p className={`font-semibold ${currentParam > nav.id && 'text-green-500'} ${currentParam == nav.id ? 'text-black' : 'text-[#B1B5C3]'}`}>{nav.pageName}</p>
                                            </div>
                                            <div className={` ${currentParam > nav.id && 'border-green-500'} ${currentParam == nav.id ? 'border-black' : 'border-gray-300'} border-b-2 w-full lg:w-56 mt-3`}></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* common content end */}
                        {children}
                    </div>
                </div>
            </div >
        </>
    );
}
