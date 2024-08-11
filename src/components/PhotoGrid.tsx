import React, { useState, useEffect, useCallback } from 'react';
import usePhotos from '../hooks/usePhotos';
import { useDataLoading } from '../contexts/DataLoadingContext';
import '../styles/PhotoGrid.css';

const PhotoGrid: React.FC = () => {
  const { photos, refreshPhotos } = usePhotos();
  const { state } = useDataLoading();
  const [countdown, setCountdown] = useState(10);

  const resetCountdown = useCallback(() => {
    setCountdown(10);
    refreshPhotos();
  }, [refreshPhotos]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          resetCountdown();
          return 10;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resetCountdown]);

  if (state.isPhotosLoading && photos.length === 0) {
    return <div className="photo-grid-skeleton"></div>;
  }

  return (
    <div className="photo-grid-container">
      <h2>Photo grid will fetch new photos every 10 seconds</h2>
      <p>Next refresh in: {countdown} seconds</p>
      <div className="photo-grid">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.download_url}
            alt={`Photo by ${photo.author}`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(PhotoGrid);
