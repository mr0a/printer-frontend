import { createContext, useState } from "react";

export const cartContext = createContext();

let default_files = [
    {
        id: 0,
        name: "file-1.pdf",
        created_at: "Nov 5, 2022",
        size: "512546"
    },
    {
        id: 1,
        name: "file-2.pdf",
        created_at: "Nov 5, 2022",
        size: "5456789"
    },
    {
        id: 2,
        name: "file-3.pdf",
        created_at: "Nov 5, 2022",
        size: "578964"
    },
    {
        id: 3,
        name: "file-4.pdf",
        created_at: "Nov 5, 2022",
        size: "687541"
    }
]

const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    const [files, setFiles] = useState(default_files);

    return (
        <cartContext.Provider value={{cart, setCart, files, setFiles}}>
            {props.children}
        </cartContext.Provider>
    );
}


export default CartProvider;