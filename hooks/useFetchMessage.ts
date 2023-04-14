import { useState ,useEffect, useContext } from "react";
import { getMessage } from "../helpers/getMessage";
import { MessageType } from "../types/types";
import { LoadingContext, PromptContext } from "../context/DataProvider"

type state = {
    data: MessageType;
};

export const useFetchMessage = (textInput?: MessageType): state => {

	const { setLoading } = useContext<any>(LoadingContext);
    const { promptId } = useContext<any>(PromptContext)
    const [state, setState] = useState<state>({
        data: {} as MessageType
    });

    const loadMessage = async () => {
        if (!textInput?.text) {
            return
        }
        setLoading(true)
        const data = await getMessage(textInput.text, promptId);
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