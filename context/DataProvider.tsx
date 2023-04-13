import React, { useState,createContext } from 'react';

import { MessageType } from '../types/types';

export const DataContext = createContext({});
export const LoadingContext = createContext({});

interface Props {
    children: React.ReactNode;
}

export const DataProvider = ({ children }: Props) => {

  const [textInput, setTextInput] = useState<MessageType>({} as MessageType);
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <DataContext.Provider value={{ textInput, setTextInput }}>
      <LoadingContext.Provider value={{ isLoading, setLoading }}>
        {children}
      </LoadingContext.Provider>
    </DataContext.Provider>
  )
}