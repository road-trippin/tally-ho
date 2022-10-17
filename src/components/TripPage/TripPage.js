import { useRef, useState } from 'react';
import MapEmbed from '../MapEmbed/MapEmbed';
import WaypointList from '../WaypointList/WaypointList';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import { useTrip } from '../../hooks/useTrip';
import { Autocomplete } from '@react-google-maps/api';
import { useGoogleScript } from '../../context/GoogleScriptContext';
import { updateTrip } from '../../services/trips';

export default function TripPage() {
  const { id } = useParams();
  const { trip, setTrip } = useTrip(id);
  const [placeId, setPlaceId] = useState('');

  // reference container from Autocomplete
  const autocompleteRef = useRef();

  const onPlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    if (autocomplete !== null) {
      const { place_id } = autocomplete.getPlace();
      setPlaceId(place_id);
    }
  };

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const { isLoaded } = useGoogleScript();

  const handleAddWaypoint = async (e) => {
    e.preventDefault();
    // get placeID from waypointRef current value
    const newWaypoints = [...trip.waypoints, placeId];
    const updatedTrip = await updateTrip({ ...trip, waypoints: newWaypoints });
    console.log('updatedTrip', updatedTrip);
    setTrip(updatedTrip);
    // push placeID to waypoints array in database for current trip
  };

  return (
    <>
      <Header />
      <MapEmbed {...trip} />
      {trip.waypoints && <WaypointList waypoints={trip.waypoints} />}
      <form onSubmit={handleAddWaypoint}>
        <label htmlFor="waypoint">
          Add a stop:
          {isLoaded && (
            <Autocomplete fields={['place_id']} onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input placeholder="New Stop..." id="waypoint" />
            </Autocomplete>
          )}
        </label>
        <button>+</button>
      </form>
    </>
  );
}
