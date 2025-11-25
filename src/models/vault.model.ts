import {Schema, model, InferSchemaType} from "mongoose"

const vaultScehma = new Schema({
    name: { type: String, required: true },
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    folders: [{type: Schema.Types.ObjectId, ref: "Folder"}]
}, {timestamps: true})

vaultScehma.index({author: 1, name: 1}, {unique: true})
export type vaultType = InferSchemaType<typeof vaultScehma>
export const Vault = model<vaultType>("Vault", vaultScehma)
