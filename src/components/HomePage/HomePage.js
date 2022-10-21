import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import { Box, Button, Flex, Heading, IconButton, Stack, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import useTrips from '../../hooks/useTrips';
import { deleteTrip, deleteTripWaypoints } from '../../services/trips';
import { useState } from 'react';
import backgroundImage from '../../homeVan.jpg';
import 'animate.css';
import './HomePage.css';

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
      <Header
        navLinks={[
          { text: 'New Trip', path: '/new-trip' },
          { text: 'About', path: '/about' }
        ]}
      />

      {loading ? (
        <Loader />
      ) : (
        <Flex
          backgroundImage={backgroundImage}
          backgroundSize="cover"
          backgroundPosition="bottom-left"
          justifyContent="center"
        >
          <Flex alignContent="center" justifyContent="space-around">
            <Flex direction="column" alignItems="center">
              <span className="animate__animated animate__lightSpeedInLeft brand note">
                TIME TO HIT THE ROAD!
              </span>
              <Box
                marginX="auto"
                boxShadow="dark-lg"
                rounded="1rem"
                padding="30px"
                minWidth="400px"
                w={{ base: '80%', sm: '60%', md: '50%' }}
                mb={{ base: 12, md: 0 }}
                backgroundColor="white"
                height="400px"
                marginTop="60px"
              >
                <Flex justifyContent="center">
                  <Heading
                    as="h1"
                    size="lg"
                    color="#FD9834"
                    opacity="0.8"
                    fontWeight="bold"
                    lineHeight={1.5}
                    borderBottom="3px solid #006D77"
                    paddingBottom="10px"
                    marginBottom="15px"
                  >
                    Your Saved Trips:
                  </Heading>
                </Flex>
                <Stack spacing={5} backgroundColor="white">
                  {trips.length > 0 ? (
                    trips.map((trip) => (
                      <Flex key={trip.id} justify="space-between">
                        <Button
                          variant="ghost"
                          colorScheme="teal"
                          size="lg"
                          onClick={() => handleEditTrip(trip.id)}
                        >
                          {trip.title}
                        </Button>
                        <IconButton
                          aria-label="Delete Item"
                          icon={<DeleteIcon />}
                          variant="ghost"
                          colorScheme="teal"
                          onClick={() => handleDeleteTrip(trip.id, trip.title)}
                        />
                      </Flex>
                    ))
                  ) : (
                    <Flex>
                      <Text color="teal">You currently have no saved trips.</Text>
                    </Flex>
                  )}
                </Stack>
                <Flex justifyContent="center" marginTop="20px">
                  <Link to="/new-trip">
                    <Button
                      variant="solid"
                      shadow="2xl"
                      colorScheme="teal"
                      marginY="20px"
                      size="lg"
                    >
                      Create a New Trip
                    </Button>
                  </Link>
                </Flex>
              </Box>
              <span>{deleteMessage}</span>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
