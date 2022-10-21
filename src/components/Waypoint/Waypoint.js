import { ArrowDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
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
      <Box>
        <Flex
          boxShadow="md"
          rounded="md"
          marginBottom="10px"
          paddingLeft="16px"
          paddingRight="16px"
          paddingTop="8px"
          paddingBottom="8px"
          justify="space-between"
          align="center"
          gap="16px"
          w="100%"
          borderStyle="#FD9834"
          borderWidth="4px"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseDown={() => setHover(false)}
          borderColor={hover ? '#FD9834' : 'white'}
        >
          {name}
          <IconButton onClick={handleDeleteWaypoint} icon={<DeleteIcon />} variant="ghost" colorScheme="teal" isDisabled={trip.waypoints.length <= 2} ></IconButton>
        </Flex>
      </Box>
      {leg && <Flex direction="column" align="center" width="100%" height="20px">
        {hover ? 
          <span className="distance">{leg.duration.text}</span>
          : <ArrowDownIcon />
        }
      </Flex>}
    </div>

  );
}