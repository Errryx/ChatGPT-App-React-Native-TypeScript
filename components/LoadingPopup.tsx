import React, {useContext} from 'react';
import {StyleSheet, View, ActivityIndicator, Text, Modal } from "react-native"
import { LoadingContext } from '../context/DataProvider';

const LoadingPopup = () => {
    const { isLoading } = useContext<any>(LoadingContext);

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={isLoading}>
            <View style={styles.centeredView}>
                <View style={styles.loading}>
                    <ActivityIndicator size="small" color="#0000ff" />
                    <Text style={styles.text} >Loading</Text>
                </View>
            </View>
        </Modal>
    )
}

export default LoadingPopup;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '150%',
    },
	loading: {
        margin: 20,
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
		backgroundColor: '#285B7A',
	},
    text: {
		color: '#fff',
		fontSize: 16,
        marginLeft: 10,
		alignSelf: 'center',
    }
});