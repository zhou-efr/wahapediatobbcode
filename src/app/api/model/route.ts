import { datasheets_models_url } from "@/utils/wahapediaroutes";

export async function GET(Request: Request): Promise<Response> {
    // get unit parameters from query string
    const url = new URL(Request.url);
    const unit_id = url.searchParams.get("unit_id");

    if (!unit_id) {
        return new Response("Error: missing unit_id", { status: 400 });
    }

    // get factions list from datasheets_url (url to a csv file)
    const res = await fetch(datasheets_models_url);

    if (!res.ok) {
        return new Response("Error fetching model list", { status: res.status });
    }

    // UTF-8 encoding
    // "|" separator
    // first line is a header
    // datasheet_id|line|name|M|T|Sv|inv_sv|inv_sv_descr|W|Ld|OC|base_size|base_size_descr|
    // save datasheet_id|line|name
    const text = await res.text();
    const lines = text.split("\n");
    const data: Array<{ [key: string]: string }> = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split("|");
        const i_unit_id = columns[0];

        if (i_unit_id === unit_id) {
            data.push({
                id: columns[0],
                line: columns[1],
                name: columns[2]
            });
        }
    }

    return Response.json(data);
}