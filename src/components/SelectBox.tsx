import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, SIZES } from '@app/themes/themes';
import DownArrow from '@app/assets/icons/down_arrow.svg';

type Props = {
  label?: string;
  placeholder?: string;
  options?: string[];
  onDropdownToggle?: (value: boolean) => void;
  selected?: (value: string) => void;
  boxType?: 'default' | 'withSearch'; // New prop for box type
};

const SelectBox = (props: Props) => {
  const {
    label,
    placeholder,
    options = [],
    onDropdownToggle,
    selected,
    boxType = 'default',
  } = props;
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeholder);
  const [searchText, setSearchText] = useState(''); // State for search input
  const [filteredOptions, setFilteredOptions] = useState(options); // Filtered options based on search

  // Update filtered options when search text or options change
  useEffect(() => {
    if (boxType === 'withSearch' && isDropdownOpen) {
      const filtered = options.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options); // Reset to full list when not searching
    }
  }, [searchText, options, isDropdownOpen, boxType]);

  const toggleDropdown = () => {
    const newState = !isDropdownOpen;
    setDropdownOpen(newState);
    onDropdownToggle?.(newState);
    // Clear search text when closing dropdown
    if (!newState) {
      setSearchText('');
    }
  };

  return (
    <View>
      {boxType === 'default' && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {boxType === 'withSearch' && isDropdownOpen ? (
          // Show search input when dropdown is open and boxType is "withSearch"
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
            returnKeyType="search"
          />
        ) : (
          // Show button when dropdown is closed or boxType is "default"
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.touchContainer]}
            onPress={toggleDropdown}
          >
            <Text style={styles.selectedText}>{selectedItem}</Text>
            <DownArrow />
          </TouchableOpacity>
        )}
      </View>
      {isDropdownOpen && (
        <View style={[styles.selectContainer, { height: SIZES.hp(100 / 4.2) }]}>
          <FlatList
            data={filteredOptions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item.name);
                  selected?.(item.id);
                  setDropdownOpen(false);
                  onDropdownToggle?.(false);
                  setSearchText(''); // Clear search text on selection
                }}
              >
                <Text style={styles.dropdownItem}>{item.name}</Text>
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
    marginBottom: SIZES.wp(5 / 4.2),
    paddingHorizontal: SIZES.wp(16 / 4.2),
    // paddingVertical: SIZES.wp(10 / 4.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.hp(8 / 4.2),
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
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: SIZES.wp(14 / 4.2),
    color: COLORS.grey,
    paddingVertical: SIZES.wp(18 / 4.2), // Prevent extra padding
  },
});
