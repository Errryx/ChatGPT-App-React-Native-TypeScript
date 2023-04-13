import { storage } from '../App';
import { API_URL } from '../constants/constants';
import { MessageType } from '../types/types';


export const getMessage = async (message: string) => {

    const body = {
        message: message || '',
        user: storage.getString('user.id')
    };

    const fetchMessage = async (): Promise<MessageType> => {
        const response = await globalThis.fetch(`${API_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const { data } = await response.json();

        return data;
    };
    
    return fetchMessage();

};