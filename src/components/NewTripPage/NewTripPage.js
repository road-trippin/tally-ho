import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';
import './NewTripPage.css';
import Header from '../Header/Header';
import { useUserContext } from '../../context/UserContext';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { createTrip, createWaypoint } from '../../services/trips';
import newVan from '../../newVan.jpg';
import 'animate.css';
import PlaceInput from '../PlaceInput/PlaceInput';

export default function NewTripPage() {
  const { user } = useUserContext();
  const { isLoaded } = useGoogleScript();
  let history = useHistory();

  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const onOriginChange = (origin) => {
    setOrigin(origin);
  };

  const onDestinationChange = (destination) => {
    setDestination(destination);
  };

  if (!user) <Redirect to="/auth/sign-in" />;

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const handleAddTrip = async () => {
    let isFormInvalid = false;

    if (title === '') {
      setIsTitleError(true);
      isFormInvalid = true;
    }
    if (!origin) {
      isFormInvalid = true;
    }
    if (!destination) {
      isFormInvalid = true;
    }
    if (isFormInvalid) return;

    const newTrip = {
      title,
      user_id: user.id,
    };
    const trip = await createTrip(newTrip);

    const newOrigin = {
      user_id: user.id,
      place_id: origin.place_id,
      name: origin.name,
      position: 0,
    };

    const newDestination = {
      user_id: user.id,
      place_id: destination.place_id,
      name: destination.name,
      position: 1,
    };

    await createWaypoint(trip.id, newOrigin);
    await createWaypoint(trip.id, newDestination);

    history.push(`/trip/${trip.id}`);
  };

  return (
    <>
      <Header
        navLinks={[
          { text: 'Home', path: '/' },
          { text: 'About', path: '/about' }
        ]}
      />
      {isLoaded && (
        <Flex
          position="relative"
          alignItems="flex-end"
          justifyContent="center"
          flexDirection="column"
          h="100%"
          w="100%"
          wrap="no-wrap"
          backgroundImage={newVan}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
        >
          <Box
            width={500}
            boxShadow="dark-lg"
            p="6"
            rounded="xl"
            bg="white"
            zIndex="1"
            mr="200px"
            padding="40px"
            className="animate__animated animate__fadeInRightBig"
          >
            <Heading as="h1" size="lg" fontWeight="bold" color="#006D77" mb="20px">
              Start a New Trip!
            </Heading>
            <Stack spacing={4}>
              <FormControl isRequired isInvalid={isTitleError}>
                <FormLabel
                  htmlFor="trip-name"
                  requiredIndicator
                  as="h2"
                  size="md"
                  color="#FD9834"
                  fontWeight="bold"
                >
                  Trip Name:
                </FormLabel>
                <Input
                  variant="outline"
                  placeholder="Best Trip Ever!"
                  id="trip-name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {isTitleError ? (
                  <FormErrorMessage>Your trip is missing a cool name!</FormErrorMessage>
                ) : (
                  <FormHelperText visibility="hidden">&nbsp;</FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={origin === undefined}>
                <FormLabel
                  htmlFor="origin"
                  requiredIndicator
                  as="h2"
                  size="md"
                  color="#FD9834"
                  fontWeight="bold"
                >
                  Origin:
                </FormLabel>
                <PlaceInput
                  onChange={onOriginChange}
                  value={origin}
                  placeholder="Rome, IL"
                ></PlaceInput>
                {origin === undefined ? (
                  <FormErrorMessage>Please enter a valid place.</FormErrorMessage>
                ) : (
                  <FormHelperText visibility="hidden">&nbsp;</FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={destination === undefined}>
                <FormLabel
                  htmlFor="destination"
                  requiredIndicator
                  as="h2"
                  size="md"
                  color="#FD9834"
                  fontWeight="bold"
                >
                  Destination:
                </FormLabel>
                <PlaceInput
                  onChange={onDestinationChange}
                  value={destination}
                  placeholder="Paris, TX"
                ></PlaceInput>
                {destination === undefined ? (
                  <FormErrorMessage>Please enter a valid place.</FormErrorMessage>
                ) : (
                  <FormHelperText visibility="hidden">&nbsp;</FormHelperText>
                )}
              </FormControl>
              <Button
                variant="solid"
                shadow="2xl"
                colorScheme="teal"
                marginY="20px"
                mt="20px"
                size="lg"
                onClick={handleAddTrip}
              >
                Embark!
              </Button>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
}
