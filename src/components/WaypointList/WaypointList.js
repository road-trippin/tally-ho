import Waypoint from '../Waypoint/Waypoint';
import { Draggable } from 'react-drag-reorder';
import { updateWaypoints } from '../../services/trips';

export default function WaypointList({ waypoints, setTrip, trip }) {

  const positionedWaypoints = waypoints.map(waypoint => ({ ...waypoint, listPosition: waypoints.indexOf(waypoint) }));

  const onPosChange = async (currentPos, newPos) => {
    positionedWaypoints[currentPos].listPosition = newPos;
    if (newPos !== currentPos) {
      positionedWaypoints.forEach((waypoint, i) => {
        if (newPos > currentPos && i > currentPos && i <= newPos) {
          waypoint.listPosition--;
        }
        if (currentPos > newPos && i < currentPos && i >= newPos) {
          waypoint.listPosition++;
        }
      });
      positionedWaypoints.sort((a, b) => a.listPosition - b.listPosition);
      let reorderedWaypoints = positionedWaypoints.map((waypoint) => {
        return {
          id: waypoint.id,
          place_id: waypoint.place_id,
          name: waypoint.name,
          trip_id: waypoint.trip_id,
          user_id: waypoint.user_id,
          position: waypoint.listPosition
        };
      });
      const updatedWaypoints = await updateWaypoints(reorderedWaypoints);
      setTrip({ ...trip, waypoints: updatedWaypoints });
    }
  };

  return (
    <div>
      <Draggable onPosChange={onPosChange}>
        {waypoints.map((waypoint) => (
          <Waypoint key={waypoint.id} {...waypoint} />
        ))}
      </Draggable>
    </div>
  );
}
