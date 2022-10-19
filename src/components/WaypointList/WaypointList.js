import Waypoint from '../Waypoint/Waypoint';
import { Draggable } from 'react-drag-reorder';
import { updateWaypoints } from '../../services/trips';
import { useState } from 'react';

export default function WaypointList({ waypoints, setTrip, trip, legs }) {

  const [totalDistance, setTotalDistance] = useState('');
  // const [totalHours, setTotalHours] = useState(0);
  // const [totalMinutes, setTotalMinutes] 
  const [prevLegs, setPrevLegs] = useState([]);

  const positionedWaypoints = waypoints.map((waypoint, i) => ({ ...waypoint, position: i }));
  
  const getTotalDistance = () => {
    const miles = legs.reduce((a, b) => {
      a.push(b.distance.text);
      return a;
    }, [])
      .map(d => Number(d.split(' ')[0].replace(',', '')))
      .reduce((a, b) => a + b, 0)
      .toString();
    
    let stringifiedMiles = '';

    if (!miles.includes('.')) {
      stringifiedMiles = miles.length > 3 ?
        [miles.slice(0, miles.length - 3), ',', miles.slice(miles.length - 3)].join('')
        : miles;
    } else {
      const splitMiles = miles.split('.');
      const intMiles = splitMiles[0];
      const formattedIntMiles = intMiles.length > 3 ? 
        [intMiles.slice(0, intMiles.length - 3), ',', intMiles.slice(intMiles.length - 3)].join('')
        : intMiles;
      stringifiedMiles = [formattedIntMiles, '.', splitMiles[1]].join('');
    }
    return `${stringifiedMiles} mi`;
  };

  if (legs !== prevLegs) {
    setPrevLegs(legs);
    setTotalDistance(getTotalDistance());
  }

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
      <Draggable onPosChange={onPosChange} key={legs}>
        {waypoints.map((waypoint, i) => (
          <Waypoint key={waypoint.id} {...waypoint} trip={trip} setTrip={setTrip} leg={i < legs.length ? legs[i] : null} />
        ))}
      </Draggable>
      <span className="total-distance">{totalDistance}</span>
    </div>
  );
}
