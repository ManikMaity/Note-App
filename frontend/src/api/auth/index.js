import axios from "@/config/axios.config";


export async function signupRequest({email, password}) {
    try {
        const response = await axios.post("/user/signup", {
            email,
            password
        });
        return response.data;
    }
    catch (error) {
        throw error.response.data;
    }
}

export async function signinRequest({email, password}) {
    try {
        const response = await axios.post("/user/signin", {
            email,
            password
        });
        return response.data.data;

    }
    catch (error) {
        throw error.response.data;
    }
}