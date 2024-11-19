import { db } from "../lib/prisma";

export async function getProductsById(productId) {
    try {
        const getProductDetails = await db?.products.findUnique({
            where: {
                id: productId
            }
        })

        return getProductDetails
    } catch (error) {
        console.log('Error Fetch data', error)
    }
}