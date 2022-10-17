import { SkeletonText } from '@chakra-ui/react';
import { DirectionsService, GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { useState } from 'react';

export default function MapEmbed({ origin, destination }) {
  const [directionsResult, setDirectionsResult] = useState();

  // loads Google script
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

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
      {origin && destination && !directionsResult &&
        <DirectionsService
          callback={directionsCallback}
          options={{ origin: { placeId: origin }, destination: { placeId: destination }, travelMode: 'DRIVING' }}
        />
      }
      {directionsResult &&
        <DirectionsRenderer
          options={{ directions: directionsResult }}
        />
      }
    </GoogleMap>
  );
}
