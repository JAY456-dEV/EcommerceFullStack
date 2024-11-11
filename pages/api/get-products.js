import { db } from "../../lib/prisma";

export default async function getProductsByCurrentUser(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }


    // Extract the userId from the request body
    const { userId } = req.body;
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

    try {
        const productsByUserId = await db?.cartItems.findMany({
            where: {
                userId: findUser.id
            }
        });

        // Fetch all products ordered by creation date
        const getAllProducts = await db?.products.findMany({
            orderBy: {
                createdat: 'desc'
            },
        });

        const getWishlistProducts = await db?.whislist.findMany()

        // Return both the products by user ID and all products
        return res.status(200).json({
            productsByUserId,
            getAllProducts,
            getWishlistProducts
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
