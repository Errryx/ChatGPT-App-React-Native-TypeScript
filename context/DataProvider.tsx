import React, { useState,createContext } from 'react';

import { MessageType } from '../types/types';
import { MMKV } from 'react-native-mmkv'

export const DataContext = createContext({});
export const LoadingContext = createContext({});
export const PromptContext = createContext({});
export const storage = new MMKV()
import uuid from 'react-uuid';

interface Props {
    children: React.ReactNode;
}

export const DataProvider = ({ children }: Props) => {
	const hasUserId = storage.contains('user.id')
	if (!hasUserId) {
		storage.set('user.id', uuid())
	}
  const [textInput, setTextInput] = useState<MessageType>({} as MessageType);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [promptId, setPromptId] = useState<string>('')

  return (
    <DataContext.Provider value={{ textInput, setTextInput }}>
      <LoadingContext.Provider value={{ isLoading, setLoading }}>
        <PromptContext.Provider value={{promptId, setPromptId}}>
          {children}
        </PromptContext.Provider>
      </LoadingContext.Provider>
    </DataContext.Provider>
  )
}