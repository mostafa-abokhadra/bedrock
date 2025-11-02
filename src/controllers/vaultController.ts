import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class vaultController {
    static async createVault(req: any, res: any) {
        const { name } = req.body;

        try { 
            const newVault = await prisma.vault.create({
                data: {
                    name,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: req.user.id,
                }
            });
            if (!newVault) {
                return res.status(400).json({ message: "vault creation failed" });
            }
            return res.status(201).json({ message: "Vault created successfully", vault: newVault });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error });  
        }
    }
}

