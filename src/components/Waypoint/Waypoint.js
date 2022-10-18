import { deleteWaypoint } from '../../services/trips';
import './Waypoint.css';

export default function Waypoint({ trip, setTrip, name, id }) {
  const handleDeleteWaypoint = async () => {
    if (trip.waypoints.length >= 2) {
      await deleteWaypoint(id);
      setTrip({ ...trip, waypoints: trip.waypoints.filter(w => w.id !== id) });
    }
  };

  return (
    <div className="waypoint">
      {name}
      <button onClick={handleDeleteWaypoint}>X</button>
    </div>
  );
}