import { Box, Button, Input, InputGroup, SkeletonText } from '@chakra-ui/react';
import './NewTripPage.css';
import Header from '../Header/Header';
import { useUserContext } from '../../context/UserContext';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { Autocomplete } from '@react-google-maps/api';
import { Redirect } from 'react-router-dom';
import { useRef, useState } from 'react';

export default function NewTripPage() {
  const { user } = useUserContext();
  const { isLoaded } = useGoogleScript();
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

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

  const handleAddTrip = async (e) => {
    e.preventDefault();
    const newTrip = new FormData(e.target);
    newTrip.set('trip-name', newTrip.get);
    newTrip.set('trip-name', newTrip.get);
    //   functionality for processing New Trip Form info
    // await createTrip({ ...newTrip, user_id: user.id });
    //set origin=0, destination=1
    //   reroute to trip page

    // createTrip (userId, trip name)
    //take trip returned from createTrip and insert it into waypoints
    // createWaypoint (trip id, origin, destination)
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
                <Input variant="flushed" placeholder="Best Trip Ever!" id="trip-name" />
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
