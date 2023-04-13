import { useState ,useEffect, useContext } from "react";
import { getMessage } from "../helpers/getMessage";
import { MessageType } from "../types/types";
import { LoadingContext } from "../context/DataProvider"

type state = {
    data: MessageType;
};

export const useFetchMessage = (textInput?: MessageType): state => {

	const { setLoading } = useContext<any>(LoadingContext);
    const [state, setState] = useState<state>({
        data: {} as MessageType
    });

    const loadMessage = async () => {
        if (!textInput?.text) {
            return
        }
        setLoading(true)
        const data = await getMessage(textInput.text);
        setState({
            data,
        });
        setLoading(false)
    };

    useEffect(() => {
        loadMessage();
    }, [textInput?.create]);

    if (!textInput?.text) {
        setLoading(false)
        return {
            data: {} as MessageType,
        }
    }

    return state;
}