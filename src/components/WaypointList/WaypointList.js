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
    const miles = legs.reduce((sum, leg) => {
      return sum + Number(
        leg.distance.text
          .split(' ')[0]
          .replace(',', '')
      );
    }, 0)
      .toString();
  
    const decimalIndex = miles.indexOf('.');
    let formattedMiles = '';
    if (decimalIndex > 3) {
      formattedMiles = miles.slice(0, decimalIndex - 3) + ',' + miles.slice(decimalIndex - 3);
    } else if (decimalIndex === -1 && miles.length > 3) {
      formattedMiles = miles.slice(0, miles.length - 3) + ',' + miles.slice(miles.length - 3);
    }
    return `${formattedMiles} mi`;
  };

  const getTotalTime = () => {
    const times = legs.reduce((a, b) => {
      a.push(b.duration.text);
      return a;
    }, []);
    let hours = times.map(t => {
      if (!t.includes('day')) return Number(t.split(' ')[0]);
      return Number(t.split(' ')[0]) * 24 + Number(t.split(' ')[2]);
    })
      .reduce((a, b) => a + b, 0);
    let minutes = times.map(t => {
      if (!t.includes('day')) return Number(t.split(' ')[2]);
      return 0;
    })
      .reduce((a, b) => a + b, 0);

    hours += Math.floor(minutes / 60);
    minutes %= 60;

    return minutes ? `${hours} hrs ${minutes} mins` : `${hours} hrs`;
  };

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
