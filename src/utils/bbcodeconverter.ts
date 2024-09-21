type Model = {
    model: { [key: string]: string },
    abilities: Array<string>,
    wargear: Array<{ [key: string]: string }>,
    keywords: Array<string>
};

/*
{
  "model": {
    "id": "000000495",
    "line": "1",
    "name": "Exocrine",
    "M": "8\"",
    "T": "10",
    "Sv": "3+",
    "inv_sv": "-",
    "inv_sv_descr": "",
    "W": "14",
    "Ld": "8+",
    "OC": "4",
    "base_size": "120 x 92mm",
    "base_size_descr": ""
  },
  "abilities": [
    "Deadly Demise",
    "Synapse",
    null
  ],
  "wargear": [
    {
      "dice": "",
      "name": "Bio-plasmic cannon",
      "description": "blast, heavy",
      "range": "36",
      "type": "Ranged",
      "A": "D6+3",
      "BS_WS": "3",
      "S": "9",
      "AP": "-3",
      "D": "3"
    },
    {
      "dice": "",
      "name": "Powerful limbs",
      "description": "",
      "range": "Melee",
      "type": "Melee",
      "A": "3",
      "BS_WS": "3",
      "S": "7",
      "AP": "0",
      "D": "2"
    }
  ],
  "keywords": [
    "Tyranids",
    "Great Devourer",
    "Exocrine",
    "Monster"
  ]
}
*/

export function getModelBBCode(model: Model): string {
    let text = "";

    const bold = (text: string): string => { return `[b]${text}[/b]` };
    const italic = (text: string): string => { return `[i]${text}[/i]` };
    const underline = (text: string): string => { return `[u]${text}[/u]` };

    const red = (text: string): string => { return `[ff0000]${text}[-]` };
    const blue = (text: string): string => { return `[6699ff]${text}[-]` };

    text += red(bold(model.model.name)) + "\n";
    text += underline("stats") + "\n";
    text += `M: ${model.model.M} T: ${model.model.T} Sv: ${model.model.Sv} W: ${model.model.W} Ld: ${model.model.Ld} OC: ${model.model.OC}\n`;

    text += blue(underline("Ranged weapons")) + "\n";
    for (const wargear of model.wargear) {
        if (wargear.type === "Ranged") {
            text += `${bold(wargear.name)}: ${wargear.description}` + "\n";
            text += `Range: ${wargear.range} A: ${wargear.A} BS: ${wargear.BS_WS} S: ${wargear.S} AP: ${wargear.AP} D: ${wargear.D}` + "\n";
        }
    }

    text += blue(underline("Melee weapons")) + "\n";
    for (const wargear of model.wargear) {
        if (wargear.type === "Melee") {
            text += `${bold(wargear.name)}: ${wargear.description}` + "\n";
            text += `Range: ${wargear.range} A: ${wargear.A} WS: ${wargear.BS_WS} S: ${wargear.S} AP: ${wargear.AP} D: ${wargear.D}` + "\n";
        }
    }

    text += blue(underline("Abilities")) + "\n";
    for (const ability of model.abilities) {
        if (ability) {
            text += `${italic(ability)}` + ", ";
        }
    }

    text += blue(underline("Keywords")) + "\n";
    for (const keyword of model.keywords) {
        text += `${bold(keyword)}` + ", ";
    }

    return text;
}