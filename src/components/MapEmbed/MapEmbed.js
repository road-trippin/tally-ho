import { SkeletonText } from '@chakra-ui/react';
import { DirectionsService, GoogleMap } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { useGoogleScript } from '../../context/GoogleScriptContext';

const mapContainerStyle = { width: '100%', height: '100%' };
const mapOptions = { streetViewControl: false, mapTypeControl: false, fullscreenControl: false };

export default function MapEmbed({ waypoints, setLegs }) {
  const [shouldLoadDirections, setShouldLoadDirections] = useState(true);
  const [prevWaypoints, setPrevWaypoints] = useState(waypoints);
  const { isLoaded } = useGoogleScript();
  const mapRef = useRef();
  const directionsRendererRef = useRef();

  if (waypoints !== prevWaypoints) {
    setPrevWaypoints(waypoints);
    setShouldLoadDirections(true);
  }

  const directionsResultCallback = (response) => {
    if (response && response.status === 'OK') {
      setShouldLoadDirections(false);

      setLegs(response.routes[0].legs);

      // Unbind previous direction renderer from map so it doesn't continue displaying an old route.
      directionsRendererRef.current?.setMap(null);

      // Create a new directions renderer with the new route
      // eslint-disable-next-line no-undef
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        directions: response,
        map: mapRef.current
      });
    }
  };

  if (!isLoaded) return <SkeletonText />;
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      options={mapOptions}
      onLoad={map => mapRef.current = map}
    >
      {waypoints && waypoints.length >= 2 && shouldLoadDirections && (
        <DirectionsService
          callback={directionsResultCallback}
          options={{
            // NOTE: we are assuming the waypoints are in sorted order.
            origin: { placeId: waypoints[0].place_id },
            destination: { placeId: waypoints[waypoints.length - 1].place_id },
            waypoints: waypoints.slice(1, -1).map((waypoint) => ({ location: { placeId: waypoint.place_id } })),
            travelMode: 'DRIVING',
          }}
        />
      )}
    </GoogleMap>
  );
}
