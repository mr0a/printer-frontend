import { useContext, useEffect } from "react";
import { cartContext } from "../../state/cartProvider";
import { userDetailsContext } from '../../state/UserDetailsProvider'
import { useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
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
    let { config, setConfig } = useContext(cartContext);

    const [selected, setSelected] = useState(reprographies[0])

    useEffect(() => {
        setConfig({ ...config, "repro": selected })
        console.log(config)
    }, [selected])

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

    const { cart, files } = useContext(cartContext);
    const { config } = useContext(cartContext);
    const { userDetails } = useContext(userDetailsContext);
    const [useCredits, setUseCredits] = useState(userDetails.credits !== 0);
    const navigate = useNavigate();

    console.log(cart);

    useEffect(() => {
        if (!cart.length) {
            return navigate('/files');
        }
    })

    let filePropertiesSelector = cart.map(id => <FilePrintProperties key={id} file_id={id} />)

    function handleContinue() {
        let BASE_URL = "http://127.0.0.1:8000";

        // let totalAmount = Array.from(files).reduce((file) => file.price, 0)
        // console.log(totalAmount);

        console.log(config)
        let data = {
            repro: config["repro"] || "Auto",
            payment_method: "CASH"
        }
        delete config["repro"];
        let files = Object.values(config);
        console.log(files);
        let total_amount = files.reduce((count, file) => count + file.price, 0);
        data["files"] = files;
        data["total_amount"] = total_amount;
        function createOrder() {
            fetch(BASE_URL + '/api/v1/order/', {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token") || '',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json().then(data => {
                if(response.status == 200){
                    NotificationManager.success(`Success`, 'Order has been submitted Successfully!', 5000);
                    console.log(data)
                    navigate('/orders');
                }
            }))
        }
        createOrder();
    }


    return (
        <div className="my-10">
            <Header />
            {filePropertiesSelector}
            <div className="my-8 grid grid-cols-3 justify-between items-center">
                <div className="justify-self-start">
                    <SelectRepo />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" checked={useCredits} disabled={userDetails.credits === 0} className="w-5 mx-4" onChange={() => setUseCredits(!useCredits)} />
                    <div className="grid">
                        <span>Use Credits</span>
                        <span>Available: {userDetails.credits}</span>
                    </div>
                </div>
                <button className="bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-self-end" onClick={handleContinue}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default NewOrderCheckout;

