import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants';


export interface ImagePreviewProps {
    imageUri: string;
    onCancelPress: () => void; 
}
const ImagePreview = (props: ImagePreviewProps) => {
    return (
        <View style={styles.previewContainer}>
            <Image style={styles.image} source={{uri: props.imageUri}} />
            <TouchableOpacity style={styles.closeButtonContainer} onPress={props.onCancelPress}>
                <Ionicons name="close" size={16} color={colors.DEFAULT_WHITE} />
            </TouchableOpacity>
        </View>
    )
}

export default ImagePreview;

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 120,
        borderRadius: 12,
    },
    previewContainer:{
        flex: 1,
        height: 120,
        width: 120,
        position: 'relative',
        alignSelf: 'center',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 12,
        right: 12,
        height: 24,
        width: 24,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.PRIMARY_RED
    }
})
