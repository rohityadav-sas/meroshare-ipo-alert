import ky from "ky";
import { writeFile } from "fs/promises";
import { API_ENDPOINTS } from "../config/endpoints.js";
import { IPOResponse, IPO } from "../types/index.js";

export async function check_new_ipos(auth_headers: Headers): Promise<IPO[]> {
    const existing_ipos = (await import("../data/ipo.json")).default;
    const applicable_ipos_response = await ky
        .post<IPOResponse>(API_ENDPOINTS.ipo, {
            headers: {
                authorization: auth_headers.get("authorization") || "",
            },
            json: {
                filterFieldParams: [
                    { key: "companyIssue.companyISIN.script", alias: "Scrip" },
                    { key: "companyIssue.companyISIN.company.name", alias: "Company Name" },
                    { key: "companyIssue.assignedToClient.name", value: "", alias: "Issue Manager" },
                ],
                page: 1,
                size: 10,
                searchRoleViewConstants: "VIEW_APPLICABLE_SHARE",
                filterDateParams: [
                    { key: "minIssueOpenDate", condition: "", alias: "", value: "" },
                    { key: "maxIssueCloseDate", condition: "", alias: "", value: "" },
                ],
            },
        })
        .json();

    const applicable_ipos = applicable_ipos_response.object.map((ipo) => ({
        subGroup: ipo.subGroup,
        companyName: ipo.companyName,
        shareTypeName: ipo.shareTypeName,
        shareGroupName: ipo.shareGroupName,
        issueOpenDate: ipo.issueOpenDate,
        issueCloseDate: ipo.issueCloseDate,
    }));

    const existing_ipo_keys = new Set(existing_ipos.map((ipo) => JSON.stringify(ipo)));

    const new_ipos = applicable_ipos.filter(
        (ipo) => !existing_ipo_keys.has(JSON.stringify(ipo))
    );

    if (new_ipos.length > 0) {
        const updated_ipos = [...new_ipos, ...existing_ipos].slice(0, 5);
        await writeFile(
            "src/data/ipo.json",
            JSON.stringify(updated_ipos, null, 4)
        );
    }

    return new_ipos;
}
