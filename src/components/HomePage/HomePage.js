import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTrips } from '../../services/trips';
import Header from '../Header/Header';

export default function HomePage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllTrips()
      .then(trips => {
        setTrips(trips);
        setLoading(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  return <>
    <Header />
    <Button>Create a New Trip</Button>
    {loading
      ? <p>loading...</p>
      : <Box>
        Your Trips
        <ul>
          {trips.map(trip => <li key={trip.id}>{trip.title}</li>)}
        </ul>
      </Box>}
  </>;
}
