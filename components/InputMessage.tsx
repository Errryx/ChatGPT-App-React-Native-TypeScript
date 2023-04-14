import React, { useState, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { DataContext, PromptContext } from '../context/DataProvider';
import { promptIds } from '../constants/constants';

const InputMessage = () => {
	const { setTextInput } = useContext<any>(DataContext);
	const {promptId, setPromptId} = useContext<any>(PromptContext)
	const [text, setText] = useState<string>('');
	const [showPrompt, setShowPrompt] = useState<boolean>(false);

	const handleSendMessage = () => {

		if (!text.trim()) return;

		setTextInput({
			id: getUuid(),
			create: new Date().getTime(),
			model: 'youchat',
			text: text.trim(),
			user: {
				name: 'you',
				avatar: 'https://i.pravatar.cc/100?u=A08',
			},
			usage: {
				prompt_tokens: 0,
				completion_tokens: 0,
				total_tokens: 0,
			},
		});
		setText('');
	};

	const handleShowPrompts = () => {
		setShowPrompt(!showPrompt)
	}

	return (
		<View style={styles.inputContainer}>
			<View style={styles.inputMessage}>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setText(text)}
					value={text}
				/>
				<TouchableOpacity style={styles.button} onPress={() => handleSendMessage()}>
					<FontAwesome name="send" size={18} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => handleShowPrompts()}>
					<FontAwesome name="plus" size={18} color="white" />
				</TouchableOpacity>
			</View>

			{showPrompt && <FlatList style={styles.promptContainer}
				data={promptIds}
				renderItem={({ item }) => 
					<Item title={item} 
						onPress={() => {
							if (item == promptId)
								setPromptId('')
							else 
								setPromptId(item)
						}}
						backgroundColor={item == promptId ? '#666600' : '#006633'} />
				}
				keyExtractor={item => item}
				numColumns={3}
			/>}
		</View>
	);
};

function getUuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

type ItemProps = { title: string, onPress: () => void, backgroundColor: string };

const Item = ({ title, onPress, backgroundColor }: ItemProps) => (
	<View style={[styles.item, {backgroundColor}]}>
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	</View>
);

export default InputMessage;

const styles = StyleSheet.create({
	inputMessage: {
		height: 45,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	inputContainer: {
		width: '100%',
		flexDirection: 'column',
		marginBottom: 20,
	},
	promptContainer: {
		height: 200,
		margin: 10,
	},
	input: {
		width: '70%',
		height: 40,
		padding: 10,
		fontSize: 14,
		textAlign: 'left',
		color: '#ffffff',
		borderColor: '#10ac84',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#222f3e',
	},
	button: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: '10%',
		height: 40,
		marginLeft: 10,
		textAlign: 'center',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 20,
	},
	item: {
		flex:1,
		borderRadius: 3,
		paddingLeft: 4,
		paddingRight: 4,
		paddingTop: 8,
		paddingBottom: 8,
		marginVertical: 2,
		marginHorizontal: 4,
	},
	title: {
		fontSize: 16,
		color: '#fff',
	},
});