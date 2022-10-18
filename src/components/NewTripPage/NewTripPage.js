import { Box, Button, Input, InputGroup, SkeletonText } from '@chakra-ui/react';
import './NewTripPage.css';
import Header from '../Header/Header';
import { useUserContext } from '../../context/UserContext';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { Autocomplete } from '@react-google-maps/api';

export default function NewTripPage() {

  const { user } = useUserContext();

  const { isLoaded } = useGoogleScript();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const handleSubmit = (e) => {
    // e.preventDefault();

  //   functionality for processing New Trip Form info
  //   FormData.get
  //   setTrip
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
        <form className="new-trip-form">
          {isLoaded && (
            <InputGroup display="flex" flex-direction="column">
              <label>
              Trip Name:
                <Input variant="flushed" placeholder="Best Trip Ever!" />
              </label>
              <label>
              Origin:
                <Autocomplete>
                  <Input variant="flushed" placeholder="Rome, Illinois" />
                </Autocomplete>
              </label>
              <label>
                Destination:
                <Autocomplete>
                  <Input variant="flushed" placeholder="Paris, Texas" />
                </Autocomplete>
              </label>
            </InputGroup>
          )}
          <Button onSubmit={ handleSubmit }>Embark!</Button>
        </form>
      </Box>
    </div>
  );
}
