import React, {createContext} from "react";
import  {io}  from 'socket.io-client'
import { useMemo } from "react";
import { useContext } from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket;
}

export const SocketProvider = (props) => {
   // const socket = useMemo(() => io(process.env.REACT_APP_SOCKET_SERVER || "http://localhost:8000"), []);
   const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_SERVER || "http://localhost:8000"), []);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}


