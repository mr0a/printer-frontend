import { useState, useRef, useEffect } from "react"

function File({ file, selectedFiles, setSelectedFiles }) {
    console.log(selectedFiles)
    // console.log(selectedFiles.includes(file.name), file)
    const [selected, setSelected] = useState(selectedFiles.includes(file.name) ? true : false);

    const elementRef = useRef(null);

    function handleSelect(event) {
        console.log(elementRef.current)
        if (selected) {
            // event.currentTarget.classList.remove('selected')
            setSelected(false)
            let value = selectedFiles.filter(file_id =>  file_id !== file.id);
            setSelectedFiles(value)
        }
        else {
            // event.currentTarget.classList.add('selected')
            setSelected(true)
            let value = [...selectedFiles, file.id]
            setSelectedFiles(value)
        }
    }

    useEffect(() => {
        if (selected) {
            elementRef.current.classList.add('selected')
        } else {
            elementRef.current.classList.remove('selected')
        }
    }, [selected])
    file.size = (file.file.length * (3/4)) - 2
    let fileSize = file.size > 999999 ? 'MB' : 'KB'
    let numSize = file.size > 999999 ? file.size / 1000000 : file.size / 1000

    return (
        // <li ref={elementRef} className="border-b-2 flex justify-around p-3 hover:bg-sky-50" key={file.id} onClick={handleSelect}>
        //     <p>{file?.name}</p>
        //     <p>{file?.created_at}</p>
        //     <p>{numSize} {fileSize}</p>
        // </li>
        <li ref={elementRef} className="border-b-2 grid grid-cols-4 justify-items-center p-3 hover:bg-sky-50" key={file.id} onClick={handleSelect}>
            <p>{file?.file_name}</p>
            <p>{file?.page_count}</p>
            <p>{file?.created_at}</p>
            <p>{numSize} {fileSize}</p>
        </li>
    )
}

function FileHeader() {
    return (
        <li className="flex grid grid-cols-4 justify-items-center border border-black font-bold p-3 text-lg">
            <p>File Name</p>
            <p>Page Count</p>
            <p>Created At</p>
            <p>Size</p>
        </li>
    )
}

export { FileHeader, File }