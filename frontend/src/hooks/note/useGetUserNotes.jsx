import { getNotesRequest } from "@/api/note"
import { useQuery } from "@tanstack/react-query"

function useGetUserNotes() {

  const {data : notes, isLoading, isError, isSuccess, error, refetch} = useQuery({
    queryFn : getNotesRequest,
    queryKey: ["user-notes"],
    staleTime: 10 * 1000 * 60 // 10 minutes
  });

  return {notes, isLoading, isError, isSuccess, error, refetch};
}

export default useGetUserNotes
