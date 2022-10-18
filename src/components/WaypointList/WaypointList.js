import Waypoint from '../Waypoint/Waypoint';
import { Draggable } from 'react-drag-reorder';
import { updateWaypoints } from '../../services/trips';

export default function WaypointList({ waypoints, setTrip, trip }) {

  const positionedWaypoints = waypoints.map((waypoint, i) => ({ ...waypoint, position: i }));

  const onPosChange = async (currentPos, newPos) => {
    positionedWaypoints[currentPos].position = newPos;
    if (newPos !== currentPos) {
      positionedWaypoints.forEach((waypoint, i) => {
        if (newPos > currentPos && i > currentPos && i <= newPos) {
          waypoint.position--;
        }
        if (currentPos > newPos && i < currentPos && i >= newPos) {
          waypoint.position++;
        }
      });
      positionedWaypoints.sort((a, b) => a.position - b.position);
      const updatedWaypoints = await updateWaypoints(positionedWaypoints);
      setTrip({ ...trip, waypoints: updatedWaypoints });
    }
  };
  return (
    <div>
      <Draggable onPosChange={onPosChange} key={waypoints}>
        {waypoints.map((waypoint) => (
          <Waypoint key={waypoint.id} {...waypoint} trip={trip} setTrip={setTrip} />
        ))}
      </Draggable>
    </div>
  );
}
