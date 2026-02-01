import ky from "ky";
import { writeFile } from "fs/promises";
import { API_ENDPOINTS } from "../config/endpoints.js";
import { IPOResultResponse, CompanyShare } from "../types/index.js";

export async function check_new_ipo_results(): Promise<string[]> {
    const existing_ipo_results = (await import("../data/ipo_results.json")).default;

    const ipo_results_response = await ky.get<IPOResultResponse>(API_ENDPOINTS.ipo_result, {
        headers: {
            "cookie": "TS015186e1=01326d26f905e67f88ba344bec1354409fcc05d2214ec5a95b55daf1e380ab259045ef202aab68811e891d6190631c4ddfc161cb70; TSPD_101=08746c9c23ab280069a03d2e3177a2d9609f927b9c0d7ba3518181002e7a9737549ae62b8f848790df6449b951dd10230868231450051800ad71d977e51a92225765c3a55c6b13858cb9def730f02e70; TS17c11bf5077=08746c9c23ab28008954705629e6de5ed5695d62b4216c74d9c0d7af38d3cb4662ed3e22a030eebf59fe8ef494ddddfd089041fbf01720004eaa39d8c0cab92461e520ce4ed62d3d919c0ee804224be5662a0e5d1483cf49; TS17c11bf5029=08746c9c23ab28007d3f2643ec43a735f1eb6d7c6d65b11a40b147a5775d215f241823700a94f7a8e225ab641c4c38bb; TS1789d202027=08746c9c23ab200006fa1d38363479b6eeaf14fc2579d88e0db3096eb27fcd129e4b27aa6024ce9f08ac1e456e113000a7e97fa404095c0fbaa03d3f99480c8afda99eb812320ef68653393e4b751fe7e4917fba056f0472f1717ef3e88de2e4",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36"
        }
    }).json();

    const existing_result_names = new Set(existing_ipo_results);

    const first_five_results = ipo_results_response.body.companyShareList.slice(0, 5).map(x => x.name);

    const new_ipo_results = first_five_results.filter((result) => !existing_result_names.has(result));

    if (new_ipo_results.length > 0) {
        await writeFile(
            "src/data/ipo_results.json",
            JSON.stringify(first_five_results, null, 4)
        );
    }

    return new_ipo_results;
}
