import { model, Schema, InferSchemaType } from "mongoose";

const folderSchema = new Schema({
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, required: true, refPath: "parentType"},
    parentType: {type: String, required: true, enum: ["Vault", "Folder"]},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    folders: [{type: Schema.Types.ObjectId, ref: "Folder"}]
}, {timestamps: true})

async function deleteFolderTree(folderId: any, session: any) {
    const children = await Folder.find(
        {_id: folderId},
        null, {session}
    )

    for (const child of children)
        deleteFolderTree(child._id, session)

    await Folder.deleteOne({_id: folderId}, {session})
}
folderSchema.post("findOneAndDelete", async function (doc) {
    if (!doc) return;

    const session = this.getOptions()?.session

    const children = await Folder.find(
        {parent: doc._id, parentType: "Folder"},
        null,
        session
    )

    for (const child of children)
        await deleteFolderTree(child._id, session)
})

folderSchema.index({parent: 1, parentType: 1, name: 1}, {unique: true})
export type folderType = InferSchemaType<typeof folderSchema>
export const Folder = model<folderType>("Folder", folderSchema)