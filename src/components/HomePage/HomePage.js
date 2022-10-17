import Header from '../Header/Header';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Text } from '@chakra-ui/react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import useTrips from '../../hooks/useTrips';

export default function HomePage() {
  const { user } = useUserContext();
  const { trips, loading } = useTrips();
  const history = useHistory();

  const handleEditTrip = (id) => {
    history.push(`/trip/${id}`);
  };

  if (!user) return <Redirect to="/auth/sign-in" />;

  return <>
    <Header />
    <Link to="/new-trip">
      <Button marginY="20px">Create a New Trip</Button>
    </Link>
    {loading
      ? <p>loading...</p>
      : <Box
        maxWidth="500px"
        marginX="auto"
        boxShadow="lg"
        rounded="lg"
        padding="10px"
      >
        <Text textAlign="left" fontSize="1.5rem">Your Trips</Text>
        <Accordion>
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
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>}
  </>;
}
