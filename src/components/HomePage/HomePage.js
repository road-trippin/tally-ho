import Header from '../Header/Header';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import useTrips from '../../hooks/useTrips';
import { deleteTrip, deleteTripWaypoints } from '../../services/trips';
import { useState } from 'react';
import homeVan from '../../homeVan.jpg';

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
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  if (!user) return <Redirect to="/auth/sign-in" />;

  return (
    <>
      <Header />

      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <Flex
            align="center"
            justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            mb={16}
          >
            <Stack
              spacing={4}
              w={{ base: '80%', md: '40%' }}
              align={['center', 'center', 'flex-start', 'flex-start']}
            >
              <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                color="primary.800"
                textAlign={['center', 'center', 'left', 'left']}
              >
                Time to Hit the Road!
              </Heading>
              <Heading
                as="h2"
                size="md"
                color="primary.800"
                opacity="0.8"
                fontWeight="normal"
                lineHeight={1.5}
                textAlign={['center', 'center', 'left', 'left']}
              >
                Your Saved Trips:
              </Heading>
              <Box maxWidth="500px" marginX="auto" boxShadow="2xl" rounded="1rem" padding="30px">
                <Accordion allowToggle={true}>
                  {trips.map((trip) => (
                    <AccordionItem key={trip.id}>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {trip.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel padding="10px">
                        <Button onClick={() => handleEditTrip(trip.id)}>Edit</Button>
                        <Button onClick={() => handleDeleteTrip(trip.id, trip.title)}>
                          Delete
                        </Button>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Box>
              <span>{deleteMessage}</span>
              <Link to="/new-trip">
                <Button variant="solid" shadow="2xl" colorScheme="teal" marginY="20px" size="lg">
                  Create a New Trip
                </Button>
              </Link>
            </Stack>
            <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
              <Image src={homeVan} size="100%" rounded="1rem" shadow="2xl" />
            </Box>
          </Flex>
        </div>
      )}
    </>
  );
}
