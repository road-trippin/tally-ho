import Header from '../Header/Header';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import useTrips from '../../hooks/useTrips';

export default function HomePage() {
  const { trips, loading } = useTrips();
  const history = useHistory();

  const handleEditTrip = (id) => {
    history.push(`/trip/${id}`);
  };

  return <>
    <Header />
    <Button marginY="20px">Create a New Trip</Button>
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
