import React, { createContext, useContext, useEffect, useState } from "react";
import { socketHolder } from "../sockets";

const RootContext = createContext<any>(null);

function RootAppProvider({ children }: { children: React.ReactNode }) {
  const [socketInstance, setSocketInstance] = useState<socketHolder | null>(
    null
  );

  useEffect(() => {
    const socket = new socketHolder("http://localhost:3069");

    socket.connect();

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <RootContext.Provider value={{ socket: socketInstance }}>
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
