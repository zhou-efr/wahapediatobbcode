"use client";

import TextArea from "@/components/textarea";
import { useEffect, useState } from "react";

export default function Home() {
  const [factionList, setFactionList] = useState<Array<{ [key: string]: string }>>([]);
  const [faction, setFaction] = useState("");

  const [detachmentList, setDetachmentList] = useState<Array<{ [key: string]: string }>>([]);
  const [detachment, setDetachment] = useState("");

  const [unitList, setUnitList] = useState<Array<{ [key: string]: string }>>([]);
  const [unit, setUnit] = useState("");

  const [modelList, setModelList] = useState<Array<{ [key: string]: string }>>([]);
  const [model, setModel] = useState("");

  const [text, setText] = useState("");

  useEffect(() => {
    const loadFactions = async () => {

      const res = await fetch("/api/faction");
      if (!res.ok) {
        console.error("Error fetching factions list", res.status);
        return;
      }

      const data = await res.json();
      setFactionList(data);
    };

    loadFactions();
  }, []);

  const getDetachment = async (faction_id: string) => {
    const res = await fetch(`/api/detachement?faction_id=${faction_id}`);
    if (!res.ok) {
      console.error("Error fetching detachement list", res.status);
      return;
    }

    const data = await res.json();
    return data;
  }

  const getUnits = async (faction_id: string) => {
    const res = await fetch(`/api/unit?faction_id=${faction_id}`);
    if (!res.ok) {
      console.error("Error fetching unit list", res.status);
      return;
    }

    const data = await res.json();
    return data;
  }

  const onFactionSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFaction(e.target.value);

    if (e.target.value) {
      const detachement = await getDetachment(e.target.value);
      setDetachmentList(detachement);

      const units = await getUnits(e.target.value);
      setUnitList(units);
    }
  }

  const getModels = async (unit_id: string) => {
    const res = await fetch(`/api/model?unit_id=${unit_id}`);
    if (!res.ok) {
      console.error("Error fetching model list", res.status);
      return;
    }

    const data = await res.json();
    return data;
  }

  const onUnitSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);

    if (e.target.value) {
      const models = await getModels(e.target.value);
      setModelList(models);

      if (models.length === 1) {
        setModel(models[0].line);
      }
    }
  }

  const getStats = async (model_line: string, unit_id: string, faction_id: string, detachement_name: string) => {
    const res = await fetch(`/api/details?model_line=${model_line}&unit_id=${unit_id}&faction_id=${faction_id}&detachement_name=${detachement_name}`);
    if (!res.ok) {
      console.error("Error fetching stats", res.status);
      return;
    }

    const data = await res.json();
    return data;
  }

  const onSubmit = async () => {
    if (!faction || !detachment || !unit || !model) {
      setText(`Erreur: veuillez sélectionner ${!faction ? "une armée" : ""}${!detachment ? " un détachement" : ""}${!unit ? " une unité" : ""}${!model ? " un modèle" : ""}`);
      return;
    }
    const stats = await getStats(model, unit, faction, detachment);
    setText(JSON.stringify(stats, null, 2));
  }

  return (
    <div className="w-screen h-screen md:pl-[33%] lg:pl-[20%] bg-white dark:bg-dark-100">
      <div className="p-10 flex flex-col justify-start h-full">
        <div className="flex flex-col justify-start">
          <h1 className='text-4xl text-tyranids-500 dark:text-white font-bold'>
            Convertisseur
          </h1>
          <p className='text-2xl text-tyranids-500 dark:text-tyranids-200'>
            Créez instantanément une description à jour de vos figurines
          </p>
        </div>
        <div className="px-10 py-2 w-full border-b border-b-black dark:border-tyranids-200" />
        <section className="flex flex-col gap-8 lg:w-1/3 my-4 text-xl">
          <label className="flex flex-col gap-2">
            <span className="text-tyranids-500 dark:text-tyranids-100">Armée</span>
            <select
              className="w-full p-2 border border-tyranids-200 rounded-lg bg-white dark:bg-dark-100"
              value={faction}
              onChange={onFactionSelect}
            >
              <option value="">Sélectionnez une armée</option>
              {
                factionList.map((faction) => (
                  <option key={faction.id} value={faction.id}>{faction.name}</option>
                ))
              }
            </select>
          </label>
          {detachmentList.length > 0 && (
            <label className="flex flex-col gap-2">
              <span className="text-tyranids-500 dark:text-tyranids-100">Détachement</span>
              <select
                className="w-full p-2 border border-tyranids-200 rounded-lg bg-white dark:bg-dark-100"
                value={detachment}
                onChange={(e) => setDetachment(e.target.value)}
              >
                <option value="">Sélectionnez un détachement</option>
                {
                  detachmentList.map((detachment) => (
                    <option key={detachment.i_detachment} value={detachment.i_detachment}>{detachment.i_detachment}</option>
                  ))
                }
              </select>
            </label>
          )}
          {unitList.length > 0 && (
            <label className="flex flex-col gap-2">
              <span className="text-tyranids-500 dark:text-tyranids-100">Unité</span>
              <select
                className="w-full p-2 border border-tyranids-200 rounded-lg bg-white dark:bg-dark-100"
                value={unit}
                onChange={onUnitSelect}
              >
                <option value="">Sélectionnez une unité</option>
                {
                  unitList.map((unit) => (
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                  ))
                }
              </select>
            </label>
          )}
          {modelList.length > 1 && (
            <label className="flex flex-col gap-2">
              <span className="text-tyranids-500 dark:text-tyranids-100">Modèle</span>
              <select
                className="w-full p-2 border border-tyranids-200 rounded-lg bg-white dark:bg-dark-100"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="">Sélectionnez un modèle</option>
                {
                  modelList.map((model) => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))
                }
              </select>
            </label>
          )}
          <button
            className="w-fit px-4 py-2 bg-tyranids-500 text-white rounded-lg"
            onClick={onSubmit}
          >
            Générer
          </button>
        </section>
        <section className="flex flex-col gap-8 h-full my-4 text-xl mt-10">
          <TextArea text={text} />
        </section>
      </div>
    </div>
  );
}
