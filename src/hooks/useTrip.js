import { useEffect, useState } from 'react';
import { getTripById } from '../services/trips';

export function useTrip(id) {
  const [trip, setTrip] = useState({});
  const [tripNotes, setTripNotes] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await getTripById(id);
        setTrip(data);
        setTripNotes(data.notes);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    fetchTrip();
  }, [id]);

  return { trip, setTrip, tripNotes, setTripNotes };
}