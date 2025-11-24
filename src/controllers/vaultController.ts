import { Vault } from "../models/vault.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { findPackageJSON } from "module";

export default class vaultController {

    static async createVault(req: any, res: any) {

        const session = await mongoose.startSession()
        const { name } = req.body;

        try { 

            session.startTransaction()

            const [newVault] = await Vault.create(
                [{ name, author: req.user._id}],
                {session}
            )

            const updateUserVaults = await User.findByIdAndUpdate(
                req.user._id,
                { $addToSet: { vaults: newVault._id}},
                {new: true, session}
            )

            await session.commitTransaction()
            return res.status(201).json({
                message: "Vault created successfully", vault: newVault });

        } catch (error: any) {
            const errorMsg = {message: "error creating a vault", error: error.message}
            console.log(errorMsg)
            return res.status(500).json(errorMsg)

        } finally {
            session.endSession()
        }
    }

    static async getVaults(req: any, res: any) {

        try {

            const vaults = await Vault.find({
                author: req.user._id
            })

            if (vaults.length === 0)
                return res.status(200).json({message: "user has no vaults"})

            return res.status(200).json({
                message: "vaults retreived successfully", vaults: vaults})

        } catch(error: any) {
            const errorMsg = {message: "error getting user vaults", error: error.message}
            console.log(errorMsg)
            return res.status(500).json(errorMsg)
        }
    }
        static async updateVault(req: any, res: any) {

        try {

            const {oldName, newName} = req.body

            const updatedVault = await Vault.findOneAndUpdate(
                { name: oldName, author: req.user._id },
                { name: newName},
                {new: true, runValidators: true}
            )

            if (!updatedVault)
                return res.status(404).json({message: "can't find vault"})

            return res.status(200).json({
                message: "vault updated successfully", vault: updatedVault})

        } catch(error: any) {
            const errorMsg = {message: "error updating vault", error: error.message}
            console.log(errorMsg)
            return res.status(500).json(errorMsg)
        }
    }

    static async deleteVault(req: any, res: any) {
        const session = await mongoose.startSession()

        try {
            session.startTransaction()
            const {name} = req.body

            const vault = await Vault.findOne({name, author: req.user._id}).session(session)

            if (!vault)
                return res.status(404).json({message: "vault doesn't exist"})
            
            const deletedVault = await Vault.deleteOne({_id: vault._id}).session(session)

            await User.updateOne(
                {_id: req.user._id},
                {$pull: {vaults:  vault._id}},
                {session}
            )

            await session.commitTransaction()            
            return res.status(200).json({message: "vault deleted successfully"})

        } catch(error: any) {

            console.log("an error occured while deleting vault", error)
            return res.status(500).json({message: "server Error occured"})
        } finally {
            session.endSession()
        }
    }
}

