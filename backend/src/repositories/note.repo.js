import noteModel from "../schemas/note.schema.js";
import crudFunctions from "./crud.repo.js";


const noteRepo = {
    ...crudFunctions(noteModel),
    getUserNotesByUserId : async function (userId) {
        const notes = await noteModel.find({ user : userId });
        return notes;
    }
}

export default noteRepo;