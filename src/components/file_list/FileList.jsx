import "./filelist.css"
import { File, FileHeader } from "./File";
import { useContext } from "react";
import { TrashIcon, PrinterIcon, PlusIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { cartContext } from "../../state/cartProvider";
import { useNavigate } from "react-router-dom";


function FileList({ files, fileHandle }) {
    let BASE_URL = "http://127.0.0.1:8000"

    const { cart, setCart, setFiles, setConfig } = useContext(cartContext);

    const navigate = useNavigate();

    let fileComponent = files?.map((file, idx) => (
        <File key={idx} file={file} selectedFiles={cart} setSelectedFiles={setCart} />
    )
    )

    function deleteFile(id) {
        fetch(BASE_URL + `/api/v1/file/${id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Bearer "+ localStorage.getItem("token") || ''
            },
        }).then(response => response.json().then(data => {
            console.log(data)
        }))
    }

    function deleteHandler() {
        if (cart.length === files?.length) {
            setFiles([]);
            setCart([]);
        }
        cart.forEach(fileId => {
            deleteFile(fileId);
        });
        let filteredFiles = files.filter(file => !(cart.includes(file.id)))
        console.log(filteredFiles)
        setFiles(filteredFiles)
        setCart([])
    }

    function checkout() {
        let config = {};

        Array.from(cart).forEach(fileId => {
            config[fileId] = {
                file_id: fileId,
                copies: 1,
                price: 1,
                sheetSize: "A4"
            }
        })
        setConfig(config);
        navigate('/orders/new');
    }

    if (!files?.length) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-xl font-bold">No files found! Add some files to proceed!</p>
                <div>
                    <PlusCircleIcon height="2rem" className="hover:border rounded m-2" onClick={fileHandle} />
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex" style={{ justifyContent: "space-between" }}>
                <h4>{cart.length ? `${cart.length} Files Selected` : ''}</h4>
                <div className="options h-[5rem]">
                    {
                        cart.length > 0 ?
                            <>
                                <PrinterIcon height="2rem" className="hover:border rounded m-2" onClick={checkout} />
                                <TrashIcon height="2rem" className="hover:border rounded m-2" onClick={deleteHandler} />
                            </> : ""
                    }
                    <PlusIcon height="2rem" className="hover:border rounded m-2" onClick={fileHandle} />
                </div>

            </div>
            <ul className="file-list">
                <FileHeader />
                {fileComponent}
            </ul>
        </div>
    )
}


export default FileList;