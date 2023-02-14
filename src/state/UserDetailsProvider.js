import { createContext } from "react";
import useLocalStorage from "../custom_hooks/localStorageHook";


export const userDetailsContext = createContext();

const UserDetailsProvider = (props) => {
    const [userDetails, setUserDetails] = useLocalStorage("userDetails", {});
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);

    return (
        <userDetailsContext.Provider value={{userDetails, setUserDetails, isAuthenticated, setIsAuthenticated}}>
            {props.children}
        </userDetailsContext.Provider>
    );
}


export default UserDetailsProvider;