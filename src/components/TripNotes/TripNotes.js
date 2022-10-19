import { Box, Button, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { updateTrip } from '../../services/trips';

export default function TripNotes({ trip, setTrip }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tripNotes, setTripNotes] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await updateTrip({ id: trip.id, notes: tripNotes });
    setTrip({ ...trip, notes: tripNotes });
  };

  return (
    <Box>
      <Textarea
        isDisabled={!isEditing}
        defaultValue={trip.notes}
        onChange={(e) => setTripNotes(e.target.value)}
      />
      <Button onClick={isEditing ? handleSave : handleEdit}>{isEditing ? 'Save' : 'Edit'}</Button>
    </Box>
  );
}