import ky from "ky";
import { API_ENDPOINTS } from "../config/endpoints.js";

export default ky.create({ prefixUrl: API_ENDPOINTS.telegram })