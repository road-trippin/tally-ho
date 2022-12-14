import { AddIcon, SettingsIcon } from '@chakra-ui/icons';
import { Checkbox, CheckboxGroup, Flex, FormControl, Heading, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { createWaypoint, updateTrip, updateWaypoints } from '../../services/trips';
import PlaceInput from '../PlaceInput/PlaceInput';
import TripNotes from '../TripNotes/TripNotes';
import WaypointList from '../WaypointList/WaypointList';
import Loader from '../Loader/Loader';

export default function SidePanel({ trip, setTrip, legs }) {
  const { user } = useUserContext();
  const [place, setPlace] = useState();
  const [showLoader, setShowLoader] = useState(true);
  const placeInputRef = useRef();

  setTimeout(() => setShowLoader(false), 2000);

  const isPlaceValid = !!place;

  const onPlaceChange = (place) => {
    setPlace(place);
  };

  const defaultChecked = [];
  if (trip) {
    if (trip.avoid_highways) defaultChecked.push('highways');
    if (trip.avoid_tolls) defaultChecked.push('tolls');
  }

  const handleAvoidHighways = async () => {
    await updateTrip({
      id: trip.id,
      avoid_highways: !trip.avoid_highways 
    });
    setTrip({ ...trip, avoid_highways: !trip.avoid_highways });
  };

  const handleAvoidTolls = async () => {
    await updateTrip({
      id: trip.id,
      avoid_tolls: !trip.avoid_tolls
    });
    setTrip({ ...trip, avoid_tolls: !trip.avoid_tolls });
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
      <Flex align="center" justify="center" paddingRight="10px">
        <Heading
          textAlign="center"
          m="16px"
          size="lg"
          paddingBottom="6px"
          borderBottom="3px solid #006D77"
          width="210px"
        >{trip?.title}</Heading>
        {trip && <Popover placement='right'>
          <PopoverTrigger>
            <IconButton icon={<SettingsIcon />} variant="outline" position="absolute" right="8px"></IconButton>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Avoid:</PopoverHeader>
            <PopoverBody>
              <CheckboxGroup direction='column' defaultValue={defaultChecked}>
                <Stack>
                  <Checkbox value='highways' onChange={handleAvoidHighways}>Highways</Checkbox>
                  <Checkbox value='tolls' onChange={handleAvoidTolls}>Tolls</Checkbox>
                </Stack>
              </CheckboxGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover> }
      </Flex>
      {showLoader || !trip ? <Loader></Loader>
        :
        <>
          <Flex flexGrow="1" overflow="scroll" width="100%" direction="column" align="center">
            {legs && <WaypointList trip={trip} setTrip={setTrip} legs={legs} />}
          </Flex>
          <Flex align="center" gap="10px" marginTop="36px">
            <FormControl isRequired>
              <PlaceInput ref={placeInputRef} onChange={onPlaceChange} value={place} />
            </FormControl>
            <IconButton icon={<AddIcon />} onClick={handleAddWaypoint} colorScheme="teal" isDisabled={!isPlaceValid} />
          </Flex>
        </>
      }
      {trip && <TripNotes trip={trip} setTrip={setTrip}/>}
    </Flex>
  );
}
