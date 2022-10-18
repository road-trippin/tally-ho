import Waypoint from '../Waypoint/Waypoint';

export default function WaypointList({ waypoints }) {
  return (
    <div>
      {waypoints.map((waypoint) => (
        <Waypoint key={waypoint.id} {...waypoint} />
      ))}
    </div>
  );
}
