import { SkeletonText } from '@chakra-ui/react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';

export default function MapEmbed() {
  // const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const center = { lat: 36.0544, lng: -112.1401 };

  // loads Google script
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <SkeletonText />;
  }

  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: '500px', height: '500px' }}
      // onLoad={(map) => setMap(map)}
    ></GoogleMap>
  );
}
