import { Vault } from "../models/vault.model.js";
import { Folder } from "../models/folder.model.js";
import mongoose from "mongoose";

class folderController {
    static async createFolder (req: any, res: any) {

        const {name, parentId} = req.body
        let parentType = 'Vault';
        let folderParent = null;

        const session = await mongoose.startSession()

        try {

            session.startTransaction()

            const vaultParent = await Vault.findOne({author: req.user._id, _id: parentId })

            if (!vaultParent) {
                folderParent = await Folder.findOne({author: req.user._id, _id: parentId})
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
                await Vault.findByIdAndUpdate(
                    {_id: parentId},
                    {$addToSet: {folders: newFolder._id}}
                )
            } else {
                await Folder.findByIdAndUpdate(
                    {_id: parentId},
                    {$addToSet: {folders: newFolder._id}}
                )
            }

            await session.commitTransaction()

            return res.status(201).json({message: "folder has been created successfully", folder: newFolder})
        } catch(error: any) {
            console.log("an error", error)
            return res.status(500).json({message: "an error has occured, check the logs"})
        } finally {
            session.endSession()
        }
    }
}
export default folderController;