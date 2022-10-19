import { useRef, useState } from 'react';
import MapEmbed from '../MapEmbed/MapEmbed';
import WaypointList from '../WaypointList/WaypointList';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import { useTrip } from '../../hooks/useTrip';
import { Autocomplete } from '@react-google-maps/api';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { createWaypoint, updateWaypoints } from '../../services/trips';
import { useUserContext } from '../../context/UserContext';
import TripNotes from '../TripNotes/TripNotes';

export default function TripPage() {
  const { id } = useParams();
  const { trip, setTrip } = useTrip(id);
  const [placeId, setPlaceId] = useState('');
  const [waypointName, setWaypointName] = useState('');
  const { user } = useUserContext();
  const [legs, setLegs] = useState(null);

  // reference container from Autocomplete
  const autocompleteRef = useRef();

  const onPlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    if (autocomplete !== null) {
      const { place_id, name } = autocomplete.getPlace();
      setPlaceId(place_id);
      setWaypointName(name);
    }
  };

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const { isLoaded } = useGoogleScript();

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
    <>
      <Header />
      <MapEmbed {...trip} setLegs={setLegs} />
      <TripNotes trip={trip} setTrip={setTrip}/>
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
    </>
  );
}
