import { Box, Button, Input, InputGroup, SkeletonText } from '@chakra-ui/react';
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
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
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
    const newTrip = {
      title,
      user_id: user.id
    };
    const trip = await createTrip(newTrip);
    const newOrigin = {
      user_id: user.id,
      place_id: origin.place_id,
      name: origin.name,
      position: 0
    };

    const newDestination = {
      user_id: user.id,
      place_id: destination.place_id,
      name: destination.name,
      position: 1
    };

    await createWaypoint(trip.id, newOrigin);
    await createWaypoint(trip.id, newDestination);

    history.push(`/edit-trip/${trip.id}`);
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
        <Box>
          {isLoaded && (
            <InputGroup display="flex" flex-direction="column">
              <label htmlFor="trip-name">
                Trip Name:
                <Input variant="flushed" placeholder="Best Trip Ever!" id="trip-name" value={ title } onChange={ (e) => setTitle(e.target.value) } />
              </label>
              <label htmlFor="origin">
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
              </label>
              <label htmlFor="destination">
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
              </label>
            </InputGroup>
          )}
          <Button onClick={ handleAddTrip }>Embark!</Button>
        </Box>
      </Box>
    </div>
  );
}
