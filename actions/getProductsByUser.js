import { db } from "../lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getProductsByCurrentUser(userId) {
    const user = await currentUser()
    if (!user) {
        return null
    }

    const findUser = await db?.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    // console.log('userIdss from', findUser)

    try {
        const productsByUserId = await db?.cartItems.findMany({
            where: {
                userId: findUser.id
            }
        })

        const getAllProducts = await db?.products.findMany({
            orderBy: {
                createdat: 'desc'
            },
        })

        // console.log('userProducts Data', productsByUserId)
        return { productsByUserId, getAllProducts }
    } catch (error) {
        console.error('Error in test fetch:', error);
    }

    return userIdByProducts
}