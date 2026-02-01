import { Bot } from "./telegram_bot.js";
import { ENV } from "../config/ENV.js";

export async function handle_error(error: any, context: string) {
    console.error(`\n=== Error in ${context} ===`);
    console.error("Error:", error.message);

    let error_details = `❌ Error in ${context}\n\nMessage: ${error.message}`;

    if (error.response) {
        try {
            const error_body = await error.response.json();
            console.error("Response:", error_body);
            error_details += `\n\nResponse: ${JSON.stringify(error_body, null, 2)}`;
        } catch {
            console.error("Response status:", error.response.status);
            error_details += `\n\nStatus: ${error.response.status}`;
        }
    }

    if (error.stack) {
        console.error("Stack:", error.stack);
    }

    // Send error to admin
    try {
        await Bot.sendMessage(Number(ENV.ADMIN), error_details);
    } catch (notification_error) {
        console.error("Failed to send error notification to admin:", notification_error);
    }
}
