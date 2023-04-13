import React, { useRef, useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import { useFetchMessage } from '../hooks/useFetchMessage';
import Message from './Message';
import { DataContext } from '../context/DataProvider';
import { MessageType } from '../types/types';


const ListMessage = () => {

	const listRef = useRef<FlatList>(null)

	const [messages, setMessages] = useState<MessageType[]>([]);
	
	const { textInput } = useContext<any>(DataContext);
	
	const { data } = useFetchMessage(textInput);

	useEffect(() => {

		if (textInput?.text) {
			setMessages((messages) => [...messages, textInput]);
			handleListPosition(listRef.current)
		}
	}, [textInput.create])

	useEffect(() => {

		if (!!data?.text) {
			setMessages((messages) => [...messages, data]);
			handleListPosition(listRef.current)
		}

	}, [data, data.text]);

	return (
			<FlatList
				ref={listRef}
				style={styles.listContainer}
				data={messages}
				renderItem={({ item }) => <Message message={item} />}
				keyExtractor={(item) => item.id.toString()}
				refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={() => setMessages([])}
					/>
				}
			/>
	);
};

function handleListPosition(list: FlatList | null) {
	if (list) {
		setTimeout(() => {list.scrollToEnd({ animated: true})}, 200)
	}
}

export default ListMessage;

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: '#222f3e',
	},
});
