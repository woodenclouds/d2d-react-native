import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import SafeAreaWrapper from '@app/components/SafeAreaWrapper';
import CommonHeader from '@app/components/CommonHeader';
import ThreeDots from '@app/assets/icons/three_dots.svg';
import EditIcon from '@app/assets/icons/edit_icon.svg';
import SignoutIcon from '@app/assets/icons/signout_icon.svg';
import {COLORS, SIZES, FONTS} from '@app/themes/themes';
import TabItems from './includes/TabItems';
import {getProfile, getAttendances} from '@app/services/api';
import SigninButton from '../home-screen/includes/SigninButton';
import SignOutModal from './includes/SignOutModal';
import CenterModalBox from '@app/components/CenterModalBox';
import {useAuth} from '../../context/AuthContext';
import {CommonActions, useNavigation} from '@react-navigation/native';
import BottomModal from '@app/components/BottomModal';
import LeaveRequestModal from './includes/LeaveRequestModal';

type Props = {};

const ProfileScreen = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileDetails, setProfileDetails] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [leaveRequestModalVisible, setLeaveRequestModalVisible] =
    useState(false);
  const navigation = useNavigation();
  const {logout} = useAuth();

  const fetchProfileDetails = async () => {
    try {
      const data = await getProfile(); // Call API
      setProfileDetails(data.data); // Store data in state
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendances = async () => {
    try {
      const data = await getAttendances(); // Call API
      setAttendances(data.data); // Store data in state
    } catch (err) {
      setAttendanceError('Failed to load orders');
    } finally {
      setAttendanceLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
    fetchAttendances();
  }, []);

  // Open Menu with Animation
  const openMenu = () => {
    setMenuVisible(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Close Menu with Animation
  const closeMenu = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const handleSignOut = () => {
    logout().then(() => {
      setModalVisible(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignupScreen'}],
        }),
      );
    });
  };

  return (
    <SafeAreaWrapper backgroundColor="#F5F7FA" barStyle="dark-content">
      <CommonHeader
        headingText="Profile"
        rightIcon={true}
        additionIconFunction={openMenu}
        icon={<ThreeDots />}
      />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}></View>
          <Text style={styles.nameText}>{profileDetails?.name}</Text>
          <Text style={styles.idText}>ID : {profileDetails?.agent_id}</Text>
        </View>
      </View>
      <TabItems data={profileDetails} attendances={attendances} />

      {/* Small Corner Menu */}
      {menuVisible && (
        <>
          <TouchableOpacity style={styles.overlay} onPress={closeMenu}>
            <Animated.View
              style={[styles.menuContainer, {transform: [{scale: scaleAnim}]}]}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setLeaveRequestModalVisible(true)}>
                <EditIcon />
                <Text style={styles.menuText}>Leave Request</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setModalVisible(true)}>
                <SignoutIcon />
                <Text style={[styles.menuText, {color: '#D14B4B'}]}>
                  Sign Out
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
          <CenterModalBox
            isVisible={modalVisible}
            onBackButtonPress={() => {
              setModalVisible(false);
            }}
            onBackdropPress={() => {
              setModalVisible(false);
            }}
            children={
              <SignOutModal
                setModalVisible={setModalVisible}
                onPress={handleSignOut}
              />
            }
          />
          <BottomModal
            children={
              <LeaveRequestModal setVisible={setLeaveRequestModalVisible} />
            }
            isVisible={leaveRequestModalVisible}
            setVisible={setLeaveRequestModalVisible}
          />
        </>
      )}
    </SafeAreaWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SIZES.wp(20 / 4.2),
    marginTop: SIZES.wp(20 / 4.2),
  },
  topContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.wp(32 / 4.2),
    borderRadius: SIZES.wp(16 / 4.2),
  },
  imageContainer: {
    width: SIZES.wp(88 / 4.2),
    height: SIZES.wp(88 / 4.2),
    borderRadius: SIZES.wp(100 / 4.2),
    backgroundColor: '#F5F7FA',
    borderWidth: SIZES.wp(1 / 4.2),
    borderColor: COLORS.primary,
  },
  nameText: {
    ...FONTS.medium,
    fontSize: SIZES.wp(18 / 4.2),
    color: '#272727',
    marginTop: SIZES.wp(16 / 4.2),
    marginBottom: SIZES.wp(8 / 4.2),
  },
  idText: {
    ...FONTS.regular,
    fontSize: SIZES.wp(14 / 4.2),
    color: '#676767',
  },
  // Overlay Background
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  // Menu Container
  menuContainer: {
    position: 'absolute',
    top: SIZES.hp(16 / 4.2),
    right: SIZES.wp(20 / 4.2),
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
  },
  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuText: {
    fontSize: SIZES.wp(14 / 4.2),
    ...FONTS.regular,
    color: '#212529',
    marginLeft: SIZES.wp(8 / 4.2),
  },
});
