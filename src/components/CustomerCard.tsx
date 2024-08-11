import React from 'react';
import { Customer } from '../types/Customer';
import '../styles/CustomerCard.css';

interface Props {
  customer: Customer;
  onClick: () => void;
  isSelected: boolean;
}

const CustomerCard: React.FC<Props> = ({ customer, onClick, isSelected }) => {
  return (
    <div
      className={`customer-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="customer-info">
        <h3 className="customer-name">{customer.name}</h3>
        <p className="customer-title">{customer.title}</p>
      </div>
    </div>
  );
};

export default React.memo(CustomerCard);