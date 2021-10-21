import { User } from "@models/user";
import React, { createContext, useContext, useState } from "react";

export type GlobalContextContentProps = {
  user: User | null;
  loadingApp?: boolean;
};

export type GlobalContextProps = {
  content: GlobalContextContentProps;
  setContent: React.Dispatch<React.SetStateAction<GlobalContextContentProps>>;
};

export const GlobalContext = createContext<GlobalContextProps | null>(null);

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setContent = (object: any) => {
    setContext({ ...context, content: { ...object } });
  };

  const [context, setContext] = useState<GlobalContextProps>({
    content: {
      user: null,
      loadingApp: true,
    },
    setContent: setContent,
  });

  return (
    <GlobalContext.Provider value={{ ...context, setContent }}>
      {children}
    </GlobalContext.Provider>
  );
}
export const useGlobalContext = () => useContext(GlobalContext);
export const useUser = () => useContext(GlobalContext)?.content.user;
