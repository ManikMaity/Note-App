import {z} from 'zod';


export const createNoteSchema = z.object({
    title: z.string({
        required_error: 'title is required',
        invalid_type_error: 'title must be a string'
    }).min(3, 'title must be at least 3 characters').max(100, 'title must be at most 100 characters'),
    content: z.string({
        required_error: 'content is required',
        invalid_type_error: 'content must be a string'
    }).min(3, 'content must be at least 3 characters'),
    unformatedContent: z.string({
        required_error: 'unformatedContent is required',
        invalid_type_error: 'unformatedContent must be a string'
    }).min(1, 'unformatedContent must be at least 1 characters'),
    audioUrl: z.string().optional(),
    transcribedText: z.string().optional(),
    isFavorite: z.boolean().default(false),
    imageUrls: z.array(z.string()).optional(),
    type : z.string().optional()
});

export const updateNoteSchema = z.object({
    title: z.string({
        required_error: 'title is required',
        invalid_type_error: 'title must be a string'
    }).min(3, 'title must be at least 3 characters').max(100, 'title must be at most 100 characters'),
    content: z.string({
        required_error: 'content is required',
        invalid_type_error: 'content must be a string'
    }).min(3, 'content must be at least 3 characters'),
    unformatedContent: z.string({
        required_error: 'unformatedContent is required',
        invalid_type_error: 'unformatedContent must be a string'
    }).min(1, 'unformatedContent must be at least 1 characters'),
    isFavorite: z.boolean().optional(),
    imageUrls: z.array(z.string()).optional(),
});