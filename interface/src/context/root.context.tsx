import React, { createContext, useContext, useEffect, useState } from "react";
import { socketHolder } from "../sockets";

const RootContext = createContext<any>(null);

function RootAppProvider({ children }: { children: React.ReactNode }) {
  const [socketInstance, setSocketInstance] = useState<socketHolder | null>(
    null
  );

  const [state, setState] = useState({
    socketId: null,
    localStream: null,
    remoteStream: null,
    ScreenSharingStream: null,
    allowConnectionFormStrangers: false,
    screenSharingActive: false,
  });

  const setSocketId = (socketId: any) => {
    setState((prev) => ({
      ...prev,
      socketId: socketId,
    }));
  };

  const setLocalStream = (stream: any) => {
    setState((prev) => ({
      ...prev,
      localStream: stream,
    }));
  };
  const setAllowConnectionFromStrangers = (allowConnection: any) => {
    setState((prev) => ({
      ...prev,
      allowConnectionFormStrangers: allowConnection,
    }));
  };

  const setScreenSharingActive = (screenSharingActive: any) => {
    setState((prev) => ({
      ...prev,
      screenSharingActive: screenSharingActive,
    }));
  };

  const setScreenSharingStream = (stream: any) => {
    setState((prev) => ({
      ...prev,
      ScreenSharingStream: stream,
    }));
  };

  const setRemoteStream = (stream: any) => {
    setState((prev) => ({
      ...prev,
      remoteStream: stream,
    }));
  };

  const getState = () => {
    return state;
  };

  useEffect(() => {
    const socket = new socketHolder("http://localhost:3069");

    socket
      .connect()
      .then((id) => {
        setSocketId(id);
      })
      .catch((error) => console.log(error));

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendPreOffer = (code: string, callType: string, socket: any) => {
    const data = {
      callType,
      code,
    };
    socketInstance?.emit("pre_offer", data);
  };

  const handlePreOffer = (data: any) => {
    console.log("Pre offer", data);
  };

  return (
    <RootContext.Provider
      value={{
        socket: socketInstance,
        state,
        setState,
        setRemoteStream,
        setAllowConnectionFromStrangers,
        setLocalStream,
        setScreenSharingActive,
        setScreenSharingStream,
        setSocketId,
        getState,
        sendPreOffer,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}

function useRootContext() {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error("useRootContext must be used within a RootAppProvider");
  }
  return context;
}

export { RootAppProvider, useRootContext };
