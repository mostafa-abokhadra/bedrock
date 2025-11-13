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
        } catch (error: any) {
                return res.status(500).json({ message: "Internal server error", error: error.errmsg })
        }
    }
    static async getVaults(req: any, res: any) {
        try {
            const vaults = await Vault.find({
                author: req.user._id
            })
            if (vaults.length === 0)
                return res.status(200).json({message: "user has no vaults"})
            return res.status(200).json({message: "vaults retreived successfully", vaults: vaults})
        } catch(error) {
            return res.status(500).json({message: "server errro occured"})
        }
    }
        static async updateVault(req: any, res: any) {
        try {
            const {oldName, newName} = req.body
            const updatedVault = await Vault.findOneAndUpdate(
                { name: oldName, author: req.user._id },
                { name: newName},
                {new: true}
            )
            if (!updatedVault)
                return res.status(200).json({message: "can't find vault"})
            return res.status(200).json({message: "vault updated successfully", vault: updatedVault})
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "an error has occured"})
        }
    }

}

