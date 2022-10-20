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
  const [place, setPlace] = useState();

  if (ref) {
    ref.current = {
      clear() {
        setInputValue('');
        setPlace();
        onChange();
      }
    };
  }

  const onPlaceChanged = () => {
    const newPlace = autocompleteRef.current.getPlace();
    setPlace(newPlace);
    setInputValue(newPlace.name);
    onChange(newPlace);
  };

  const onInputChanged = (e) => {
    setInputValue(e.target.value);
    if (place) {
      setPlace();
      onChange();
    }
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
