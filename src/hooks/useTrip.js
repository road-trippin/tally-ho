import { useEffect, useState } from 'react';
import { getTripById } from '../services/trips';

export function useTrip(id) {
  const [trip, setTrip] = useState({});
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await getTripById(id);
        setTrip(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    fetchTrip();
  }, [id]);

  return { trip, setTrip };
}