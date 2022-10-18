import { SkeletonText } from '@chakra-ui/react';
import { DirectionsService, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useState } from 'react';
import { useGoogleScript } from '../../context/GoogleScriptContext';

export default function MapEmbed({ waypoints }) {
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
      {waypoints && waypoints.length >= 2 && !directionsResult && (
        <DirectionsService
          callback={directionsCallback}
          options={{
            origin: { placeId: waypoints[0].place_id },
            destination: { placeId: waypoints[waypoints.length - 1].place_id },
            waypoints: waypoints
              .slice(1, -1)
              .map((waypoint) => ({ location: { placeId: waypoint.place_id } })),
            travelMode: 'DRIVING',
          }}
        />
      )}
      {directionsResult && <DirectionsRenderer options={{ directions: directionsResult }} />}
    </GoogleMap>
  );
}
