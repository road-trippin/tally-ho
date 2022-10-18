import { Box, Button, Input, InputGroup, SkeletonText } from '@chakra-ui/react';
import './NewTripPage.css';
import Header from '../Header/Header';
import { useUserContext } from '../../context/UserContext';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { Autocomplete } from '@react-google-maps/api';
import { Redirect } from 'react-router-dom';
import { createTrip } from '../../services/trips';

export default function NewTripPage() {
  const { user } = useUserContext();
  const { isLoaded } = useGoogleScript();

  if (!user) <Redirect to="/auth/sign-in" />;

  if (!isLoaded) {
    return <SkeletonText />;
  }

  // TODO:
  // finish Autocomplete fields & htmlfor=
  // implement onPlaceChanged
  // implement autocomplete onLoad
  // finish handlesubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTrip = new FormData(e.target);
    //   functionality for processing New Trip Form info
    await createTrip({ ...newTrip, user_id: user.id });
    //   reroute to trip page
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
        <form className="new-trip-form" onSubmit={handleSubmit}>
          {isLoaded && (
            <InputGroup display="flex" flex-direction="column">
              <label htmlFor="trip-name">
                Trip Name:
                <Input variant="flushed" placeholder="Best Trip Ever!" id="trip-name" />
              </label>
              <label htmlFor="origin">
                Origin:
                <Autocomplete fields={['place_id', 'name']}>
                  <Input variant="flushed" placeholder="Rome, Illinois" id="origin" />
                </Autocomplete>
              </label>
              <label htmlFor="destination">
                Destination:
                <Autocomplete fields={['place_id', 'name']}>
                  <Input variant="flushed" placeholder="Paris, Texas" id="destination" />
                </Autocomplete>
              </label>
            </InputGroup>
          )}
          <Button>Embark!</Button>
        </form>
      </Box>
    </div>
  );
}
