import {Route, Routes} from "react-router-dom";
import SignupPage from "./auth/signup";
import HomePage from "./Home/HomePage";
import AuthLayout from "./auth/AuthLayout";
import SigninPage from "./auth/SigninPage";


export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<AuthLayout><SignupPage/></AuthLayout>} />
            <Route path="/signin" element={<AuthLayout><SigninPage/></AuthLayout>} />
        </Routes>
    )
}