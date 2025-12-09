import { Vault } from "../models/vault.model.js";
import { Folder } from "../models/folder.model.js";
import mongoose from "mongoose";

class folderController {
    static async function (req: any, res: any) {

        const {parentId} = req.params
        const {name} = req.body
        let parentType = 'Vault';
        let folderParent = null;

        const session = await mongoose.startSession()

        try {

            session.startTransaction()

            const vaultParent = await Vault.findOne({_id: req.user._id})

            if (!vaultParent) {
                folderParent = await Folder.findOne({_id: req.user._id})
                if (!folderParent) {
                    await session.abortTransaction()
                    return res.status(400).json({message: "parent doesn't exist"})
                }
                parentType = "Folder"
            }

            const newFolder = await Folder.create({
                author: req.user._id,
                name: name,
                parentType: parentType,
                parent: parentId},
            )

            if (parentType === "Vault") {
                const updateVault = await Vault.findByIdAndUpdate(
                    {_id: parentId},
                    {$addToSet: {folders: newFolder._id}}
                )
            } else {
                console.log("still not finished feature ")
            }

            await session.commitTransaction()

        } catch(error) {
            console.log("an error", error)
        } finally {
            session.endSession()
        }
    }
}
export default folderController;