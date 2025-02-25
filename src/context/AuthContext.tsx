import React, {createContext, useReducer, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {loginUser, checkInEmployee, checkOutEmployee} from '@app/services/api';

// Define State Type
interface AuthState {
  authToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  role: string | null;
  name: string | null;
  loading: boolean;
  error: string | null;
  checkInStatus: boolean;
  checkInId: string | null;
  signature: string | null;
  orderDetailsUpdated: boolean;
}

// Define Action Types
type AuthAction =
  | {
      type: 'LOGIN_SUCCESS';
      payload: {
        authToken: string;
        refreshToken: string;
        userId: number;
        role: string;
        name: string;
      };
    }
  | {type: 'SET_ERROR'; payload: string}
  | {type: 'LOGOUT'}
  | {type: 'CHECK_IN'; payload: string | null}
  | {type: 'SET_SIGNATURE'; payload: string} // Add action for setting signature
  | {type: 'CLEAR_SIGNATURE'} // Add action for clearing signature
  | {type: 'SET_ORDER_DETAILS_UPDATED'; payload: boolean} // Action for setting order details updated
  | {type: 'RESET_ORDER_DETAILS_UPDATED'};

// Initial State
const initialState: AuthState = {
  authToken: null,
  refreshToken: null,
  userId: null,
  role: null,
  name: null,
  loading: true,
  error: null,
  checkInStatus: false,
  checkInId: null,
  signature: null,
  orderDetailsUpdated: false,
};

// Reducer Function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
        role: action.payload.role,
        name: action.payload.name,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {...state, error: action.payload, loading: false};
    case 'LOGOUT':
      return {...initialState, loading: false}; // Reset to initial state except loading
    case 'CHECK_IN':
      return {...state, checkInId: action.payload};
    case 'SET_SIGNATURE':
      return {...state, signature: action.payload}; // Set signature
    case 'CLEAR_SIGNATURE':
      return {...state, signature: null}; // Clear signature
    case 'SET_ORDER_DETAILS_UPDATED':
      return {...state, orderDetailsUpdated: action.payload}; // Set order details updated
    case 'RESET_ORDER_DETAILS_UPDATED':
      return {...state, orderDetailsUpdated: false};
    default:
      return state;
  }
};

// Create Context Type
interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkIn: () => Promise<void>;
  checkOut: (checkin_id: number) => Promise<void>;
  setSignature: (signature: string) => void; // Add method to set signature
  clearSignature: () => void; // Add method to clear
  setOrderDetailsUpdated: (updated: boolean) => void; // Method to set order details updated
  resetOrderDetailsUpdated: () => void; // Method to reset order details updated
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load Token from AsyncStorage on App Start
  useEffect(() => {
    const loadToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const userId = await AsyncStorage.getItem('userId');
        const role = await AsyncStorage.getItem('userRole');
        const name = await AsyncStorage.getItem('userName');
        const checkInId = await AsyncStorage.getItem('checkInId');

        if (authToken && refreshToken && userId && role && name) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${authToken}`;
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              authToken,
              refreshToken,
              userId: parseInt(userId, 10),
              role,
              name,
            },
          });

          if (checkInId) {
            dispatch({type: 'CHECK_IN', payload: checkInId});
          }
        } else {
          dispatch({type: 'LOGOUT'});
        }
      } catch (error) {
        dispatch({type: 'SET_ERROR', payload: (error as Error).message});
      }
    };

    loadToken();
  }, []);

  // Login Function
  const login = async (email: string, password: string) => {
    try {
      const {access, refresh, userId, role, name} = await loginUser(
        email,
        password,
      ); // Call API

      // Store in AsyncStorage
      await AsyncStorage.setItem('authToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
      await AsyncStorage.setItem('userId', userId.toString());
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userName', name);

      // Set global auth headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      // Dispatch login action
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {authToken: access, refreshToken: refresh, userId, role, name},
      });
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: (error as Error).message});
    }
  };

  // Employee Check-In Function
  // Employee Check-In Function
  const checkIn = async () => {
    try {
      const response = await checkInEmployee(); // Call Check-in API

      if (response?.StatusCode === 6000) {
        const checkInId = response.checkin.toString();

        // Store check-in ID in AsyncStorage
        await AsyncStorage.setItem('checkInId', checkInId);

        dispatch({type: 'CHECK_IN', payload: checkInId});
      } else {
        throw new Error(response?.message || 'Check-in failed');
      }
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: (error as Error).message});
    }
  };

  const checkOut = async (checkin_id: number) => {
    try {
      const response = await checkOutEmployee(checkin_id);

      if (response?.StatusCode === 6000) {
        // Store check-in ID in AsyncStorage
        await AsyncStorage.removeItem('checkInId');

        dispatch({type: 'CHECK_IN', payload: null});
      } else {
        throw new Error(response?.message || 'Check-out failed');
      }
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: (error as Error).message});
    }
  };
  // Logout Function
  const logout = async () => {
    await AsyncStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: 'LOGOUT'});
  };

  // Method to set signature in context
  const setSignature = (signature: string) => {
    dispatch({type: 'SET_SIGNATURE', payload: signature});
  };

  // Method to clear signature from context
  const clearSignature = () => {
    dispatch({type: 'CLEAR_SIGNATURE'});
  };

  // Method to set order details updated
  const setOrderDetailsUpdated = (updated: boolean) => {
    dispatch({type: 'SET_ORDER_DETAILS_UPDATED', payload: updated});
  };

  // Method to reset order details updated
  const resetOrderDetailsUpdated = () => {
    dispatch({type: 'RESET_ORDER_DETAILS_UPDATED'});
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        checkIn,
        checkOut,
        setSignature,
        clearSignature,
        setOrderDetailsUpdated,
        resetOrderDetailsUpdated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for using Auth Context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
