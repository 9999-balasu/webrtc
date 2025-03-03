/*import React, {createContext} from "react";
import  {io}  from 'socket.io-client'
import { useMemo } from "react";
import { useContext } from "react";
const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket;
}

export const SocketProvider = (props) => {
    const socket = useMemo(() => io('https://webrtc-backend-theta.vercel.app/'), []);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}*/


import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketUrl = process.env.NODE_ENV === "development" 
            ? "http://localhost:8000" // Local development
            : "https://your-production-backend.com"; // Deployed backend

        const newSocket = io(socketUrl, {
            transports: ["websocket"],
            reconnection: true,
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

