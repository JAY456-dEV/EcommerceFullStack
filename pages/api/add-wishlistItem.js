import { db } from "../../lib/prisma"

export default async function addWishlistItem(req, res) {
    if (req.method === 'POST') {
        const { productId, userId } = req.body

        if (!userId) {
            console.log('User Not Found')
            return res.status(400).json({ message: 'User Not Found' })
        }

        try {
            const checkUserExistWithId = await db.user.findUnique({
                where: {
                    clerkUserId: userId
                }
            })

            if (!checkUserExistWithId) {
                console.error('User does not exist in the database');
                return res.status(400).json({ error: 'User does not exist' });
            }

            const checkInCartItemAvailable = await db?.cartItems.findFirst({
                where: {
                    product_id: productId,
                    userId: checkUserExistWithId.id
                }
            })

            if (checkInCartItemAvailable) {
                // console.log('Item Already In Cart')
                return res.status(200).json({ message: 'Item Already In Cart' })
            }

            const checkAlreadyInWishlist = await db?.whislist.findFirst({
                where: {
                    product_id: productId,
                    userId: checkUserExistWithId.id
                }
            })

            if (checkAlreadyInWishlist) {
                // console.log('Item Already In Wishlist')
                return res.status(400).json({ message: 'Item Already In Wishlist' })
            }

            const addWishlist = await db?.whislist.create({
                data: {
                    product_id: productId,
                    userId: checkUserExistWithId.id,
                }
            })

            // console.log('item added in wishlist')
            return res.status(200).json({ message: 'Item Added In Wishlist' })
        } catch (error) {
            console.error('Item Not Added In Wishlist:', error);
            return res.status(500).json({ error: 'Failed to add item in wishlist' });
        }
    }
}