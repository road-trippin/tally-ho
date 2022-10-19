import Header from '../Header/Header';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Text } from '@chakra-ui/react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import useTrips from '../../hooks/useTrips';
import { deleteTrip, deleteTripWaypoints } from '../../services/trips';
import { useState } from 'react';

export default function HomePage() {
  const { user } = useUserContext();
  const { trips, setTrips, loading } = useTrips();
  const history = useHistory();

  const [deleteMessage, setDeleteMessage] = useState('');

  if (deleteMessage) {
    setTimeout(() => {
      setDeleteMessage('');
    }, 5000);
  }

  const handleEditTrip = (id) => {
    history.push(`/trip/${id}`);
  };

  const handleDeleteTrip = async (id, tripTitle) => {
    await deleteTripWaypoints(id);
    await deleteTrip(id);
    setDeleteMessage(`Successfully deleted ${tripTitle}`);
    setTrips(trips.filter(trip => trip.id !== id));
  };

  if (!user) return <Redirect to="/auth/sign-in" />;

  return <>
    <Header />
    <Link to="/new-trip">
      <Button marginY="20px">Create a New Trip</Button>
    </Link>
    {loading
      ? <p>loading...</p>
      : <div>
        <Box
          maxWidth="500px"
          marginX="auto"
          boxShadow="lg"
          rounded="lg"
          padding="10px"
        >
          <Text textAlign="left" fontSize="1.5rem">Your Trips</Text>
          <Accordion allowToggle={true}>
            {trips.map(trip => (
              <AccordionItem key={trip.id}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {trip.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel padding="10px">
                  <Button onClick={() => handleEditTrip(trip.id)}>Edit</Button>
                  <Button onClick={()=> handleDeleteTrip(trip.id, trip.title)}>Delete</Button>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        <span>{deleteMessage}</span>
      </div>
    }
  </>;
}
