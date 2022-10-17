import { Box, Button, Input, InputGroup } from '@chakra-ui/react';
import { Header } from '../Header/Header';
import './NewTripPage.css';

export default function NewTripPage() {
  const handleSubmit = () => {
    //functionality for processing New Trip Form info
    //FormData.get
    //setTrip
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
          <InputGroup display="flex" flex-direction="column">
            <label>
              Trip Name:
              <Input variant="flushed" placeholder="Best Trip Ever!" />
            </label>
            <label>
              Origin:
              <Input variant="flushed" placeholder="Rome, Illinois" />
            </label>
            <label>
              Destination:
              <Input variant="flushed" placeholder="Paris, Texas" />
            </label>
          </InputGroup>
          <Button onSubmit={handleSubmit}>Embark!</Button>
        </form>
      </Box>
    </div>
  );
}
