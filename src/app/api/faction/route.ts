import { faction_url } from "@/utils/wahapediaroutes";

export async function GET() {
    // get factions list from faction_url (url to a csv file)
    const res = await fetch(faction_url);

    if (!res.ok) {
        return new Response("Error fetching factions list", { status: res.status });
    }

    // UTF-8 encoding
    // "|" separator
    // first line is a header
    // id | name | url
    const text = await res.text();
    const lines = text.split("\n");
    const header = lines[0].split("|");
    const data = lines.slice(1).map(line => {
        const values = line.split("|");
        return header.reduce((acc: { [key: string]: string }, key, i) => {
            if (i > 1) return acc;
            acc[key] = values[i];
            return acc;
        }, {});
    });

    // sort by name
    data.sort((a, b) => a?.name?.localeCompare(b?.name));

    return Response.json(data);
}