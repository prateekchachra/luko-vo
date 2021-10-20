import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../constants'

import {Ionicons} from '@expo/vector-icons';


interface AddPhotoButtonProps {
    label: string;
    onButtonPress: () => void;
    error?: string;
}

const AddPhotoButton = (props: AddPhotoButtonProps) => {
    
    const validationColor = props.error ? colors.PRIMARY_RED : colors.DEFAULT_BLACK;
    return (
        <TouchableOpacity style={[styles.buttonContainer, {borderColor: validationColor}]} 
        onPress={props.onButtonPress}>
            <Ionicons name="camera" size={36} color={colors.BUTTON_BLUE}/>
            <Text style={[styles.labelText, {color: validationColor}]}>{props.label}</Text>
            {props.error && <Text style={styles.errorText}>{props.error}</Text>}
        </TouchableOpacity>
    )
}

export default AddPhotoButton

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        marginVertical: 24,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 120,
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderStyle: 'dashed',
    },
    labelText: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 12,
    },
    errorText: {
        position: 'absolute',
        fontSize: 8,
        bottom: -12,
        color: colors.PRIMARY_RED,
    }
})