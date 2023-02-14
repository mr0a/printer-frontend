import FileList from "../file_list/FileList"
import { useState, useRef, useEffect, useContext } from "react";
import './drag.css'
import NotificationManager from "react-notifications/lib/NotificationManager";
import { cartContext } from "../../state/cartProvider";


export default function UserFiles() {

    const [dragActive, setDragActive] = useState(false);
    const {files, setFiles} = useContext(cartContext);


    const inputRef = useRef(null);
    const divRef = useRef(null);

    function handleFile(newFiles) {
        // alert("Number of files: " + files.length);
        NotificationManager.success(`${newFiles.length} file${newFiles.length > 1 ? 's':''} has been queued to upload!`, 'Upload Started', 2000)
        console.log(files)
        setFiles([...files, ...newFiles])
    }

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

      const handleNewFile = () => {
        inputRef.current.click();
      };

      useEffect(() => {
        if(dragActive){
            console.log(divRef);
            divRef.current.classList.add('drag-active')
        }else{
            divRef.current.classList.remove('drag-active')
        }
      }, [dragActive])

    return (
        <div ref={divRef} className="border border-2 rounded-2xl py-10 px-20 mt-10 min-h-[70%]" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <input className="hidden" ref={inputRef} type="file" multiple={true} onChange={handleChange} />
            <FileList fileHandle={handleNewFile} />
        </div>
    )
}