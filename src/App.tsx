import React, { Suspense, lazy } from 'react';
import { DataLoadingProvider } from './contexts/DataLoadingContext';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const CustomerList = lazy(() => import('./components/CustomerList'));
const CustomerDetails = lazy(() => import('./components/CustomerDetails'));

const App: React.FC = () => {
  return (
    <DataLoadingProvider>
      <div className="app">
        <Suspense fallback={<LoadingSpinner />}>
          <CustomerList />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <CustomerDetails />
        </Suspense>
      </div>
    </DataLoadingProvider>
  );
};

export default App;
