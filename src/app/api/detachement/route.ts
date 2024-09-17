import { detachement_abilities_url } from "@/utils/wahapediaroutes";

export async function GET(Request: Request): Promise<Response> {
    // get factions list from detachement_abilities_url (url to a csv file)
    const res = await fetch(detachement_abilities_url);

    if (!res.ok) {
        return new Response("Error fetching factions list", { status: res.status });
    }

    // get faction parameters from query string
    const url = new URL(Request.url);
    const faction_id = url.searchParams.get("faction_id");

    // UTF-8 encoding
    // "|" separator
    // first line is a header
    // id|faction_id|name|legend|description|detachment|
    // save faction_id | detachment
    // remove duplicates
    const text = await res.text();
    const lines = text.split("\n");
    const data: Array<{ [key: string]: string }> = [];
    const temp_detachment: Array<string> = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split("|");
        const i_faction_id = columns[1];
        const i_detachment = columns[5];

        if (i_faction_id === faction_id && !temp_detachment.includes(i_detachment)) {
            data.push({
                i_faction_id,
                i_detachment
            });
        }

        temp_detachment.push(i_detachment);
    }

    return Response.json(data);
}