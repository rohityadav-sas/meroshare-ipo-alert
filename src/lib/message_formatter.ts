import { IPO } from "../types/index.js";

export function format_ipo_message(ipo: IPO): string {
    return (
        `🔔 <b>NEW ${ipo.shareTypeName} ALERT</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `<b>🏢 ${ipo.companyName}</b>\n\n` +
        `📊 <b>Share Details:</b>\n` +
        `     • <b>Type</b>: <code>${ipo.shareTypeName}</code>\n` +
        `     • <b>Group</b>: <code>${ipo.shareGroupName}</code>\n` +
        `     • <b>Category</b>: <code>${ipo.subGroup}</code>\n\n` +
        `⏰ <b>Timeline:</b>\n` +
        `     • <b>Opens</b>:  <code>${ipo.issueOpenDate}</code>\n` +
        `     • <b>Closes</b>: <code>${ipo.issueCloseDate}</code>\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `💬 <i>Share this with fellow investors</i>`
    );
}

export function format_ipo_result_message(result_name: string): string {
    return (
        `🎊 <b>IPO RESULT PUBLISHED</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `<b>🏢 ${result_name}</b>\n\n` +
        `🔍 View IPO Result: ` +
        `👉 <a href="https://iporesult.cdsc.com.np/">Result</a>\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🍀 <i>Best of luck to all applicants!</i>`
    );
}
