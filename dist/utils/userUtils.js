"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = sanitizeUser;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function sanitizeUser(email) {
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
