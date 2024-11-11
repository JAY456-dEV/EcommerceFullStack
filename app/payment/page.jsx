'use client'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubCurrency } from '../../lib/convertToSubCurrency'
import PaymentMainPage from '../cartpage/_components/PaymentPage'
import { useSearchParams } from 'next/navigation';

function PaymentPage() {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const router = useSearchParams();
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        setTotalAmount(Number(router.get('totalAmount')))
    }, [router])

    return (
        <Elements stripe={stripePromise} options={{
            mode: 'payment',
            amount: convertToSubCurrency(totalAmount),
            currency: 'usd'
        }} className='mt-10 w-[85%] mx-auto'>
            <PaymentMainPage amount={totalAmount} />
        </Elements>
    )
}

export default PaymentPage