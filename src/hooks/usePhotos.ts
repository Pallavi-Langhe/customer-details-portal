import { useState, useEffect, useCallback } from 'react';
import { Photo } from '../types/Photo';
import { useDataLoading } from '../contexts/DataLoadingContext';

const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { dispatch } = useDataLoading();

  const fetchPhotos = useCallback(async () => {
    try {
      const page = Math.floor(Math.random() * 11);
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=9`
      );
      const data: Photo[] = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'SET_PHOTOS_LOADING', payload: true });
    fetchPhotos().finally(() => {
      dispatch({ type: 'SET_PHOTOS_LOADING', payload: false });
    });
  }, [fetchPhotos, dispatch]);

  return { photos, refreshPhotos: fetchPhotos };
};

export default usePhotos;
