import { SkeletonText } from '@chakra-ui/react';
import { DirectionsService, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';

export default function MapEmbed({ origin, destination }) {

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
      mapContainerStyle={{ width: '85%', height: '700px' }}
      options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
    >
      <DirectionsService options={{ destination, origin }} />
    </GoogleMap>
  );
}
