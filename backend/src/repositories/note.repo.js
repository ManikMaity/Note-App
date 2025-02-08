import noteModel from "../schemas/note.schema.js";
import crudFunctions from "./crud.repo.js";


const noteRepo = {
    ...crudFunctions(noteModel)
}

export default noteRepo;