import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ViewStyle,
  Platform,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '@app/themes/themes';

type Props = {
  children: React.ReactNode;
  statusbar?: string;
  barStyle?: string;
  insetsBottom?: Boolean;
  containerStyle?: ViewStyle;
  backgroundColor?: string;
};

const SafeAreaWrapper = (props: Props) => {
  const {
    children,
    statusbar = '#fff',
    barStyle = 'dark-content',
    containerStyle,
    backgroundColor,
    insetsBottom = true,
  } = props;
  const insets = useSafeAreaInsets();

  const CustomStatusBar = ({backgroundColor, barStyle}: any) => {
    return (
      <View style={{height: insets.top, backgroundColor}}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
          barStyle={barStyle}
          translucent={true}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CustomStatusBar backgroundColor={statusbar} barStyle={barStyle} />
      <View
        style={{
          ...styles.container(props.backgroundColor, insets, insetsBottom),
          ...containerStyle,
        }}>
        {children}
      </View>
    </View>
  );
};

export default SafeAreaWrapper;

const styles = StyleSheet.create({
  container: (bg = COLORS.white, insets, insetsBottom): any => ({
    flex: 1,
    backgroundColor: bg,
    paddingHorizontal: 0,
    paddingBottom: insetsBottom
      ? Platform.OS === 'ios'
        ? insets.bottom
        : 0
      : 0,
  }),
});
