import React, { useState, useContext } from 'react';
import uuid from 'react-uuid';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { MessageType } from '../types/types';

import { DataContext } from '../context/DataProvider';

const InputMessage = () => {

	const { setTextInput } = useContext<any>(DataContext);
	const [text, setText] = useState<string>('');

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

	return (
		<View style={styles.inputMessage}>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setText(text)}
				value={text}
			/>
			<TouchableOpacity style={styles.button} onPress={() => handleSendMessage()}>
				<FontAwesome name="send" size={24} color="white" />
			</TouchableOpacity>
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

export default InputMessage;

const styles = StyleSheet.create({
	inputMessage: {
		height:55,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom:20,
	},
	input: {
		width: '75%',
		height: 50,
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
		width: '15%',
		height: 50,
		marginLeft: 10,
		textAlign: 'center',
		borderColor: '#10ac84',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#10ac84',
	},
});
