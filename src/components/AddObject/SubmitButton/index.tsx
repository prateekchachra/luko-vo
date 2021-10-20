import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { string } from 'yup/lib/locale';
import { colors } from '../../../constants';

export interface SubmitButtonProps {
    label: string;
    onSubmit: () => void;
    outline: boolean;
    disabled?: boolean;
    "data-testid"?: string;
}

const SubmitButton = (props: SubmitButtonProps) => {

  const disableHandlerColor = props.disabled ? colors.BUTTON_BLUE_DISABLED : colors.BUTTON_BLUE;

  return (
    <TouchableOpacity
    disabled={props.disabled}
      style={{
        padding: 4,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  props.outline ? 
        colors.DEFAULT_WHITE : disableHandlerColor
      }}
      activeOpacity={0.7}
      onPress={props.onSubmit}
    >
      <Text
        style={[styles.labelText, {color: props.outline ? disableHandlerColor :
          colors.DEFAULT_WHITE}]}>
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