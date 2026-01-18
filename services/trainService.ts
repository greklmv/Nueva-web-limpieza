import { MOCK_TRAINS } from '../constants';
import { Train } from '../types';

const DELAY_MS = 800;

export const trainService = {
  getTrains: async (): Promise<Train[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_TRAINS]);
      }, DELAY_MS);
    });
  },

  getTrainById: async (id: string): Promise<Train | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const train = MOCK_TRAINS.find((t) => t.id === id);
        resolve(train);
      }, DELAY_MS / 2); // Faster for single item
    });
  },
};
