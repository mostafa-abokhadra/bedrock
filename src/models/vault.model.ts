import {Schema, model, InferSchemaType} from "mongoose"
import { Folder } from "./folder.model.js";

const vaultScehma = new Schema({
    name: { type: String, required: true },
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    folders: [{type: Schema.Types.ObjectId, ref: "Folder"}]
}, {timestamps: true})

async function deleteFolderTree(folderId: any, session: any) {
    // find direct children
    const children = await Folder.find(
        {parentType: 'Folder', parent: folderId}, null, {session})

    // recursively delete children
    for(const child of children) 
        deleteFolderTree(child._id, session)

    // delete this folder itself
    await Folder.deleteOne({ _id: folderId}, {session})
    console.log("deleting", folderId)
}

vaultScehma.post("findOneAndDelete", async function (doc){
    if (!doc) return;

    const session = this.getOptions()?.session
console.log("the doc", doc)
    const directFolderChildren = await Folder.find(
        {parent: doc._id, parentType: 'Vault'}, null, {session})
console.log(`direcet children are: ${directFolderChildren}`)

    for (const child of directFolderChildren) {
        console.log("got here too") 
        await deleteFolderTree(child._id, session)
    }
})
vaultScehma.index({author: 1, name: 1}, {unique: true})
export type vaultType = InferSchemaType<typeof vaultScehma>
export const Vault = model<vaultType>("Vault", vaultScehma)
