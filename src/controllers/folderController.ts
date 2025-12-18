import { Vault } from "../models/vault.model.js";
import { Folder } from "../models/folder.model.js";
import mongoose from "mongoose";
import { getParentType } from "../utils/Vault-folder.js";

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

    static async deleteFolder(req: any, res: any) {
        const session = await mongoose.startSession()
        try {
            const {folderId} = req.body

            const folderToDelete = await Folder.findOne({author: req.user._id, _id: folderId})
            if (!folderToDelete)
                return res.status(400).json({"message": "folder doesn't exist"})

            session.startTransaction()

            await Folder.findOneAndDelete(
                {_id: folderId, author: req.user._id}, {session}
            )
            const result = await getParentType(folderId)

            if (result!== null && typeof result === "object") {
                session.abortTransaction()
                return res.status(500).json(result)
            }
            if (result === "Folder") {
                await Folder.findByIdAndUpdate(
                    {_id: folderToDelete.parent},
                    {$pull: {folders: folderId}},
                    {session}
                )
            } else {
                await Vault.findByIdAndUpdate(
                    {_id: folderToDelete.parent},
                    {$pull: {folders: folderId}},
                    {session}
                )
            }

            await session.commitTransaction()

            return res.status(200).json({message: "folder has been deleted successfully"})
        } catch(error) {
            console.log("an error", error)
            return res.status(500).json({ message: "an error has occured", error: error })
        } finally {
            session.endSession()
        }
    }
    static async getFolders(req: any, res: any) {
        try {
            const folders = await Folder.find({author: req.user._id})
            if (folders.length === 0)
                return res.status(200).json({message: "user has no folders"})
            return res.status(200).json(
                {message: "folders retreived successfully", folders: folders}
            )
        } catch(error) {
            console.log("an error", error)
            return res.status(500).json({message: "a server error has occured"})
        }
    }
}
export default folderController;