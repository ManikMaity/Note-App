import { changeFavoriteStatusRequest } from "@/api/note"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "../use-toast"

function useChangeFavorite() {
    const queryClient = useQueryClient();
  const {mutateAsync : changeFavoriteStatusMutateAsync} = useMutation({
    mutationFn : changeFavoriteStatusRequest,
    onSuccess : () => {
        toast({
            description : "Successfully changed favorite status"
        })
        queryClient.invalidateQueries(["user-notes"]);
    },
    onError : () => {
        toast({
            description : "Failed to change favorite status"
        })
    }
  });


  return {changeFavoriteStatusMutateAsync};
}

export default useChangeFavorite
