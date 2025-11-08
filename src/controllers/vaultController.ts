import { Vault } from "../models/vault.model.js";
import { User } from "../models/user.model.js";
export default class vaultController {
    static async createVault(req: any, res: any) {
        const { name } = req.body;
        try { 
            const newVault = await Vault.create({name, author: req.user._id})
            if (!newVault) {
                return res.status(400).json({ message: "vault creation failed" });
            }
            const updateUserVaults = await User.findByIdAndUpdate(
                req.user._id,
                { $addToSet: { vaults: newVault._id}},
                {new: true}
            )
            return res.status(201).json({ message: "Vault created successfully", vault: newVault });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error });  
        }
    }
}

