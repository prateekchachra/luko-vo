import React, { useState, useCallback, useEffect, forwardRef } from 'react'
import { View, TextInput, TextInputProps, StyleSheet, Text } from 'react-native'
    import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolate, Easing} from 'react-native-reanimated';
import { colors } from '../../../constants';

export interface InputFieldProps extends TextInputProps{
    label: string;
    error?: string;
    touched?: boolean;
}

const InputField = forwardRef<TextInput, InputFieldProps>((props: InputFieldProps, ref) => {

    const [isFocused, setIsFocused] = useState(false);
    
    const animatedIsFocused = useSharedValue(0);

    const handleBlur = useCallback(() => setIsFocused(false), []);
    const handleFocus = useCallback(() => setIsFocused(true), []);
    
    const validationColor = !props.touched ? colors.SECONDARY_BLUE : (props.error ? 
        colors.PRIMARY_RED : colors.SECONDARY_BLUE);

    useEffect(() => {
        withTiming(isFocused || props.value !== '' ? 1 : 0, {
            duration: 200,
            easing: Easing.ease 
        });
    }, [isFocused])

    const labelStyle  = useAnimatedStyle(() => {
        
        return {
            position: 'absolute',
            left: 0,
            top: 0,
            fontSize: interpolate(animatedIsFocused.value, [0, 1], [18, 14]),
            opacity: interpolate(animatedIsFocused.value, [0, 1], [0.5, 0.8]),
            color: colors.DEFAULT_GRAY,
        };
        }
    );
      
    return (
        <View style={[styles.inputContainer, {borderColor: validationColor}]}>
            <Animated.Text style={labelStyle}>{props.label}</Animated.Text>
            <TextInput 
            {...props}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            underlineColorAndroid='transparent'
            ref={ref}
            />
            {props.error && <Text style={styles.errorStyle}>{props.error}</Text>}
        </View>
    )
});

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 18,
        marginVertical: 24,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    input: {
        flex: 1,
        padding: 4,
        borderRadius: 4,
    },
    errorStyle: {
        position: 'absolute',
        bottom: -16,
        fontSize: 8,
        color: colors.PRIMARY_RED,
    }
})

export default React.memo(InputField);