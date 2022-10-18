import { SkeletonText } from '@chakra-ui/react';
import {
  DirectionsService,
  GoogleMap,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useState } from 'react';
import { useGoogleScript } from '../../context/GoogleScriptContext';

export default function MapEmbed({ origin, destination, waypoints }) {
  const [directionsResult, setDirectionsResult] = useState();

  // loads Google script
  const { isLoaded } = useGoogleScript();

  const directionsCallback = (response) => {
    if (response && response.status === 'OK') {
      setDirectionsResult(response);
    }
  };

  if (!isLoaded) {
    return <SkeletonText />;
  }

  return (
    <GoogleMap
      zoom={15}
      mapContainerStyle={{ width: '85%', height: '700px' }}
      options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
    >
      {origin && destination && waypoints && !directionsResult && (
        <DirectionsService
          callback={directionsCallback}
          options={{
            origin: { placeId: origin },
            destination: { placeId: destination },
            waypoints: waypoints.map((waypoint) => ({ location: { placeId: waypoint.place_id } })),
            travelMode: 'DRIVING',
          }}
        />
      )}
      {directionsResult && <DirectionsRenderer options={{ directions: directionsResult }} />}
    </GoogleMap>
  );
}
