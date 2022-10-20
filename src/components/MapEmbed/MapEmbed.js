import { GoogleMap } from '@react-google-maps/api';
import { useEffect, useRef } from 'react';
import { useGoogleScript } from '../../context/GoogleScriptContext';

const mapContainerStyle = { width: '100%', height: '100%' };
const mapOptions = { streetViewControl: false, mapTypeControl: false, fullscreenControl: false };

// These values were chosen to be center the US
const initialMapZoom = 4;
const initialMapCenter = { lat: 40, lng: -100 };

function createGooglePlace(waypoint) {
  return { placeId: waypoint.place_id };
}

export default function MapEmbed({ waypoints, onRouteChanged, avoidHighways, avoidTolls }) {
  const { isLoaded: isGoogleScriptLoaded } = useGoogleScript();
  const mapRef = useRef();
  const directionsRendererRef = useRef();

  useEffect(() => {
    if (isGoogleScriptLoaded && waypoints && waypoints.length >= 2) {
      // NOTE: we are assuming the waypoints are in sorted order.
      const origin = createGooglePlace(waypoints.at(0));
      const destination = createGooglePlace(waypoints.at(-1));
      const googleWaypoints = waypoints.slice(1, -1).map((waypoint) => ({ location: createGooglePlace(waypoint) }));

      const directionRequest = {
        origin,
        destination,
        waypoints: googleWaypoints,
        travelMode: 'DRIVING',
        avoidHighways,
        avoidTolls
      };

      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(directionRequest)
        .then(directionsResult => {
          if (directionsResult.status === 'OK') {
            onRouteChanged(directionsResult.routes[0]);

            // Unbind previous direction renderer from map so it doesn't continue displaying an old route.
            directionsRendererRef.current?.setMap(null);

            // Create a new directions renderer with the new route
            // eslint-disable-next-line no-undef
            directionsRendererRef.current = new google.maps.DirectionsRenderer({
              directions: directionsResult,
              map: mapRef.current
            });
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Error while loading directions', error);
        });
    }
  }, [isGoogleScriptLoaded, waypoints, onRouteChanged, avoidHighways, avoidTolls]);

  if (!isGoogleScriptLoaded) return <></>;
  return (
    <GoogleMap
      zoom={initialMapZoom}
      center={initialMapCenter}
      mapContainerStyle={mapContainerStyle}
      options={mapOptions}
      onLoad={map => mapRef.current = map}
    />
  );
}
