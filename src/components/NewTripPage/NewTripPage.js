import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SkeletonText,
} from '@chakra-ui/react';
import './NewTripPage.css';
import Header from '../Header/Header';
import { useUserContext } from '../../context/UserContext';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { Autocomplete } from '@react-google-maps/api';
import { Redirect, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import { createTrip, createWaypoint } from '../../services/trips';

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
    <div>
      <Header />
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        width={500}
        boxShadow="md"
        p="6"
        rounded="md"
        bg="white"
      >
        <h2>Start a New Trip!</h2>
        {isLoaded && (
          <Box>
            <FormControl isRequired isInvalid={isTitleError}>
              <FormLabel htmlFor="trip-name" requiredIndicator>
                Trip Name:
                <Input
                  variant="flushed"
                  placeholder="Best Trip Ever!"
                  id="trip-name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormLabel>
              {isTitleError && (
                <FormErrorMessage>Your trip is missing a cool name!</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={isOriginError}>
              <FormLabel htmlFor="origin" requiredIndicator>
                Origin:
                <Autocomplete
                  fields={['place_id', 'name']}
                  onLoad={(autocomplete) => {
                    originRef.current = autocomplete;
                  }}
                  onPlaceChanged={handleOriginChanged}
                >
                  <Input variant="flushed" placeholder="Rome, Illinois" id="origin" />
                </Autocomplete>
              </FormLabel>
              {isOriginError && <FormErrorMessage>Where you are starting....?</FormErrorMessage>}
            </FormControl>
            <FormControl isRequired isInvalid={isDestinationError}>
              <FormLabel htmlFor="destination" requiredIndicator>
                Destination:
                <Autocomplete
                  fields={['place_id', 'name']}
                  onLoad={(autocomplete) => {
                    destinationRef.current = autocomplete;
                  }}
                  onPlaceChanged={handleDestinationChanged}
                >
                  <Input variant="flushed" placeholder="Paris, Texas" id="destination" />
                </Autocomplete>
              </FormLabel>
              {isDestinationError && <FormErrorMessage>Where are you headed...?</FormErrorMessage>}
            </FormControl>
            <Button onClick={handleAddTrip}>Embark!</Button>
          </Box>
        )}
      </Box>
    </div>
  );
}
