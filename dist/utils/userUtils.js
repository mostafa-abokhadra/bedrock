import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function sanitizeUser(email) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true
            }
        });
        return user;
    }
    catch (error) {
        return {
            "info": "An error has occured while sanitizing user",
            error: error
        };
    }
}
