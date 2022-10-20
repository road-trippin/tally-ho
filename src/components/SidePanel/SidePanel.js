import { AddIcon } from '@chakra-ui/icons';
import { Flex, FormControl, Heading, IconButton } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { createWaypoint, updateWaypoints } from '../../services/trips';
import PlaceInput from '../PlaceInput/PlaceInput';
import TripNotes from '../TripNotes/TripNotes';
import WaypointList from '../WaypointList/WaypointList';

export default function SidePanel({ trip, setTrip, legs }) {
  const { user } = useUserContext();
  const [place, setPlace] = useState();
  const placeInputRef = useRef();

  const isPlaceValid = !!place;

  const onPlaceChange = (place) => {
    setPlace(place);
  };

  const handleAddWaypoint = async () => {
    const newWaypoint = await createWaypoint(trip.id, {
      place_id: place.place_id,
      name: place.name,
      trip_id: trip.id,
      position: 0,
      user_id: user.id
    });
    const newWaypoints = [...trip.waypoints];
    newWaypoints.splice(-1, 0, newWaypoint);
    const updatedWaypoints = await updateWaypoints(newWaypoints);
    setTrip({ ...trip, waypoints: updatedWaypoints });
    placeInputRef.current.clear();
  };

  return (
    <Flex left="30px"
      top="10%"
      pos="absolute"
      bg="white"
      h="80%"
      w="340px"
      align="center"
      direction="column"
      boxShadow="dark-lg"
      rounded="xl"
    >
      <Heading
        textAlign="center"
        m="16px"
        paddingBottom="6px"
        borderBottom="3px solid #006D77"
      >{trip.title}</Heading>
      <Flex flexGrow="1" overflow="scroll" width="100%" direction="column" align="center">
        {legs && <WaypointList trip={trip} setTrip={setTrip} legs={legs} />}
      </Flex>
      <Flex align="center" gap="10px" marginTop="36px">
        <FormControl isRequired>
          <PlaceInput ref={placeInputRef} onChange={onPlaceChange} value={place} />
        </FormControl>
        <IconButton icon={<AddIcon />} onClick={handleAddWaypoint} colorScheme="teal" isDisabled={!isPlaceValid} />
      </Flex>
      <TripNotes trip={trip} setTrip={setTrip}/>
    </Flex>
  );
}
