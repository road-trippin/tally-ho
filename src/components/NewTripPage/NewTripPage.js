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
import { Autocomplete } from '@react-google-maps/api';
import { Redirect, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import { createTrip, createWaypoint } from '../../services/trips';
import newVan from '../../newVan.jpg';
import 'animate.css';

export default function NewTripPage() {
  const { user } = useUserContext();
  const { isLoaded } = useGoogleScript();

  const [isTitleError, setIsTitleError] = useState(false);
  const [isOriginError, setIsOriginError] = useState(false);
  const [isDestinationError, setIsDestinationError] = useState(false);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [title, setTitle] = useState('');

  let history = useHistory();
  const originRef = useRef();
  const destinationRef = useRef();

  const handleOriginChanged = () => {
    const autocomplete = originRef.current;
    if (autocomplete !== null) {
      const { place_id, name } = autocomplete.getPlace();
      setOrigin({ place_id, name });
    }
  };

  const handleDestinationChanged = () => {
    const autocomplete = destinationRef.current;
    if (autocomplete !== null) {
      const { place_id, name } = autocomplete.getPlace();
      setDestination({ place_id, name });
    }
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
    if (origin === null) {
      setIsOriginError(true);
      isFormInvalid = true;
    }
    if (destination === null) {
      setIsDestinationError(true);
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
      <Header />
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
              <FormControl isRequired isInvalid={isOriginError}>
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
                <Autocomplete
                  fields={['place_id', 'name']}
                  onLoad={(autocomplete) => {
                    originRef.current = autocomplete;
                  }}
                  onPlaceChanged={handleOriginChanged}
                >
                  <Input variant="outline" placeholder="Rome, Illinois" id="origin" />
                </Autocomplete>
                {isOriginError ? (
                  <FormErrorMessage>Where you are starting....?</FormErrorMessage>
                ) : (
                  <FormHelperText visibility="hidden">&nbsp;</FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={isDestinationError}>
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
                <Autocomplete
                  fields={['place_id', 'name']}
                  onLoad={(autocomplete) => {
                    destinationRef.current = autocomplete;
                  }}
                  onPlaceChanged={handleDestinationChanged}
                >
                  <Input variant="outline" placeholder="Paris, Texas" id="destination" />
                </Autocomplete>
                {isDestinationError ? (
                  <FormErrorMessage>Where are you headed...?</FormErrorMessage>
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
