import React, { useEffect, useMemo } from 'react';
import CustomerCard from './CustomerCard';
import CustomerListSkeleton from './CustomerListSkeleton';
import { useDataLoading } from '../contexts/DataLoadingContext';
import '../styles/CustomerList.css';

const CustomerList: React.FC = React.memo(() => {
  const { state, onSelectCustomer, fetchCustomers } = useDataLoading();
  const { isCustomersLoading, customers, selectedCustomer } = state;

  useEffect(() => {
    fetchCustomers(1000);
  }, [fetchCustomers]);

  const customerCards = useMemo(() => {
    return customers.map((customer) => (
      <CustomerCard
        key={customer.id}
        customer={customer}
        onClick={() => onSelectCustomer(customer)}
        isSelected={customer.id === selectedCustomer?.id}
      />
    ));
  }, [customers, onSelectCustomer, selectedCustomer]);

  if (isCustomersLoading) {
    return <CustomerListSkeleton />;
  }

  return <div className="customer-list">{customerCards}</div>;
});

export default CustomerList;
