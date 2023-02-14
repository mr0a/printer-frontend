import "./filelist.css"
import { File, FileHeader } from "./File";
import { useContext } from "react";
import { TrashIcon, PrinterIcon, PlusIcon } from "@heroicons/react/24/outline";
import { cartContext } from "../../state/cartProvider";
import { useNavigate } from "react-router-dom";


function FileList({files, fileHandle}) {

    const { cart, setCart, setFiles } = useContext(cartContext);

    const navigate = useNavigate();

    let fileComponent = files?.map((file, idx) => (
        <File key={idx} file={file} selectedFiles={cart} setSelectedFiles={setCart} />
    )
    )

    function deleteHandler() {
        if (cart.length === files?.length) {
            setFiles([]);
            setCart([]);
        }
        let filteredFiles = files.filter(file => !(cart.includes(file.name)))
        console.log(filteredFiles)
        setFiles(filteredFiles)
        setCart([])
    }

    function checkout() {
        navigate('/orders/new')
    }

    if (!files?.length) {
        return (
            <div className="flex justify-center">
                <p className="text-xl font-bold">No files found! Add some files to proceed!</p>
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