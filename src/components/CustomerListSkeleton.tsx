import React from 'react';
import '../styles/CustomerListSkeleton.css';

const CustomerListSkeleton: React.FC = () => {
  return (
    <div className="customer-list skeleton">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="customer-card-skeleton">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-text"></div>
        </div>
      ))}
    </div>
  );
};

export default CustomerListSkeleton;
