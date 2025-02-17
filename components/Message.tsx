import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { MessageType } from '../types/types';

type MessageProps = {
	message: MessageType;
};

const Message = ({ message }: MessageProps) => {

	const copyToClipboard = async  () => {
		await Clipboard.setStringAsync(message.text);
		ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
	};

	if (message.user.name === 'you')
		return (<View style={ styles.messageyou }>
			<TouchableOpacity onPress={() => copyToClipboard()}>
				<Text style={styles.text}>{message.text}</Text>
			</TouchableOpacity>
		</View>);
	else
		return (
			<View style={styles.profile}>
				<Image style={styles.Image} source={{ uri: message.user.avatar }} />
				<View style={ styles.messagechatgpt }>
					<TouchableOpacity onPress={() => copyToClipboard()}>
						<Text style={styles.text}>{message.text}</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
};

export default Message;

const styles = StyleSheet.create({
	messagechatgpt: {
		maxWidth:'80%',
		backgroundColor: '#002f3e',
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
	messageyou: {
		maxWidth:'80%',
		backgroundColor: '#285B7A',
		padding: 10,
		margin: 10,
		borderRadius: 10,
		alignSelf: 'flex-end',
	},
	text: {
		color: '#fff',
		fontSize: 16,
		alignSelf: 'flex-start',
	},
	profile: {
		flexDirection: 'row',
		alignItems: 'center',
		marginStart: 10,
	},
	author: {
		color: '#fff',
		fontSize: 12,
		marginLeft: 8,
	},
	Image: {
		width: 25,
		height: 25,
		borderRadius: 8,
	},
});
