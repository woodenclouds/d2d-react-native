import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '@app/themes/themes';
import DownArrow from '@app/assets/icons/down_arrow.svg';

type Props = {
  label?: string;
  placeholder?: string;
  options?: string[];
  onDropdownToggle?: (value: boolean) => void;
  selected?: (value: string) => void;
};

const SelectBox = (props: Props) => {
  const {label, placeholder, options, onDropdownToggle} = props;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeholder);

  const toggleDropdown = () => {
    const newState = !isDropdownOpen;
    setDropdownOpen(newState);
    onDropdownToggle?.(newState); // Notify parent component
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.touchContainer}
          onPress={toggleDropdown}>
          <Text style={styles.selectedText}>{selectedItem}</Text>
          <DownArrow />
        </TouchableOpacity>
      </View>
      {isDropdownOpen && (
        <View
          style={[
            styles.selectContainer,
            {maxHeight: options.length > 5 ? SIZES.hp(100 / 4.2) : 'auto'},
          ]}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  props.selected(item);
                  setDropdownOpen(false);
                  onDropdownToggle?.(false);
                }}>
                <Text style={styles.dropdownItem}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default SelectBox;

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
  touchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.hp(2 / 4.2),
  },
  iconContainer: {
    width: SIZES.wp(20 / 4.2),
    height: SIZES.wp(20 / 4.2),
  },
  selectedText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: COLORS.grey,
    width: '90%',
  },
  selectContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: SIZES.wp(8 / 4.2),
    borderColor: COLORS.border_color,
    borderWidth: 1,
    marginTop: SIZES.wp(4 / 4.2),
    paddingVertical: SIZES.wp(4 / 4.2),
  },
  dropdownItem: {
    padding: SIZES.wp(10 / 4.2),
    fontSize: SIZES.wp(14 / 4.2),
    color: COLORS.grey,
  },
});
