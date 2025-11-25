import {Schema, model, InferSchemaType} from "mongoose"
import { Folder, folderType } from "./folder.model.js";

const vaultScehma = new Schema({
    name: { type: String, required: true },
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    folders: [{type: Schema.Types.ObjectId, ref: "Folder"}]
}, {timestamps: true})

async function deleteFolderTree(folderId: any) {
    // find direct children
    const children = await Folder.find({parentType: 'Folder', parent: folderId})

    // recursively delete children
    for(const child of children) 
        deleteFolderTree(child._id)

    // delete this folder itself
    await Folder.deleteOne({folderId})
}

vaultScehma.index({author: 1, name: 1}, {unique: true})
export type vaultType = InferSchemaType<typeof vaultScehma>
export const Vault = model<vaultType>("Vault", vaultScehma)
