import { useState, useEffect } from 'react';
import { Train } from '../types';
import { trainService } from '../services/trainService';

export const useTrains = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        setIsLoading(true);
        const data = await trainService.getTrains();
        setTrains(data);
      } catch (err) {
        setError('Failed to load trains');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrains();
  }, []);

  return { trains, isLoading, error };
};
