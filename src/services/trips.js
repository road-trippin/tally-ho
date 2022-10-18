import { checkError, client } from './client';

export async function getAllTrips() {
  const response = await client
    .from('trips')
    .select('*, waypoints(*)')
    .order('created_at', { ascending: false });

  const trips = checkError(response);
  trips.forEach(trip => {
    trip.waypoints.sort((a, b) => a.position - b.position);
  });
  return trips;
}

export async function getTripById(id) {
  const response = await client
    .from('trips')
    .select('*, waypoints(*)')
    .match({ id })
    .single();

  const trip = checkError(response);
  trip.waypoints.sort((a, b) => a.position - b.position);
  return trip;
}

export async function createTrip(tripData) {
  const response = await client
    .from('trips')
    .insert(tripData)
    .single();
    
  return checkError(response);
}

export async function updateTrip(tripData) {
  const response = await client
    .from('trips')
    .update(tripData)
    .match({ id: tripData.id })
    .single();

  return checkError(response);
}

export async function updateWaypoints(waypoints) {
  waypoints.forEach((waypoint, i) => {
    waypoint.position = i;
  });

  const response = await client
    .from('waypoints')
    .upsert(waypoints, { ignoreDuplicates: false, onConflict: 'id' })
    .order('position');

  return checkError(response);
}

export async function deleteTrip(id) {
  const response = await client
    .from('trips')
    .delete()
    .match({ id })
    .single();

  const trip = checkError(response);
  trip.waypoints.sort((a, b) => a.position - b.position);
  return trip;
}

// waypoint functions
export async function createWaypoint(tripId, waypointData) {
  const response = await client
    .from('waypoints')
    .insert({ ...waypointData, trip_id: tripId })
    .single();

  return checkError(response);
}

export async function deleteWaypoint(id) {
  const response = await client
    .from('waypoints')
    .delete()
    .match({ id })
    .single();

  return checkError(response);
}

export async function updateWaypoint(waypointData) {
  const response = await client
    .from('waypoints')
    .update(waypointData)
    .match({ id: waypointData.id })
    .single();

  return checkError(response);
}
