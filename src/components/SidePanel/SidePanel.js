import { AddIcon } from '@chakra-ui/icons';
import { Flex, FormControl, Heading, IconButton, Input } from '@chakra-ui/react';
import { Autocomplete } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { useUserContext } from '../../context/UserContext';
import { createWaypoint, updateWaypoints } from '../../services/trips';
import TripNotes from '../TripNotes/TripNotes';
import WaypointList from '../WaypointList/WaypointList';

export default function SidePanel({ trip, setTrip, legs }) {
  const [placeId, setPlaceId] = useState('');
  const [waypointName, setWaypointName] = useState('');
  const [waypointInputValue, setWaypointInputValue] = useState('');
  const [userInputValidPlace, setUserInputValidPlace] = useState(false);
  const { user } = useUserContext();
  const autocompleteRef = useRef();

  const { isLoaded } = useGoogleScript();

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    if (autocomplete !== null) {
      const { place_id, name } = autocomplete.getPlace();
      setPlaceId(place_id);
      setWaypointName(name);
      setWaypointInputValue(name);
      setUserInputValidPlace(true);
    }
  };

  const handleAddWaypoint = async () => {
    const newWaypoint = await createWaypoint(trip.id, {
      place_id: placeId,
      name: waypointName,
      trip_id: trip.id,
      position: 0,
      user_id: user.id
    });
    const newWaypoints = [...trip.waypoints];
    newWaypoints.splice(-1, 0, newWaypoint);
    const updatedWaypoints = await updateWaypoints(newWaypoints);
    setTrip({ ...trip, waypoints: updatedWaypoints });
    setWaypointInputValue('');
    setUserInputValidPlace(false);
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
          {isLoaded && (
            <Autocomplete fields={['place_id', 'name']} onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Input placeholder="New Stop..." id="waypoint" value={waypointInputValue} onChange={(e) => setWaypointInputValue(e.target.value)} />
            </Autocomplete>
          )}
        </FormControl>
        <IconButton icon={<AddIcon />} onClick={handleAddWaypoint} colorScheme="teal" isDisabled={!userInputValidPlace}/>
      </Flex>
      <TripNotes trip={trip} setTrip={setTrip}/>
    </Flex>
  );
}
