import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";


export default function Root(){
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}