import ky from "ky";
import { API_ENDPOINTS } from "../config/endpoints.js";
import { ENV } from "../config/ENV.js";

export async function get_auth_headers() {
    const { headers } = await ky.post(API_ENDPOINTS.login, {
        json: {
            username: ENV.USER,
            password: ENV.PASSWORD,
            clientId: ENV.CLIENT_ID,
        },
    });
    return headers;
}
