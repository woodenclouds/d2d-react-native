import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@app/themes/themes';
import PasswordIcon from '@app/assets/icons/password_icon.svg';

type Props = {
  label?: string;
  placeholder?: string;
  password?: boolean;
  keyboardType?: string;
};

const InputBox = (props: Props) => {
  const {label, placeholder, password} = props;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          placeholderTextColor={'#C3C3C3'}
          secureTextEntry={password ? true : false}
        />
        {password && (
          <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
            <PasswordIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  label: {
    ...FONTS.medium,
    color: COLORS.grey,
    fontSize: SIZES.wp(14 / 4.2),
  },
  inputContainer: {
    borderWidth: SIZES.wp(1 / 4.2),
    borderRadius: SIZES.wp(16 / 4.2),
    borderColor: COLORS.border_color,
    marginTop: SIZES.wp(8 / 4.2),
    marginBottom: SIZES.wp(20 / 4.2),
    paddingHorizontal: SIZES.wp(16 / 4.2),
    paddingVertical: SIZES.wp(10 / 4.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    ...FONTS.medium,
    color: '#000',
    fontSize: SIZES.wp(14 / 4.2),
    width: SIZES.wp(300 / 4.2),
  },
  iconContainer: {
    width: SIZES.wp(20 / 4.2),
    height: SIZES.wp(20 / 4.2),
  },
});
