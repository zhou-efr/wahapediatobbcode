import Image from 'next/image';
import tyranids from '/public/image/tyranids.png';
import NavBar from '@/components/navbar';

export default function SideBar() {
    return (
        <div className="hidden md:block md:w-1/3 lg:w-1/5 h-screen absolute top-0 left-0 bg-white">
            <div className="w-full h-full relative">
                <Image src={tyranids}
                    alt="Tyranids"
                    objectFit="contain"
                    className='w-full absolute bottom-0 left-0 object-contain z-10'
                />
                <div className="w-full h-full bg-tyranids-400 bg-opacity-30 absolute top-0 left-0 z-20" />
                <div className="w-full h-full absolute top-0 left-0 z-30 flex flex-col justify-start items-center p-10 gap-24">
                    <h1 className='text-4xl text-tyranids-500 text-center font-bold'>
                        Wahapedia to <br /> <span className='underline italic'>BBCode</span>
                    </h1>

                    <NavBar />
                </div>
            </div>
        </div>
    );
}
