import { useMutation } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { signupRequest } from "@/api/auth";
import { getErrorMessage } from "@/lib/utilFunc";

function useSignup() {

    const { toast } = useToast();

    
    const { mutateAsync : signupMutateAsync, isLoading, error, data, isSuccess } = useMutation({
        mutationFn: signupRequest,
        onSuccess: () => {
            toast({
                title: "Successfully signed up",
                description: "You will be redirected to signin page in a few seconds",
                type: "success",
            });
        },
        onError: (error) => {
            toast({
                title: "Error signing up",
                description: getErrorMessage(error),
                type: "error",
            });
        },
    });


    return {
        signupMutateAsync,
        isLoading,
        error,
        data,
        isSuccess
    };
}

export default useSignup;