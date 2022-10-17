import { Box, Button } from '@chakra-ui/react';
import Header from '../Header/Header';
import useTrips from '../../hooks/useTrips';

export default function HomePage() {
  const { trips, loading } = useTrips();

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
