import { useNavigate } from "react-router-dom";

import { toast } from "@/hooks/use-toast";
import useAuthStore from "../store/authSore";

function useLogout() {
    const {logout} = useAuthStore();
  const navigate = useNavigate();

  function logoutFn() {
    localStorage.removeItem("note-app-token");
    localStorage.removeItem("note-app-user");
    logout();
    toast({
      description : "You have successfully loged out."
    });
    navigate("/signin");
  }

  return {
    logoutFn,
  };
}

export default useLogout;
