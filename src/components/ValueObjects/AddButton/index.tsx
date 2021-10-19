import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../constants';

export interface AddButtonTypes {
    onAddPress: () => void;
}



const AddButton = (props: AddButtonTypes) => (

    <TouchableOpacity style={styles.buttonContainer} onPress={props.onAddPress}>
        <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );


const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.BUTTON_BLUE,
        height: 24,
        width: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: colors.DEFAULT_WHITE
    }
});

export default AddButton;