import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../constants';

export interface SubmitButtonProps {
    label: string;
    onSubmit: () => void;
    disabled?: boolean;
    outline: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <TouchableOpacity
    disabled={props.disabled}
      style={{
        padding: 4,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  props.outline ? 
        colors.DEFAULT_WHITE : colors.BUTTON_BLUE
      }}
      activeOpacity={0.7}
      onPress={props.onSubmit}
    >
      <Text
        style={[styles.labelText, {color: props.outline ? colors.BUTTON_BLUE :
          colors.DEFAULT_WHITE,}]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    labelText: {
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase' 
      }
})
export default SubmitButton;