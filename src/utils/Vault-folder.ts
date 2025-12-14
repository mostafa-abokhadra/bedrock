import { Folder } from "../models/folder.model.js";

export async function getParentType(childId: any) {
    try {
        const parent = await Folder.findOne(
            {_id: childId, parentType: "Vault"}
        )
        if (parent)
            return "Vault"
        return "Folder"

    } catch(error) {
        return {message: "an error has occued", error: error}
    }
}