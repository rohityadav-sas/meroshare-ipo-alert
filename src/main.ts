import { handle_error } from "./lib/error_handler.js";
import { get_auth_headers } from "./services/auth.js";
import { check_new_ipos } from "./services/ipo_checker.js";
import { check_new_ipo_results } from "./services/ipo_result_checker.js";
import { format_ipo_message, format_ipo_result_message } from "./lib/message_formatter.js";
import { Bot } from "./lib/telegram_bot.js";
import { ENV } from "./config/ENV.js";

async function main() {
    try {
        const auth_headers = await get_auth_headers();

        await Promise.all([
            check_new_ipos(auth_headers).then(async new_ipos => {
                console.log('New IPOs:', new_ipos);
                for (const ipo of new_ipos) {
                    const message = format_ipo_message(ipo);
                    await Bot.sendMessage(ENV.CHANNEL, message);
                }
            }),
            check_new_ipo_results().then(async new_ipo_results => {
                console.log('New IPO Results:', new_ipo_results);
                for (const result of new_ipo_results) {
                    const message = format_ipo_result_message(result);
                    await Bot.sendMessage(ENV.CHANNEL, message);
                }
            })
        ]);

    } catch (error: any) {
        await handle_error(error, "Main Process");
        process.exit(1);
    }
}

main();
