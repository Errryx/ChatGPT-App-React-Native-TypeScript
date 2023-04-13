import React, { useState } from 'react';
import { Text, View } from 'react-native';

import Layout from '../components/Layout';
import ListMessage from '../components/ListMessage';
import InputMessage from '../components/InputMessage';
import LoadingPopup from '../components/LoadingPopup';

const HomeScreen = () => {

	return (
		<Layout>
			<ListMessage />
			<InputMessage />
			<LoadingPopup />
		</Layout>
	);
};

export default HomeScreen;
