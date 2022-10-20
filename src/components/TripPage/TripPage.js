import { useState } from 'react';
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

  return (
    <>
      <Header />
      <Box pos="relative">
        <MapEmbed {...trip} setLegs={setLegs} />
        <SidePanel trip={trip} setTrip={setTrip} legs={legs} />
      </Box>
    </>
  );
}
