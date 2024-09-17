'use client'

import { useRef } from "react"

export default function TextArea({ text }: { text: string }) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleCopy = () => {
        textAreaRef.current?.select()
        textAreaRef.current?.setSelectionRange(0, 99999)
        navigator?.clipboard?.writeText(textAreaRef.current?.value || '')
    }

    return (
        <div className="relative h-full">
            <div className="flex flex-col justify-between overflow-hidden h-full rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <label htmlFor="description" className="sr-only">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={2}
                    ref={textAreaRef}
                    placeholder="Write a description..."
                    className="block w-full flex-grow resize-none border-0 text-gray-900 dark:text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 bg-white dark:bg-dark-100 p-3"
                    defaultValue={text}
                // disabled
                />

                {/* Spacer element to match the height of the toolbar */}
                {/* <div aria-hidden="true">
                    <div className="h-px" />
                    <div className="py-2">
                        <div className="py-px">
                            <div className="h-9" />
                        </div>
                    </div>
                </div> */}

                <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                    <div className="flex flex-row justify-end w-full">
                        <button onClick={handleCopy} className="inline-flex items-center rounded-md bg-tyranids-500 px-3 py-2 text-sm font-semibold text-white *:shadow-sm hover:bg-tyranids-300">
                            Copier
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="absolute inset-x-px bottom-0">
                <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                    <div className="flex flex-row justify-end w-full">
                        <button className="inline-flex items-center rounded-md bg-tyranids-500 px-3 py-2 text-sm font-semibold text-white *:shadow-sm hover:bg-tyranids-300">
                            Copier
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
