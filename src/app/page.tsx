// import Image from "next/image";

import TextArea from "@/components/textarea";

export default function Home() {
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
            <select className="w-full p-2 border border-tyranids-200 rounded-lg bg-white dark:bg-dark-100">
              <option>Space Marines</option>
              <option>Orks</option>
              <option>Tyranids</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-tyranids-500 dark:text-tyranids-100">Faction</span>
            <select className="w-full p-2 border border-tyranids-200 rounded-lg bg-white dark:bg-dark-100">
              <option>Space Marines</option>
              <option>Orks</option>
              <option>Tyranids</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-tyranids-500 dark:text-tyranids-100">Unité</span>
            <select className="w-full p-2 border border-tyranids-200 rounded-lg bg-white dark:bg-dark-100">
              <option>Space Marines</option>
              <option>Orks</option>
              <option>Tyranids</option>
            </select>
          </label>
          <button className="w-fit px-4 py-2 bg-tyranids-500 text-white rounded-lg">
            Générer
          </button>
        </section>
        <section className="flex flex-col gap-8 h-full my-4 text-xl mt-10">
          <TextArea />
        </section>
      </div>
    </div>
  );
}
