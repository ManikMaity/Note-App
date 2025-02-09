import { updateNoteRequest } from "@/api/note"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "../use-toast"

function useUpdateNote() {

    const queryClient = useQueryClient();
    
    const {mutateAsync : updateNoteMutateAsync, isPending : updateNoteLoading} = useMutation({
        mutationFn : updateNoteRequest,
        onSuccess : (data) => {
            toast({
                description : "Successfully updated note"
            })
            queryClient.invalidateQueries(["user-notes"]);
        },
        onError : () => {
            toast({
                description : "Failed to update note"
            })
        }
    })


    return {
        updateNoteMutateAsync,
        updateNoteLoading
    }

}

export default useUpdateNote
