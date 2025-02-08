import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    unformatedContent : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    transcribedText: {
        type: String,
        default: '',
    },
    audioUrl: {
        type: String,
        default: null
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },

    imageUrls: {
        type: [String],
        default: [],
    },
    type : {
        type : String,
        enum : ['text', 'transcript'],
        default : 'text'
    }
}, {timestamps : true});


const noteModel = model('Note', noteSchema);

export default noteModel;