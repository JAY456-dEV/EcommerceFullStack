import {  NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const config = {
    runtime: "edge", // Enable Edge runtime
};

export default async function POST(request) {
    try {
        const body = await request.json();
        console.log('Received request body:', body);

        const { amount } = body;

        // Validate amount input
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // Create the Payment Intent with automatic payment methods
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        // Return the client secret for confirmation
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
