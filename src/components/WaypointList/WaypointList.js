import Waypoint from '../Waypoint/Waypoint';
import { Draggable } from 'react-drag-reorder';
import { updateWaypoints } from '../../services/trips';
import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function WaypointList({ trip, setTrip, legs }) {
  const [totalDistance, setTotalDistance] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [prevLegs, setPrevLegs] = useState([]);
  const [randomKey, setRandomKey] = useState(0);

  const getTotalDistance = () => {
    // get total miles from all legs of the trip
    // need to remove comma to allow for conversion to number
    const miles = legs.reduce((sum, leg) => {
      return sum + Number(
        leg.distance.text
          .split(' ')[0]
          .replace(',', '')
      );
    }, 0)
      .toString();
  
    // add comma back in for display to user
    const decimalIndex = miles.indexOf('.');
    let formattedMiles = '';
    // use decimal location to determine if total is > 1000, add in comma accordingly
    if (decimalIndex > 3) {
      formattedMiles = miles.slice(0, decimalIndex - 3) + ',' + miles.slice(decimalIndex - 3);
    } else if (decimalIndex === -1 && miles.length > 3) {
      formattedMiles = miles.slice(0, miles.length - 3) + ',' + miles.slice(miles.length - 3);
    }
    return `${formattedMiles} mi`;
  };

  const getTotalTime = () => {
    // parse out the days, hours, and minutes for each leg of trip 
    // and reduce into object containing the total hours and minutes
    const timeData = legs.reduce((acc, leg) => {
      const splitDuration = leg.duration.text.split(' ');
      if (!splitDuration.includes('hours')) {
        acc.minutes += Number(splitDuration[0]);
        return acc;
      }
      if (!splitDuration.includes('day')) {
        acc.hours += Number(splitDuration[0]);
        acc.minutes += Number(splitDuration[2]);
      } else {
        acc.hours += Number(splitDuration[0]) * 24 + Number(splitDuration[2]);
      }
      return acc;
    }, { hours: 0, minutes: 0 });
  
    timeData.hours += Math.floor(timeData.minutes / 60);
    timeData.minutes %= 60;
  
    return timeData.minutes > 0 ? 
      `${timeData.hours} hrs ${timeData.minutes} mins` : 
      `${timeData.hours} hrs`;
  };

  // the key property on the Draggable component was only triggering a remount 
  // if a change in the value of legs was used to trigger a change in a random key
  if (legs !== prevLegs) {
    setPrevLegs(legs);
    setRandomKey(Math.random());
    setTotalDistance(getTotalDistance());
    setTotalTime(getTotalTime());
  }

  const onPosChange = async (currentPos, newPos) => {
    if (currentPos === newPos) return;

    const waypoints = [...trip.waypoints];
    const [shiftedWaypoint] = waypoints.splice(currentPos, 1);
    waypoints.splice(newPos, 0, shiftedWaypoint);

    const updatedWaypoints = await updateWaypoints(waypoints);
    setTrip({ ...trip, waypoints: updatedWaypoints });
  };

  return (
    <Box w="250px">
      <Draggable onPosChange={onPosChange} key={randomKey}>
        {trip.waypoints.map((waypoint, i) => (
          <Waypoint
            key={waypoint.id}
            {...waypoint} trip={trip}
            setTrip={setTrip}
            leg={i < legs.length ? legs[i] : null}
          />
        ))}
      </Draggable>
      <Flex justify="space-around">
        <Flex direction="column" align="center" w="50%">
          <Text as="b">Total Distance</Text>
          <Text as="i">{totalDistance}</Text>
        </Flex>
        <Flex direction="column" align="center" w="50%">
          <Text as="b">Total Time</Text>
          <Text as="i">{totalTime}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
