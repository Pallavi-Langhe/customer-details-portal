import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useCallback,
} from 'react';
import { Customer } from '../types/Customer';
import { generateCustomers } from '../utils/generateCustomers';

type DataLoadingState = {
  isCustomersLoading: boolean;
  isPhotosLoading: boolean;
  customers: Customer[];
  selectedCustomer: Customer | null;
};

type DataLoadingAction =
  | { type: 'SET_CUSTOMERS_LOADING'; payload: boolean }
  | { type: 'SET_PHOTOS_LOADING'; payload: boolean }
  | { type: 'SET_CUSTOMERS'; payload: Customer[] }
  | { type: 'SET_SELECTED_CUSTOMER'; payload: Customer | null };

const initialState: DataLoadingState = {
  isCustomersLoading: true,
  isPhotosLoading: true,
  customers: [],
  selectedCustomer: null,
};

type DataLoadingContextType = {
  state: DataLoadingState;
  dispatch: Dispatch<DataLoadingAction>;
  onSelectCustomer: (customer: Customer) => void;
  fetchCustomers: (count: number) => Promise<void>;
};

const DataLoadingContext = createContext<DataLoadingContextType | undefined>(
  undefined
);

const dataLoadingReducer = (
  state: DataLoadingState,
  action: DataLoadingAction
): DataLoadingState => {
  switch (action.type) {
    case 'SET_CUSTOMERS_LOADING':
      return { ...state, isCustomersLoading: action.payload };
    case 'SET_PHOTOS_LOADING':
      return { ...state, isPhotosLoading: action.payload };
    case 'SET_CUSTOMERS':
      return { ...state, customers: action.payload };
    case 'SET_SELECTED_CUSTOMER':
      return { ...state, selectedCustomer: action.payload };
    default:
      return state;
  }
};

export const DataLoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dataLoadingReducer, initialState);

  const onSelectCustomer = useCallback((customer: Customer) => {
    dispatch({ type: 'SET_SELECTED_CUSTOMER', payload: customer });
  }, []);

  const fetchCustomers = useCallback(async (count: number) => {
    dispatch({ type: 'SET_CUSTOMERS_LOADING', payload: true });
    try {
      const generatedCustomers = await generateCustomers(count);
      dispatch({ type: 'SET_CUSTOMERS', payload: generatedCustomers });
    } finally {
      dispatch({ type: 'SET_CUSTOMERS_LOADING', payload: false });
    }
  }, []);

  return (
    <DataLoadingContext.Provider
      value={{ state, dispatch, onSelectCustomer, fetchCustomers }}
    >
      {children}
    </DataLoadingContext.Provider>
  );
};

export const useDataLoading = (): DataLoadingContextType => {
  const context = useContext(DataLoadingContext);
  if (context === undefined) {
    throw new Error('useDataLoading must be used within a DataLoadingProvider');
  }
  return context;
};
