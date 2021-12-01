import { createContext, useContext, useCallback, useEffect, useState, useMemo} from "react";
import { useServices } from "../Services/PagesServices/Login.services";

const UserContext = createContext();

const TOKEN_KEY = "token";


export const UserProvider = (props) => {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(undefined);
    useEffect(() => {
        const verifyToken = async () => {
            const localToken = getToken();
            
            if (localToken) {
                const response = await useServices.verifyToken(localToken);
                
                if (response.username && response.role) {
                    setUser({ username: response.username, role: response.role });
                    setToken(localToken);
                }
            }
            
        };
        verifyToken();
    }, [token]);

    const getToken = () => {
        return localStorage.getItem(TOKEN_KEY);
    };

    const setNewToken = (newToken) => {
        if (newToken) {
            localStorage.setItem(TOKEN_KEY, newToken);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }

        setToken(newToken);
    };

    const login = useCallback((username, password) => {
        const loginFetch = async (username, password) => {
            const response = await useServices.login(username, password);
            console.log(response) 
                    if (response.token) {
                setNewToken(response.token);
                return true;
            }

            return false;
        };

        return loginFetch(username, password);
    }, []);

    const logout = () => {
        setNewToken(undefined);
        setUser(undefined);
    }

    const Value = useMemo(() => {
        return {
            user: user,
            login: login,
            token: token,
            logout: logout,
            getToken: getToken,
        };
    }, [user, token]);

    return (
        <UserContext.Provider value={Value}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("No estás dentro del UserProvider")
    }

    return context;
};