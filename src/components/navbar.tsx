'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function NavBar() {

    const pathname = usePathname();

    const paths = [
        { name: 'Convertisseur', path: '/' },
        { name: 'Données', path: '/data' },
        { name: 'Admin', path: '/admin' }
    ];

    return (
        <div className="flex flex-col gap-3">
            {paths.map((path, index) => {
                return (
                    <Link
                        key={index}
                        href={path.path}
                        className={`text-lg text-tyranids-500 ${pathname === path.path ? 'underline font-bold hover:italic' : ''} hover:underline`}
                    >
                        {path.name}
                    </Link>
                );
            })}
        </div>
    );
}