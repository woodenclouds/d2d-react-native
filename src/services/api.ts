import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAP_BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';
const map_access_token =
  'pk.eyJ1Ijoic3lkLWFhbWlyIiwiYSI6ImNtMzlydG10cjE3NXQybHJ4cXJlOGR4dW0ifQ.ueSpn_8F4nz3cExguWjqEQ';

export const getDirections = async (from: number[], to: number[]) => {
  const url = `${MAP_BASE_URL}/walking/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${map_access_token}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const API_BASE_URL = 'https://beta-api.d2dhealthcare.ca/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/accounts/login/`, {
      email,
      password,
    });

    if (response.data.StatusCode === 6000) {
      const {access, refresh} = response.data.data.response;
      const userId = response.data.data.user_id;
      const role = response.data.data.role;
      const name = response.data.data.name;
      const is_delivery_manager = response.data.data.is_delivery_manager;

      // Store tokens in AsyncStorage
      await AsyncStorage.setItem('authToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
      await AsyncStorage.setItem('userId', userId.toString());
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem(
        'isDeliveryManager',
        is_delivery_manager.toString(),
      );

      // Set Authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      return {access, refresh, userId, role, name, is_delivery_manager};
    } else {
      throw new Error('Invalid login credentials');
    }
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

// Employee Check-In API
export const checkInEmployee = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.post(
      '/attendances/employee/checkin/',
      {},
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Check-in failed:', error);
    throw error;
  }
};

export const leaveRequest = async (reason: string, start_date: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.post(
      'attendances/create/leave-request/',
      {
        reason,
        start_date,
      },
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Leave request failed:', error);
    throw error;
  }
};

export const deliveryAgents = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get(
      '/accounts/delivery-agents/',
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Delivery agents failed:', error);
    throw error;
  }
};

export const assignDriver = async (agent_id: any, orderid: any) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.post(
      `/orders/assign/delivery-agent/${orderid}/`,
      {
        delivery_agent: agent_id,
      },
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Assign driver failed:', error);
    throw error;
  }
};

export const assignedOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get(
      '/orders/delivery-agent/orders/?order_type=assigned&is_delivered=false',
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Assigned orders failed:', error);
    throw error;
  }
};

export const unassignedOrders = async (page: number = 1) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get(
      `/orders/?status=ready_to_dispatch&page=${page}`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Assigned orders failed:', error);
    throw error;
  }
};

export const pickupOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get(
      '/orders/delivery-agent/orders/?order_type=assigned&order_status=in_transit',
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Assigned orders failed:', error);
    throw error;
  }
};

export const attemptedOrders = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get(
      '/orders/delivery-agent/orders/?order_type=assigned&order_status=attempted',
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Assigned orders failed:', error);
    throw error;
  }
};

export const filteredOrder = async (
  order_type: string,
  pharmacy: string,
  order_status: string,
  delivery_type: string,
) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get(
      `/orders/delivery-agent/orders/?order_type=${order_type}&pharmacy=${pharmacy}&order_status=${order_status}&delivery_type=${delivery_type}`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Assigned orders failed:', error);
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get('/notifications/', {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  } catch (error) {
    console.error('Notifications failed:', error);
    throw error;
  }
};

// Order reports API
export const orderReports = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get('/orders/delivery-agent/reports/', {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data.data;
  } catch (error) {
    console.error('Order reports failed:', error);
    throw error;
  }
};

export const orderHistory = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get('/orders/delivery-agent/order-history/', {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  } catch (error) {
    console.error('Order history failed:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get('/accounts/delivery-agent/profile/', {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  } catch (error) {
    console.error('Profile failed:', error);
    throw error;
  }
};

export const getAttendances = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get('/attendances/attendances/', {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  } catch (error) {
    console.error('Attendances failed:', error);
    throw error;
  }
};

export const getPharmacies = async (search: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get(`/accounts/pharmacies/?q=` + search, {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  } catch (error) {
    console.error('Pharmacies failed:', error);
    throw error;
  }
};

export const submitDeliveryUpdate = async (
  orderId: string,
  deliveryStatus: string,
  signature: string | null, // Base64 string from AuthContext
  isBulk: boolean, // Boolean for bulk order
  notes: string,
  amount: string,
  paymentMethod: string,
  images: string[], // URIs from react-native-image-picker
) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const formData = new FormData();

    // Add signature as base64 (or convert to blob if backend requires file)
    if (signature) {
      formData.append('signature', {
        uri: `${signature}`, // Use base64 as URI
        type: 'image/png', // MIME type
        name: 'signature.png', // File name for backend
      });
    }

    formData.append('is_bulk', isBulk.toString());
    formData.append('notes', notes);
    formData.append('amount', amount);
    formData.append('payment_method', paymentMethod);

    for (const imageUri of images) {
      console.log('image uri');

      const fileName =
        imageUri.split('/').pop() || `image${images.indexOf(imageUri)}.png`;
      const fileType = 'image/png'; // Adjust based on your image type (e.g., 'image/jpeg')

      // For React Native, we need to handle the URI and convert it to a blob or file
      const response = await fetch(imageUri);
      const blob = await response.blob();

      formData.append('images', {
        uri: imageUri,
        type: fileType,
        name: fileName,
      } as any); // Type assertion for FormData compatibility
    }

    const response = await api.post(
      `/orders/delivery-agent/delivery-update/${orderId}/?order_status=${deliveryStatus.toLocaleLowerCase()}&delivery_type=delivery`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Explicitly set for FormData
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Delivery update failed:', error);
    throw error;
  }
};

export const submitAttemptedOrder = async (
  orderId: string,
  notes: string,
  delivery_type: string,
) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.post(
      `/orders/delivery-agent/delivery-update/${orderId}/?order_status=attempted&delivery_type=${delivery_type}`,
      {
        notes: notes,
      },
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Attempted order failed:', error);
    throw error;
  }
};

export const PharmacyWiseOrders = async (pharmacy: string, status: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.get(
      `/orders/?pharmacy=${pharmacy}&status=${status}&is_mobile=true`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Orders failed:', error);
    throw error;
  }
};

export const submitPickupOrder = async (
  orderId: string,
  notes: string,
  delivery_type: string,
) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.post(
      `/orders/delivery-agent/delivery-update/${orderId}/?order_status=in_transit&delivery_type=${delivery_type}`,
      {
        notes: notes,
      },
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Pickup order failed:', error);
    throw error;
  }
};

// Employee Check-Out API
export const checkOutEmployee = async (checkin_id: number) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.post(
      '/attendances/employee/checkout/',
      {
        checkin_id,
      },
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );

    return response.data;
  } catch (error) {
    console.error('Check-in failed:', error);
    throw error;
  }
};

// Attach Authorization Token (if available)
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;
