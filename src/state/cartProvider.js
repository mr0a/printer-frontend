import { createContext, useState } from "react";

export const cartContext = createContext();

let BASE_URL = "http://127.0.0.1:8000"

const CartProvider = (props) => {

    const [cart, setCart] = useState([]);
    const [files, setFiles] = useState([]);

    return (
        <cartContext.Provider value={{cart, setCart, files, setFiles}}>
            {props.children}
        </cartContext.Provider>
    );
}


export default CartProvider;