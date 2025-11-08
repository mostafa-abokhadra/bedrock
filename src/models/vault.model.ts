import {Schema, model, InferSchemaType} from "mongoose"

const vaultScehma = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {type: Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true})

export type vaultType = InferSchemaType<typeof vaultScehma>
export const Vault = model<vaultType>("Vault", vaultScehma)