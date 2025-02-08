import useAuthStore from "@/hooks/store/authSore"
import { toast } from "@/hooks/use-toast";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const {user, token} = useAuthStore();
  if (user && token) {
    return <Outlet/>
  }
  else {
    toast({
      title: "Unauthorized",
      description: "You are not logged in",
    })
    return <Navigate to={"/signin"}/>
  }
}

export default PrivateRoute
