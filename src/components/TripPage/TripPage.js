import { useCallback, useState } from 'react';
import MapEmbed from '../MapEmbed/MapEmbed';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import { useTrip } from '../../hooks/useTrip';
import SidePanel from '../SidePanel/SidePanel';
import { Box } from '@chakra-ui/react';

export default function TripPage() {
  const { id } = useParams();
  const { trip, setTrip } = useTrip(id);
  const [legs, setLegs] = useState(null);

  const onRouteChanged = useCallback((route) => setLegs(route.legs), [setLegs]);

  return (
    <>
      <Header
        navLinks={[
          { text: 'Home', path: '/' },
          { text: 'New Trip', path: '/new-trip' },
          { text: 'About', path: '/about' }
        ]}
      />
      <Box pos="relative">
        <MapEmbed waypoints={trip?.waypoints} onRouteChanged={onRouteChanged} avoidHighways={trip?.avoid_highways} avoidTolls={trip?.avoid_tolls} />
        <SidePanel trip={trip} setTrip={setTrip} legs={legs} />
      </Box>
    </>
  );
}
