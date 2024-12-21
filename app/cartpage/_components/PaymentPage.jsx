"use client";

import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";

const PaymentMainPage = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const userAddress = useSelector((state) => state.userAddress)
    const user = useUser()

    // console.log(user.firstName)
    // console.log(user.primaryEmailAddress.emailAddress)

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: Math.floor(amount), // Amount in cents
            }),
        }).then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    // console.log('Client Secretkey :', clientSecret)
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        handleSendMail()

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `https://ecommerce-full-stack-next-js-lgyq.vercel.app/payment-success?amount=${amount}`,
            },
        });


        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            setErrorMessage(error.message);
        } else {
            // The payment UI automatically closes with a success animation.
            // Your customer is redirected to your `return_url`.
        }

        setLoading(false);
    };

    console.log(userAddress)

    async function handleSendMail() {
        // console.log('Redux Address', userAddress);
        try {
            const res = await fetch('/api/mail-handler', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userAddress })
            });

            // Log the full response
            console.log('Response:', res);

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Mail Sent', data);
        } catch (error) {
            console.error('Sending Mail Error:', error);
        }
    }

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md max-w-[550px] mx-auto mt-12">
            {clientSecret && <PaymentElement />}

            {errorMessage && <div>{errorMessage}</div>}

            <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${amount}` : "Processing..."}
            </button>
        </form>
    );
};

export default PaymentMainPage;
