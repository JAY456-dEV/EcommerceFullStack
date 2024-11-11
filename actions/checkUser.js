import { db } from "../lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function checkUser() {
    const user = await currentUser()

    if (!user) {
        return null;
    }

    try {
        const loggedInUser = await db?.user.findUnique({
            where: {
                clerkUserId: user.id
            }
        })

        if (loggedInUser) {
            return loggedInUser
        }

        const name = `${user.firstName} ${user.lastName}`;

        await clerkClient().users.updateUser(user.id, {
            username: name.split(" ").join("-") + user.id.slice(-4),
        })

        const newUser = db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                username: name.split(" ").join("-") + user.id.slice(-4),
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            }
        })
        // console.log(newUser)
        return newUser
    } catch (error) {
        // console.log(error, 'Error')
    }
}