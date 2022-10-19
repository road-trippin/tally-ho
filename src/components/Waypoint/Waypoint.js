import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { deleteWaypoint } from '../../services/trips';

export default function Waypoint({ trip, setTrip, name, id, leg }) {

  const [hover, setHover] = useState(false);

  const handleDeleteWaypoint = async () => {
    await deleteWaypoint(id);
    setTrip({ ...trip, waypoints: trip.waypoints.filter(w => w.id !== id) });
  };

  return (
    <div className="waypoint-container">
      <Flex
        boxShadow="md"
        rounded="md"
        paddingLeft="16px"
        paddingRight="16px"
        paddingTop="10px"
        paddingBottom="10px"
        justify="space-between"
        align="center"
        gap="16px"
        w="100%"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        bg={hover ? '#FD9834' : 'white'}
        color={hover ? 'white' : 'black'}
      >
        {name}
        <IconButton onClick={handleDeleteWaypoint} icon={<DeleteIcon />} variant="ghost" colorScheme="teal" isDisabled={trip.waypoints.length <= 2} ></IconButton>
      </Flex>
      {leg && <span className="distance">{leg.distance.text}, {leg.duration.text}</span>}
    </div>

  );
}