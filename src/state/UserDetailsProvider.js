import { useState, createContext } from "react";


export const userDetailsContext = createContext();

const UserDetailsProvider = (props) => {
    const [userDetails, setUserDetails] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <userDetailsContext.Provider value={{userDetails, setUserDetails, isAuthenticated, setIsAuthenticated}}>
            {props.children}
        </userDetailsContext.Provider>
    );
}


export default UserDetailsProvider;