import { enhancements_url } from "@/utils/wahapediaroutes";

export async function GET(Request: Request): Promise<Response> {
    // get factions list from detachement_abilities_url (url to a csv file)
    const res = await fetch(enhancements_url);

    if (!res.ok) {
        return new Response("Error fetching enhancement list", { status: res.status });
    }

    // get faction parameters from query string
    const url = new URL(Request.url);
    const detachment = url.searchParams.get("detachment");

    // UTF-8 encoding
    // "|" separator
    // first line is a header
    // id|faction_id|name|legend|description|detachment|
    // save faction_id | detachment
    // remove duplicates
    const text = await res.text();
    const lines = text.split("\n");
    const data: Array<{ [key: string]: string }> = [];
    const temp_enhancement: Array<string> = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split("|");
        const i_enhancement = columns[2];
        const i_detachment = columns[4];

        if (i_detachment === detachment && !temp_enhancement.includes(i_enhancement)) {
            data.push({
                i_enhancement,
                i_detachment
            });
        }

        temp_enhancement.push(i_detachment);
    }

    return Response.json(data);
}