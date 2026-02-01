import { ENV } from "./ENV.js";

export const API_ENDPOINTS = {
    login: 'https://webbackend.cdsc.com.np/api/meroShare/auth',
    ipo: 'https://webbackend.cdsc.com.np/api/meroShare/companyShare/applicableIssue/',
    ipo_result: 'https://iporesult.cdsc.com.np/result/companyShares/fileUploaded',
    telegram: `https://api.telegram.org/bot${ENV.BOT_TOKEN}`
}