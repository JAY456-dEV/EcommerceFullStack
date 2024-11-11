import { db } from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { productId, quantity, userId } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        try {
            const userExists = await db.user.findUnique({
                where: { clerkUserId: userId },
            });

            if (!userExists) {
                console.error('User does not exist in the database');
                return res.status(400).json({ error: 'User does not exist' });
            }

            console.log(userExists);
            const checkProductAlreadyInCart = await db.cartItems.findFirst({
                where: {
                    product_id: productId,
                    userId: userExists.id,
                },
            });

            if (checkProductAlreadyInCart) {
                return res.status(200).json({ message: 'Product Already In Cart' });
            }

            const addItemInDb = await db.cartItems.create({
                data: {
                    product_id: productId,
                    quantity: quantity,
                    userId: userExists.id,
                },
            });

            console.log('Added item:', addItemInDb);
            return res.status(200).json({ message: 'Item added successfully' });
        } catch (error) {
            console.error('Error adding item to DB:', error);
            return res.status(500).json({ error: 'Failed to add item' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}