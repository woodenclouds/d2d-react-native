import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '@app/themes/themes';
import Button from '@app/components/Button';
import DatePicker from 'react-native-date-picker';
import {useToast} from 'react-native-toast-notifications';
import {leaveRequest} from '@app/services/api';

type Props = {
  setVisible: (data: boolean) => void;
};

const LeaveRequestModal = (props: Props) => {
  const {setVisible} = props;
  const [selectedDate, setSelectedDate] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [reason, setReason] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const toast = useToast();

  const handleLeaveRequest = async () => {
    try {
      const response = await leaveRequest(reason, selectedDate);
      console.log('Leave request response:', response);
      setVisible(false);
      showToast();
    } catch (error) {
      console.error('Leave request failed:', error);
    }
  };

  const CustomToast = () => {
    return (
      <View style={styles.customToast}>
        <Text style={styles.toastText}>Leave request submitted</Text>
      </View>
    );
  };

  const showToast = () => {
    toast.show('', {
      data: {renderToast: () => CustomToast()},
    });
  };

  // Show the date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide the date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle the date confirmation from the picker
  const handleDateConfirm = (date: Date) => {
    // Format the date as "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.smallDash}></View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Leave request</Text>
      </View>
      <View style={styles.DashLine}></View>

      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select date</Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={styles.placeholderText}>
              {selectedDate || 'Select date of leave'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Reason for leave</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter reason for leave"
            value={reason}
            onChangeText={setReason}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <Button
          onPressFunction={() => {
            handleLeaveRequest();
          }}
          label={'Submit'}
        />
      </View>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={isDatePickerVisible}
        date={selectedDate ? new Date(selectedDate) : new Date()}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        mode="date"
        // format="MM-DD-YYYY"
      />
    </View>
  );
};

export default LeaveRequestModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  smallDash: {
    width: SIZES.wp(48 / 4.2),
    height: SIZES.wp(4 / 4.2),
    backgroundColor: '#7E7E7E',
    borderRadius: SIZES.wp(30 / 4.2),
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.wp(20 / 4.2),
    marginBottom: SIZES.wp(16 / 4.2),
  },
  titleText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(16 / 4.2),
    color: '#474747',
    marginLeft: SIZES.wp(12 / 4.2),
  },
  DashLine: {
    width: '100%',
    height: SIZES.wp(1 / 4.2),
    backgroundColor: '#F5F7FA',
    marginBottom: SIZES.wp(20 / 4.2),
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: SIZES.wp(16 / 4.2),
  },
  inputContainer: {
    marginBottom: SIZES.wp(16 / 4.2),
  },
  label: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#7E7E7E',
    marginBottom: SIZES.wp(8 / 4.2),
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: SIZES.wp(8 / 4.2),
    padding: SIZES.wp(12 / 4.2),
    backgroundColor: '#FFFFFF',
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
  },
  textArea: {
    height: SIZES.wp(100 / 4.2), // Adjust height for multiline input
    textAlignVertical: 'top',
  },
  placeholderText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#7E7E7E',
  },
  customToast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: SIZES.wp(13 / 4.2),
    paddingHorizontal: SIZES.wp(25 / 4.2),
    borderRadius: SIZES.wp(34 / 4.2),
    bottom: SIZES.wp(100 / 4.2),
  },
  tickIcon: {
    marginRight: SIZES.wp(10 / 4.2),
    position: 'absolute',
    left: SIZES.wp(-10 / 4.2),
    top: SIZES.wp(-13 / 4.2),
  },
  toastText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(12 / 4.2),
    color: COLORS.primary,
  },
});
