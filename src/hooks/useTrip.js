import { useEffect, useState } from 'react';
import { getTripById } from '../services/trips';

export function useTrip(id) {
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        const data = await getTripById(id);
        setTrip(data);
        setLoading(false);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    fetchTrip();
  }, [id]);

  return { trip, setTrip, loading };
}
