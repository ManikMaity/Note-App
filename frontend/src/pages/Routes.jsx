import {Route, Routes} from "react-router-dom";
import SignupPage from "./auth/Signup";
import HomePage from "./Home/HomePage";
import AuthLayout from "./auth/AuthLayout";
import SigninPage from "./auth/SigninPage";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "@/components/organisms/MainLayout";


export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/signup" element={<AuthLayout><SignupPage/></AuthLayout>} />
            <Route path="/signin" element={<AuthLayout><SigninPage/></AuthLayout>} />
            <Route element={<PrivateRoute/>}>
                <Route path="/" element={<MainLayout><HomePage/></MainLayout>} />
                <Route path="/favorites" element={<MainLayout><HomePage/></MainLayout>} />
            </Route>
        </Routes>
    )
}