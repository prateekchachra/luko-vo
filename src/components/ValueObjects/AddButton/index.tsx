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
        height: 36,
        width: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        color: colors.DEFAULT_WHITE
    }
});

export default React.memo(AddButton);