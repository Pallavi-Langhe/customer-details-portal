import React from 'react';
import { useDataLoading } from '../contexts/DataLoadingContext';
import '../styles/CustomerDetails.css';
import PhotoGrid from './PhotoGrid';

const CustomerDetails: React.FC = () => {
  const { state } = useDataLoading();
  const { selectedCustomer } = state;

  if (!selectedCustomer) {
    return (
      <div className="customer-details">Select a customer to view details</div>
    );
  }

  return (
    <div className="customer-details">
      <h2>{selectedCustomer.name}</h2>
      <p>Title: {selectedCustomer.title}</p>
      <p>Address: {selectedCustomer.address}</p>
      <PhotoGrid />
    </div>
  );
};

export default CustomerDetails;
