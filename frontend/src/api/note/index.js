import axios from "@/config/axios.config";

export async function getNotesRequest(query) {
    try {
        const response = await axios.post("/notes", query, {
            headers: {
                "note-app-token": localStorage.getItem("note-app-token"),
            }
        });
        return response.data.data;
    }
    catch(err){
        throw err.response.data;
    }
}

export async function createNoteRequest(noteData) {
    try {
        const response = await axios.post("/notes/create", noteData, {
            headers: {
                "note-app-token": localStorage.getItem("note-app-token"),
            }
        })
        return response.data.data;
    }
    catch(err){
        throw err.response.data;
    }
}


export async function deleteNoteRequest(noteId) {
    try {
        const response = await axios.delete(`/notes/delete/${noteId}`, {
            headers: {
                "note-app-token": localStorage.getItem("note-app-token"),
            }
        })
        return response.data.data;
    }
    catch(err){
        throw err.response.data;
    }
}


export async function updateNoteRequest({noteId, noteData}) {
    try {
        const response = await axios.put(`/notes/update/${noteId}`, noteData, {
            headers: {
                "note-app-token": localStorage.getItem("note-app-token"),
            }
        })
        return response.data.data;
    }
    catch(err){
        throw err.response.data;
    }
}

export async function changeFavoriteStatusRequest({noteId, isFavorite = false}) {
    try {
        const response = await axios.put(`/notes/favorite/${noteId}`, {isFavorite}, {
            headers: {
                "note-app-token": localStorage.getItem("note-app-token"),
            }
        })
        return response.data.data;
    }
    catch(err){
        throw err.response.data;
    }
}