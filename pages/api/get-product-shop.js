import { db } from "../../lib/prisma";

export default async function getFilterdProducts(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId } = req.body

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
        const data = await db?.products.findMany({
            orderBy: {
                createdat: 'desc'
            },
        })

        return res.status(200).json({
            data
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}