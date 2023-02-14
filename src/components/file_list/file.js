import { useState } from "react"

function File({file, selectedFiles, setSelectedFiles}) {

    const [selected, setSelected] = useState(false);

    function handleSelect(event) {
        console.log("hello")
        if (selected)
        {
            event.currentTarget.classList.remove('selected')
            setSelected(false)
            let value = selectedFiles.filter(name => name !== file.name);
            console.log(value)
            setSelectedFiles(value)
        }
        else{
            event.currentTarget.classList.add('selected')
            setSelected(true)
            let value = [...selectedFiles, file.name]
            console.log(value)
            setSelectedFiles(value)
        }
    }

    return (
        <li className="file" onClick={handleSelect}>
            <p>{file?.name}</p>
            <p>{file?.created_at}</p>
            <p>{file?.size}</p>
        </li>
    )
}

function FileHeader(){
    return (
        <li className="file-header bold">
            <p>File Name</p>
            <p>Created At</p>
            <p>Size</p>
        </li>
    )
}

export {FileHeader, File}