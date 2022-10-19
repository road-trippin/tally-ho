import { useEffect } from 'react';
import { useState } from 'react';
import { getAllTrips } from '../services/trips';

export default function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const trips = await getAllTrips();
        setTrips(trips);
        setLoading(false);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    fetchTrips();
  }, []);

  return { trips, setTrips, loading };
}
