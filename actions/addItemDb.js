import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addItemDb(item) {
    // Get the current user from Clerk
    const user = await currentUser();

    // If user is not found, return null or handle the error
    if (!user) {
        return { error: 'User not authenticated' };
    }
    const addItemInDb = await db?.cartitem.findUnique({
        where: {
            product_id: item.productId,
        },
    });

    console.log('item already exist in cart', checkItemAlreadyExist)
    // if (checkItemAlreadyExist) {
    //     return null
    // }

    try {
        // Ensure that the userId matches with the current Clerk user
        if (item.user !== user.id) {
            return { error: 'Unauthorized user' };
        }

        // Create a new cart item in the database
        const addItemInDb = await db?.cartitem.create({
            data: {
                product_id: item.productId,
                quantity: item.quantity,
                user: item.user, // Associate the correct user
            },
        });
        revalidatePath('/cartpage')
        return { success: 'Data sent', addItemInDb };
    } catch (error) {
        console.error('Error adding item to DB:', error);
        return { error: 'Failed to add item to the database' };
    }
}
