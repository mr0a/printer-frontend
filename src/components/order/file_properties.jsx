/* eslint-disable jsx-a11y/anchor-is-valid */
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { cartContext } from '../../state/cartProvider'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function SizeSelector({ sizes = ['A3', 'A4', 'A5'], selected, onChange }) {

    return (
        <Listbox value={selected} onChange={onChange}>
            {({ open }) => (
                <div>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">Select Sheet Size</Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {sizes.map((size, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={size}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >{size}
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : size}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}

function FilePrintProperties({ file_id }) {

    const {files} = useContext(cartContext);
    const {config, setConfig} = useContext(cartContext);

    let file = files.find(file => file.id === file_id)

    const [copies, setCopies] = useState(1);
    const [pages, setPages] = useState(file.page_count);
    const [price, setPrice] = useState(pages*copies);
    const [sheetSize, setSheetSize] = useState("A4")

    function handleChange(event) {
        let copy_count = event.target.value
        setCopies(copy_count);
        setPrice(pages * copy_count)
        console.log(config)
    }

    useEffect(() => {
        let file_config = {
            file_id: file_id,
            pages: pages,
            copies: copies,
            price: price,
            sheetSize: sheetSize
        }
        let updatedConfig = {...config};
        updatedConfig[file_id] = file_config;
        setConfig(updatedConfig)
    }, [price, sheetSize, copies, pages])

    useEffect(() => {
        console.log(config)
    }, [config])

    return (
        <div className='grid grid-cols-5 justify-items-center items-center font-bold p-3 text-lg border-b-2'>
            <p>{file.file_name}</p>
            <input className="border rounded w-32" type="number" value={copies} min={1} onChange={handleChange} />
            <SizeSelector sizes={['A3', 'A4', 'A5']} onChange={setSheetSize} selected={sheetSize} />
            <input disabled className="border rounded w-32" type="number" min={1} value={pages} />
            <input disabled className="border rounded w-32" type="number" min={1} value={price} />
        </div>
    )
}

export default FilePrintProperties;
