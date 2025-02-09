import noteModel from "../schemas/note.schema.js";
import crudFunctions from "./crud.repo.js";


const noteRepo = {
    ...crudFunctions(noteModel),
    getUserNotesByUserId : async function (query, sortOption) {
        const notes = await noteModel.find(query).sort(sortOption);
        return notes;
    }
}

export default noteRepo;