import { useRef } from 'react';
import MapEmbed from '../MapEmbed/MapEmbed';
import WaypointList from '../WaypointList/WaypointList';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import { useTrip } from '../../hooks/useTrip';
import { Autocomplete } from '@react-google-maps/api';
import { useGoogleScript } from '../../context/GoogleScriptContext';

export default function TripPage() {
  const { id } = useParams();
  const { trip } = useTrip(id);
  const waypointRef = useRef();

  const { isLoaded } = useGoogleScript();

  const handleAddWaypoint = () => {
    // get placeID from waypointRef current value
    // push placeID to waypoints array in database for current trip
  };

  return (
    <>
      <Header />
      <MapEmbed {...trip} />
      {trip.waypoints &&
        <WaypointList waypoints={trip.waypoints}/>
      }
      <form>
        <label htmlFor="waypoint">Add a stop:
          {isLoaded && 
            <Autocomplete fields={['place_id']}>
              <input placeholder="New Stop..." id="waypoint" ref={waypointRef}/>
            </Autocomplete>
          }
        </label>
        <button onClick={handleAddWaypoint}>+</button>
      </form>
    </>
  );
}
