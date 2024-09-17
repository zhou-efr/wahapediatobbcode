import { datasheets_url } from "@/utils/wahapediaroutes";

export async function GET(Request: Request): Promise<Response> {
    // get factions list from datasheets_url (url to a csv file)
    const res = await fetch(datasheets_url);

    if (!res.ok) {
        return new Response("Error fetching factions list", { status: res.status });
    }

    // get faction parameters from query string
    const url = new URL(Request.url);
    const faction_id = url.searchParams.get("faction_id");

    // UTF-8 encoding
    // "|" separator
    // first line is a header
    // id|name|faction_id|source_id|legend|role|loadout|transport|virtual|leader_head|leader_footer|damaged_w|damaged_description|link|
    // save id|name|faction_id
    const text = await res.text();
    const lines = text.split("\n");
    const data: Array<{ [key: string]: string }> = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split("|");
        const i_faction_id = columns[2];

        if (i_faction_id === faction_id) {
            data.push({
                id: columns[0],
                name: columns[1],
                faction_id: i_faction_id
            });
        }
    }

    // sort by name
    data.sort((a, b) => a?.name?.localeCompare(b?.name));

    return Response.json(data);
}