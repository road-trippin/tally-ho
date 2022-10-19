import { Box, Button, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useTrip } from '../../hooks/useTrip';
import { updateTrip } from '../../services/trips';

export default function TripNotes({ id, setTrip }) {
  const [isEditing, setIsEditing] = useState(false);
  const { tripNotes, setTripNotes } = useTrip(id);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    const updatedTrip = updateTrip({ id, notes: tripNotes });
    setTrip(updatedTrip);
  };

  return (
    <Box>
      <Textarea
        isDisabled={!isEditing}
        defaultValue={tripNotes}
        onChange={(e) => setTripNotes(e.target.value)}
      />
      <Button onClick={isEditing ? handleSave : handleEdit}>{isEditing ? 'Save' : 'Edit'}</Button>
    </Box>
  );
}