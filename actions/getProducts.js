import { db } from "../lib/prisma";

export async function getProducts() {
    try {
        const data = await db.products.findMany({
            orderBy: {
                createdat: 'desc'
            },
        });

        return data
    } catch (error) {
        console.error('Error in test fetch:', error);
    }
}


