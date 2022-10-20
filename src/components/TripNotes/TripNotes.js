import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { updateTrip } from '../../services/trips';

export default function TripNotes({ trip, setTrip }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tripNotes, setTripNotes] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await updateTrip({ id: trip.id, notes: tripNotes });
    setTrip({ ...trip, notes: tripNotes });
  };

  return (
    <>
      <Button onClick={onOpen} marginBottom="12px" marginTop="10px" justifySelf="flex-end" padding="12px" colorScheme="teal" variant="ghost">{trip.notes ? 'View Trip Notes' : 'Add Trip Notes'}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="2px solid #006D77">Notes for {trip.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box h="100px">
              {isEditing ?
                <Textarea
                  defaultValue={trip.notes}
                  onChange={(e) => setTripNotes(e.target.value)}
                />
                : 
                trip.notes ? <Text>{trip.notes}</Text> : <Text as="i">No notes yet</Text>
              }
            </Box>
            <Button onClick={isEditing ? handleSave : handleEdit}>{isEditing ? 'Save' : 'Edit'}</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}