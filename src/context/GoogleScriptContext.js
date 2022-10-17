import { useJsApiLoader } from '@react-google-maps/api';
import { createContext, useContext } from 'react';

const GoogleScriptContext = createContext();
const libraries = ['places'];
const GoogleScriptProvider = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return <GoogleScriptContext.Provider value={{ isLoaded, loadError }}>{children}</GoogleScriptContext.Provider>;
};

const useGoogleScript = () => {
  const context = useContext(GoogleScriptContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export { useGoogleScript, GoogleScriptProvider };