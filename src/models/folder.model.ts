import { model, Schema, InferSchemaType } from "mongoose";

const folderSchema = new Schema({
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, required: true, refPath: "parentType"},
    parentType: {type: String, required: true, enum: ["Vault", "Folder"]},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true})
folderSchema.index({parent: 1, parentType: 1, name: 1}, {unique: true})
export type folderType = InferSchemaType<typeof folderSchema>
export const Folder = model<folderType>("Folder", folderSchema)