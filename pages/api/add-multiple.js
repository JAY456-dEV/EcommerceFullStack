import { db } from "../..//lib/prisma";

export default async function addMultiplItemInDb(req, res) {
    if (req.method === 'POST') {
        const { productId, TypeOfBtn } = req.body; // Ensure `userId` is passed from the client

        // Validate the incoming request
        if (!productId) {  // Ensure both `productId` and `userId` are present
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            // Check if the cart item already exists for the user
            const existingCartItem = await db?.cartItems.findUnique({
                where: {
                    id: productId,
                },
            });
            console.log('id from db data ', existingCartItem)

            if (existingCartItem && TypeOfBtn == 'Increase') {
                // If item exists, update the quantity
                await db?.cartItems.update({
                    where: { id: existingCartItem.id },
                    data: {
                        quantity: existingCartItem.quantity + 1, // Adjust quantity increment as needed
                    },
                });
                return res.status(200).json({ message: 'Item Increase quantity updated successfully', existingCartItem });
                
            } else if (existingCartItem && TypeOfBtn == 'Decrease' && existingCartItem.quantity > 1) {
                await db?.cartItems.update({
                    where: { id: existingCartItem.id },
                    data: {
                        quantity: existingCartItem.quantity - 1, // Adjust quantity increment as needed
                    },
                });
                return res.status(200).json({ message: 'Item Decrease quantity updated successfully', existingCartItem });
            } else if (existingCartItem && TypeOfBtn == 'Decrease' && existingCartItem.quantity == 1) {
                await db?.cartItems.delete({
                    where: { id: existingCartItem.id },
                });
                return res.status(200).json({ message: 'Item deleted by getting 0 quantity', existingCartItem });
            }

            else {
                await db?.cartItems.delete({
                    where: { id: existingCartItem.id },
                });
                return res.status(200).json({ message: 'Item Delete  quantity updated successfully', existingCartItem });

            }
        } catch (error) {
            console.error('Error adding item to DB:', error);
            return res.status(500).json({ error: 'Failed to add item' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
