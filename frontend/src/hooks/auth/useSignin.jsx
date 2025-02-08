import { useMutation } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { signinRequest } from "@/api/auth";
import { getErrorMessage } from "@/lib/utilFunc";
import useAuthStore from "../store/authSore";



function useSignin() {

  const { toast } = useToast();
  const {login} = useAuthStore();


  const {data, mutateAsync : signinMutateAsync, isError, isLoading, isSuccess, error} = useMutation({
    mutationFn : signinRequest,
    onSuccess : (data) => {
       console.log(data);
        toast({
            title: "Signined in Successfully",
            description: "You will be redirected to home page in a few seconds",
            type: "success",
        });
        localStorage.setItem("note-app-token", data.token);
        localStorage.setItem("note-app-user", JSON.stringify(data));
        login(data, data.token);
    },
    onError : (error) => {
        toast({
            title: "Error while signing",
            description: getErrorMessage(error),
            type: "error",
        });
    }
  });


  return {
    data,
    signinMutateAsync,
    isError, 
    isLoading,
    error,
    isSuccess
  };
}

export default useSignin;