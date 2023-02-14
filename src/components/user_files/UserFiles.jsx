import FileList from "../file_list/FileList"
import { useState, useRef, useEffect, useContext } from "react";
import './drag.css'
import NotificationManager from "react-notifications/lib/NotificationManager";
import { cartContext } from "../../state/cartProvider";

let BASE_URL = "http://127.0.0.1:8000"


export default function UserFiles() {

    const [dragActive, setDragActive] = useState(false);
    const { files, setFiles } = useContext(cartContext);
    const [fileUploaded, setFileUploaded] = useState(false);


    const inputRef = useRef(null);
    const divRef = useRef(null);

    function uploadFile(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let fileText = reader.result;
            let data = {file: fileText, file_name: file.name}

            fetch(BASE_URL + '/api/v1/file', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    "Authorization": "Bearer "+ localStorage.getItem("token") || ''
                },
                body: JSON.stringify(data)
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    useEffect(() => {
        updateFiles();
    }, [fileUploaded])


    function updateFiles() {
        fetch(BASE_URL + '/api/v1/file/user_files', {
            method: "GET",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                "Authorization": "Bearer "+ localStorage.getItem("token") || ''
            },
        }).then(response => response.json().then(data => {
            console.log(data)
            setFiles(data)
        }))
    }


    function handleFile(newFiles) {
        setFileUploaded(true);
        NotificationManager.success(`${newFiles.length} file${newFiles.length > 1 ? 's' : ''} has been queued to upload!`, 'Upload Started', 2000)
        console.log(newFiles)
        for (let index = 0; index < newFiles.length; index++) {
            const file = newFiles[index];
            uploadFile(file);
        }
        updateFiles();
        setFileUploaded(true);
        NotificationManager.success(`${newFiles.length} file${newFiles.length > 1 ? 's' : ''} has been uploaded!`, 'Upload Successfull', 2000)
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
        if (dragActive) {
            console.log(divRef);
            divRef.current.classList.add('drag-active')
        } else {
            divRef.current.classList.remove('drag-active')
        }
    }, [dragActive])

    return (
        <div ref={divRef} className="border border-2 rounded-2xl py-10 px-20 mt-10 min-h-[70%]" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <input className="hidden" ref={inputRef} type="file" multiple={true} onChange={handleChange} />
            <FileList fileHandle={handleNewFile} files={files} />
        </div>
    )
}