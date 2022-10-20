import Waypoint from '../Waypoint/Waypoint';
import { Draggable } from 'react-drag-reorder';
import { updateWaypoints } from '../../services/trips';
import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function WaypointList({ waypoints, setTrip, trip, legs }) {

  const [totalDistance, setTotalDistance] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [prevLegs, setPrevLegs] = useState([]);
  const [randomKey, setRandomKey] = useState(0);

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
    <Box w="250px">
      <Draggable onPosChange={onPosChange} key={randomKey}>
        {waypoints.map((waypoint, i) => (
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
