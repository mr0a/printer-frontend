import "./filelist.css"
import {File, FileHeader} from "./file";
import { useState } from "react";
import {ImPrinter} from 'react-icons/im';
import {FaTrashAlt} from 'react-icons/fa';

function FileList(){
    let default_files = [
        {
            name: "file-1.pdf",
            created_at: "Nov 5, 2022",
            size: "5 MB"
        },
        {
            name: "file-2.pdf",
            created_at: "Nov 5, 2022",
            size: "5 MB"
        },
        {
            name: "file-3.pdf",
            created_at: "Nov 5, 2022",
            size: "5 MB"
        },
        {
            name: "file-4.pdf",
            created_at: "Nov 5, 2022",
            size: "5 MB"
        }
    ]
    const [files, setFiles] = useState(default_files);
    const [selectedFiles, setSelectedFiles] = useState([]);

    let fileComponent = files.map( (file, idx) => (
            <File key={idx} file={file} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
        )
    )

    function deleteHandler() {
        if (selectedFiles.length === files.length){
            setFiles([]);
            setSelectedFiles([]);
        }
    }

    return (
        <div>
            <div className="flex" style={{justifyContent: "space-between"}}>
                <h4>{selectedFiles.length ? `${selectedFiles.length} Files Selected`: ''}</h4>
                <div className="options">
                    <ImPrinter size="2rem" />
                    <FaTrashAlt size="2rem" onClick={deleteHandler} />
                </div>
            </div>
            <ul className="file-list">
                {/* <File file={{name: "File Name", created_at: "Created At", size: "File Size"}} /> */}
                <FileHeader />
                {fileComponent}
            </ul>
        </div>
    )
}


export default FileList;