import React, { createContext, useContext, useEffect, useState } from "react";
import { socketHolder } from "../sockets";
import IncomingCallDialog from "@/components/IncomingCallDialog";

const RootContext = createContext<any>(null);

function RootAppProvider({ children }: { children: React.ReactNode }) {
  const [socketInstance, setSocketInstance] = useState<socketHolder | null>(
    null
  );

  const [showDialog, setShowDialog] = useState(false);

  const [connectedUserDetails, setConnectedUserDetails] = useState<any>(null);

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

    socket.on("pre-offer", handlePreOffer);

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
    setConnectedUserDetails(data);

    if (data.callType == "Video") {
      setShowDialog(true);
    }
  };
  const acceptCallHandler = () => {
    console.log("Call accepted");
    setShowDialog(false);
  };

  const rejectCallHandler = () => {
    console.log("Call rejected");
    setShowDialog(false);
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
        handlePreOffer,
      }}
    >
      {children}
      {showDialog && connectedUserDetails && (
        <IncomingCallDialog
          callType={connectedUserDetails.callType || "Voice"}
          onAccept={acceptCallHandler}
          onReject={rejectCallHandler}
        />
      )}
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
