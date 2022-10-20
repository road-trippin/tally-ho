import { Input } from '@chakra-ui/react';
import { Autocomplete } from '@react-google-maps/api';
import { forwardRef, useRef, useState } from 'react';
import { useGoogleScript } from '../../context/GoogleScriptContext';

const minimumFields = ['place_id', 'name'];

export default forwardRef(function PlaceInput({
  onChange = () => {},
  placeholder,
  fields = []
}, ref) {
  const { isLoaded: isGoogleScriptLoaded } = useGoogleScript();
  const autocompleteRef = useRef();

  const [inputValue, setInputValue] = useState('');

  if (ref) {
    ref.current = {
      clear() {
        setInputValue('');
        onChange();
      }
    };
  }

  const onPlaceChanged = () => {
    const newPlace = autocompleteRef.current.getPlace();
    setInputValue(newPlace.name);
    onChange(newPlace);
  };

  const onInputChanged = (e) => {
    setInputValue(e.target.value);
    onChange();
  };

  if (!isGoogleScriptLoaded) return <div></div>;
  return (
    <Autocomplete
      fields={Array.from(new Set([...minimumFields, ...fields]))}
      onLoad={(autocomplete => autocompleteRef.current = autocomplete)}
      onPlaceChanged={onPlaceChanged}
    >
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={onInputChanged}
      />
    </Autocomplete>
  );
});
