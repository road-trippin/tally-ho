import { useRef, useState } from 'react';
import MapEmbed from '../MapEmbed/MapEmbed';
import WaypointList from '../WaypointList/WaypointList';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import { useTrip } from '../../hooks/useTrip';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

export default function TripPage() {
  const [newStop, setNewStop] = useState('');
  const waypoints = ['test1', 'test2'];
  const { id } = useParams();
  const { trip, setTrip } = useTrip(id);
  const waypointRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  return (
    <>
      <Header />
      <MapEmbed {...trip} isLoaded={isLoaded} />
      <WaypointList waypoints={waypoints}/>
      <form>
        <label htmlFor="waypoint">Add a stop:
          {isLoaded && 
            <Autocomplete>
              <input placeholder="New Stop..." id="waypoint" ref={waypointRef}/>
            </Autocomplete>
          }
        </label>
        <button>+</button>
      </form>
    </>
  );
}
