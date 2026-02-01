import ky from "./ky.js"

class TelegramBot {
    async sendMessage(chat_id: number, text: string) {
        return ky.post('sendMessage', {
            json: {
                chat_id,
                text,
                parse_mode: 'HTML',
            }
        }).json();
    }
}

export const Bot = new TelegramBot();