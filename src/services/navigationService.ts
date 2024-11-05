import {RootStackType} from '../navigations/NavigationType';
import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<RootStackType>();

export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function resetNavigation(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: name}],
      }),
    );
  }
}

export function navigateBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
