import React, { useState, useCallback, useEffect, useMemo, forwardRef } from 'react'
import { View, TextInput, TextInputProps, StyleSheet, } from 'react-native'
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
    
    const validationColor = useMemo(() => !props.touched ? colors.SECONDARY_BLUE : (props.error ? 
        colors.PRIMARY_RED : colors.SECONDARY_BLUE), [props.touched, props.error]);

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
            top: interpolate(animatedIsFocused.value, [0, 1], [18, 0]),
            fontSize: interpolate(animatedIsFocused.value, [0, 1], [20, 14]),
            opacity: interpolate(animatedIsFocused.value, [0, 1], [0.5, 0.8]),
            color: colors.DEFAULT_GRAY,
            borderColor: validationColor,
            borderWidth: StyleSheet.hairlineWidth
        };
        }
    );
      
    return (
        <View style={styles.inputContainer}>
            <Animated.Text style={labelStyle}>{props.label}</Animated.Text>
            <TextInput 
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            underlineColorAndroid='transparent'
            ref={ref}
            />
        </View>
    )
});

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 18,
        marginVertical: 12
    }
})

export default React.memo(InputField);