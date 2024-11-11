import { db } from "../../lib/prisma";

export default async function handleRemoveWishlist(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { productId, userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is missing' });
    }

    const findUser = await db?.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })

    if (!findUser) {
        console.log('User Not Finded')
        return null
    }
    console.log(productId)
    const findMainWishlistID = await db?.whislist.findFirst({
        where: { product_id: productId }
    })

    console.log(findMainWishlistID)

    try {
        await db?.whislist.delete({
            where: { id: findMainWishlistID.id }
        })

        console.log('wishlist item delete great')
    } catch (error) {
        console.log('error to delete wishlist item')
    }
}