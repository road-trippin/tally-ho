import { checkError, client } from './client';

export async function getAllTrips() {
  const response = await client.from('trips').select().order('created_at', { ascending: false });

  return checkError(response);
}

export async function getTripById(id) {
  const response = await client.from('trips').select().match({ id }).single();

  return checkError(response);
}

export async function createTrip(tripData) {
  const response = await client.from('trips').insert(tripData).single();

  return checkError(response);
}

export async function updateTrip(tripData) {
  const response = await client.from('trips').update(tripData).match({ id: tripData.id }).single();

  return checkError(response);
}

export async function deleteTrip(id) {
  const response = await client.from('trips').delete().match({ id }).single();

  return checkError(response);
}
