import { useContext, useEffect } from "react";
import { cartContext } from "../../state/cartProvider";
import { useNavigate } from "react-router-dom";
import FilePrintProperties from "./file_properties";

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


function Header() {
    return (
        <li className="grid grid-cols-5 justify-items-center border border-black font-bold p-3 text-lg mb-1">
            <p>File Name</p>
            <p>Number of Copies</p>
            <p>Sheet Size</p>
            <p>Number of Pages</p>
            <p>Price</p>
        </li>
    )
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function SelectRepo() {

    let reprographies = ['Auto (Based of queue)', 'AS-Repro', 'AG-Repro', 'Mech-Repro', 'Office-Repro']

    const [selected, setSelected] = useState(reprographies[0])

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-fit cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                                {/* <img src={selected.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" /> */}
                                <span className="ml-3 block truncate">{selected}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {reprographies.map((repro, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={repro}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {repro}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}



function NewOrderCheckout() {

    const { cart, setCart } = useContext(cartContext);
    const [useCredits, setUseCredits] = useState(true);
    const navigate = useNavigate();

    console.log(cart);

    useEffect(() => {
        if (!cart.length) {
            return navigate('/files');
        }
    })

    let filePropertiesSelector = cart.map(file => <FilePrintProperties key={file} file={file} />)



    return (
        <div className="my-10">
            <Header />
            {filePropertiesSelector}
            <div className="my-8 grid grid-cols-3 justify-between items-center">
                <div className="justify-self-start">
                    <SelectRepo />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" className="w-5 mx-2" checked={useCredits} onChange={() => setUseCredits(!useCredits)} />
                    <span>Use Credits</span>
                </div>
                <button className="bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-self-end">
                    Continue
                </button>
            </div>
        </div>
    )
}

export default NewOrderCheckout;

