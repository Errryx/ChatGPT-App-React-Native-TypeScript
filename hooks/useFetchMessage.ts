import { useState ,useEffect } from "react";
import { getMessage } from "../helpers/getMessage";
import { MessageType } from "../types/types";

type state = {
    data: MessageType;
    isLoading: boolean;
};

export const useFetchMessage = (textInput?: MessageType): state => {

    const [state, setState] = useState<state>({
        data: {} as MessageType,
        isLoading: true,
    });

    const loadMessage = async () => {
        if (!textInput?.text) {
            return
        }
        const data = await getMessage(textInput.text);
        setState({
            data,
            isLoading: false,
        });
    };

    useEffect(() => {
        loadMessage();
    }, [textInput?.create]);

    if (!textInput?.text) {
        return {
            data: {} as MessageType,
            isLoading: false,
        }
    }

    return state;
}