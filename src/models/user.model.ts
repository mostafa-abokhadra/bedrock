import {Schema, model, InferSchemaType} from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    vaults: [{type: Schema.Types.ObjectId, ref: "Vault"}]
}, {timestamps: true})
export type UserType = InferSchemaType<typeof userSchema>
export const User = model<UserType>("User", userSchema)