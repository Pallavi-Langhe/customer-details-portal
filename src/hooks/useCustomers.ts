import { useState, useEffect } from 'react';
import { generateCustomers } from '../utils/generateCustomers';
import { useDataLoading } from '../contexts/DataLoadingContext';
import { Customer } from '../types/Customer';

const useCustomers = (count: number = 1000) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { dispatch } = useDataLoading();

  useEffect(() => {
    const fetchCustomers = async () => {
      dispatch({ type: 'SET_CUSTOMERS_LOADING', payload: true });
      try {
        const generatedCustomers = await generateCustomers(count);
        setCustomers(generatedCustomers);
      } finally {
        dispatch({ type: 'SET_CUSTOMERS_LOADING', payload: false });
      }
    };

    fetchCustomers();
  }, [count, dispatch]);

  return customers;
};

export default useCustomers;
