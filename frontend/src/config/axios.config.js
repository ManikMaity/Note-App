import axios from "axios";
import { BACKEND_URL } from "./client.config";

export default axios.create({
    baseURL: `${BACKEND_URL}/api/v1`,
    credentials: true,
    withCredentials: true
});

