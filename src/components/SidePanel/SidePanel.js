import { Box } from '@chakra-ui/react';
import { Autocomplete } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { useUserContext } from '../../context/UserContext';
import { createWaypoint, updateWaypoints } from '../../services/trips';
import WaypointList from '../WaypointList/WaypointList';

export default function SidePanel({ trip, setTrip, legs }) {
  const [placeId, setPlaceId] = useState('');
  const [waypointName, setWaypointName] = useState('');
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
    }
  };

  const handleAddWaypoint = async (e) => {
    e.preventDefault();
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
  };

  return (
    <Box left="0px" top="0px" pos="absolute" bg="white" h="100%" w="320px">
      {/* <TripNotes trip={trip} setTrip={setTrip}/> */}
      {trip.waypoints && legs && <WaypointList waypoints={trip.waypoints} trip={trip} setTrip={setTrip} legs={legs} />}
      <form onSubmit={handleAddWaypoint}>
        <label htmlFor="waypoint">
          Add a stop:
          {isLoaded && (
            <Autocomplete fields={['place_id', 'name']} onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input placeholder="New Stop..." id="waypoint" />
            </Autocomplete>
          )}
        </label>
        <button>+</button>
      </form>
    </Box>
  );
}