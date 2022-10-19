import Header from '../Header/Header';
import { Box, Button, Flex, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import useTrips from '../../hooks/useTrips';
import { deleteTrip, deleteTripWaypoints } from '../../services/trips';
import { useState } from 'react';
import homeVan from '../../homeVan.jpg';
import 'animate.css';

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
            direction={{ base: 'column-reverse', md: 'row' }}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            mb={16}
            ml={55}
            mr={55}
          >
            <Stack
              spacing={4}
              w={{ base: '80%', md: '40%' }}
              align={['center', 'center', 'flex-start', 'flex-start']}
            >
              <Heading
                className="animate__animated animate__lightSpeedInLeft"
                as="h1"
                size="xl"
                fontWeight="bold"
                color="#006D77"
                textAlign={['center', 'center', 'flex-start', 'flex-start']}
              >
                Time to Hit the Road!
              </Heading>
              <Heading
                as="h2"
                size="md"
                color="#FD9834"
                opacity="0.8"
                fontWeight="bold"
                lineHeight={1.5}
                textAlign={['center', 'center', 'flex-start', 'flex-start']}
              >
                Your Saved Trips:
              </Heading>
              <Box
                marginX="auto"
                boxShadow="2xl"
                rounded="1rem"
                padding="30px"
                minWidth="400px"
                w={{ base: '80%', sm: '60%', md: '50%' }}
                mb={{ base: 12, md: 0 }}
              >
                <Stack spacing={5}>
                  {trips.map((trip) => (
                    <Flex key={trip.id} justify="space-between">
                      {/* <Box textAlign="left"> */}
                      <Button
                        variant="ghost"
                        colorScheme="teal"
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
                      {/* </Box> */}
                    </Flex>
                  ))}
                </Stack>
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
