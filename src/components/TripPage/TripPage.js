import { useState } from 'react';
import MapEmbed from '../MapEmbed/MapEmbed';
import WaypointList from '../WaypointList/WaypointList';
import Header from '../Header/Header';

export default function TripPage() {
  const [newStop, setNewStop] = useState('');
  const waypoints = ['test1', 'test2'];

  return (
    <>
      <Header />
      <MapEmbed />
      <WaypointList waypoints={waypoints}/>
      <form>
        <label htmlFor="waypoint">Add a stop:
          <input placeholder="New Stop..." id="waypoint" value={newStop} onChange={(e) => setNewStop(e.target.value)}/>
        </label>
        <button>+</button>
      </form>
    </>
  );
}
