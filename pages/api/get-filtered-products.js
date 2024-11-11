import { db } from "../../lib/prisma";

export default async function handleFilterData(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId, selectedCategory } = req.body;
    console.log('Array of categories:', selectedCategory);

    // Validate input
    if (!userId) {
        return res.status(400).json({ error: 'User ID is missing' });
    }
    if (!selectedCategory || !selectedCategory.length) {
        return res.status(400).json({ error: 'Categories are missing or empty' });
    }

    try {
        // Find user by clerkUserId
        const findUser = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!findUser) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch products based on categories
        const products = await db.products.findMany({
            where: {
                category: {
                    in: selectedCategory,
                },
            },
        });

        // If no products match, return 404
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the selected categories' });
        }

        // Successfully return products
        return res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
}
