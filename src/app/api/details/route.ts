import { abilities_url, datasheets_abilities_url, datasheets_keywords_url, datasheets_models_url, datasheets_wargear_url } from "@/utils/wahapediaroutes";

const getModel = async (model_line: string, unit_id: string): Promise<{ [key: string]: string }> => {
    const res = await fetch(datasheets_models_url);

    if (!res.ok) {
        return { error: "Error fetching model" };
    }

    // datasheet_id|line|name|M|T|Sv|inv_sv|inv_sv_descr|W|Ld|OC|base_size|base_size_descr|
    const text = await res.text();
    const lines = text.split("\n");

    const data: { [key: string]: string } = {};

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split("|");
        const i_line = columns[1];
        const i_unit_id = columns[0];

        if (i_line === model_line && i_unit_id === unit_id) {
            data["id"] = columns[0];
            data["line"] = i_line;
            data["name"] = columns[2];
            data["M"] = columns[3];
            data["T"] = columns[4];
            data["Sv"] = columns[5];
            data["inv_sv"] = columns[6];
            data["inv_sv_descr"] = columns[7];
            data["W"] = columns[8];
            data["Ld"] = columns[9];
            data["OC"] = columns[10];
            data["base_size"] = columns[11];
            data["base_size_descr"] = columns[12];
        }
    }

    return data;
}

const getAbilities = async (unit_id: string): Promise<Array<string>> => {
    // datasheet_id|line|ability_id|model|name|description|type|parameter|
    const datasheets_abilities_res = await fetch(datasheets_abilities_url);
    // id|name|legend|faction_id|description|
    const abilities_res = await fetch(abilities_url);

    if (!datasheets_abilities_res.ok || !abilities_res.ok) {
        return [];
    }

    const datasheets_abilities = ((await datasheets_abilities_res.text()).split("\n")).map((line) => line.split("|"));
    const abilities = ((await abilities_res.text()).split("\n")).map((line) => line.split("|"));

    const getAbilityName = (ability_id: string): string => {
        for (let i = 1; i < abilities.length; i++) {
            if (abilities[i][0] === ability_id) {
                return abilities[i][1];
            }
        }
        return "";
    }

    // array of abilities names
    const data: Array<string> = [];

    for (let i = 1; i < datasheets_abilities.length; i++) {
        if (datasheets_abilities[i][0] === unit_id) {
            data.push(getAbilityName(datasheets_abilities[i][2]));
        }
    }

    return data;
}

const getWargear = async (unit_id: string): Promise<Array<{ [key: string]: string }>> => {
    // datasheet_id|line|line_in_wargear|dice|name|description|range|type|A|BS_WS|S|AP|D|
    const res = await fetch(datasheets_wargear_url);

    if (!res.ok) {
        return [];
    }

    const text = await res.text();
    const lines = text.split("\n");

    const data: Array<{ [key: string]: string }> = [];

    const filter_description = (description: string): string => {
        // <a href="/wh40k10ed/the-rules/core-rules/#Anti">anti-infantry 4+</a> to anti-infantry 4+
        return description.replace(/<a href="(.*?)">/g, "").replace(/<\/a>/g, "");
    }

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split("|");
        const i_datasheet_id = columns[0];

        if (i_datasheet_id === unit_id) {
            data.push({
                dice: columns[3],
                name: columns[4],
                description: filter_description(columns[5]),
                range: columns[6],
                type: columns[7],
                A: columns[8],
                BS_WS: columns[9],
                S: columns[10],
                AP: columns[11],
                D: columns[12]
            });
        }
    }

    return data;
}

const getKeywords = async (unit_id: string): Promise<Array<string>> => {
    // datasheet_id|keyword|model|is_faction_keyword|
    const res = await fetch(datasheets_keywords_url);

    if (!res.ok) {
        return [];
    }

    const text = await res.text();
    const lines = text.split("\n");

    const data: Array<string> = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split("|");
        const i_datasheet_id = columns[0];

        if (i_datasheet_id === unit_id && columns[3]) {
            data.push(columns[1]);
        }
    }

    return data;
}


export async function GET(Request: Request): Promise<Response> {
    // get faction parameters from query string
    const url = new URL(Request.url);
    const faction_id = url.searchParams.get("faction_id");
    const detachement_name = url.searchParams.get("detachement_name");
    const unit_id = url.searchParams.get("unit_id");
    const model_line = url.searchParams.get("model_line");

    if (!model_line || !unit_id || !faction_id || !detachement_name) {
        return new Response(`Error: missing parameters: ${!model_line ? "model_line " : ""}${!unit_id ? "unit_id " : ""}${!faction_id ? "faction_id " : ""}${!detachement_name ? "detachement_name " : ""}`, { status: 400 });
    }

    const data: {
        model: { [key: string]: string },
        abilities: Array<string>,
        wargear: Array<{ [key: string]: string }>,
        keywords: Array<string>
    } = {
        model: {},
        abilities: [],
        wargear: [],
        keywords: []
    };

    const model = await getModel(model_line, unit_id);
    if (model.error) return new Response("Error fetching model", { status: 500 });
    data["model"] = model;

    const abilities = await getAbilities(unit_id);
    data["abilities"] = abilities;

    const wargear = await getWargear(unit_id);
    data["wargear"] = wargear;

    const keywords = await getKeywords(unit_id);
    data["keywords"] = keywords;

    return Response.json(data);
}