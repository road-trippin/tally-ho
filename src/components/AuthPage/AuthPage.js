import { useRef, useState } from 'react';
import { Redirect, useParams, Link as RouterLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import Header from '../Header/Header';
import authBackground from '../../authBG.jpg';

export default function AuthPage() {
  const { type: authMethod } = useParams();
  const { user, setUser } = useUserContext();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const [error, setError] = useState();

  const isFormInvalid = () => {
    let invalid = false;
    setEmailInvalid(false);
    setPasswordInvalid(false);

    if (emailInputRef.current.value === '' || !emailInputRef.current.checkValidity()) {
      setEmailInvalid(true);
      invalid = true;
    }
    if (passwordInputRef.current.value === '') {
      setPasswordInvalid(true);
      invalid = true;
    }
    return invalid;
  };

  const handleSubmit = async () => {
    if (isFormInvalid()) return;

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    try {
      const userResponse = await authUser(email, password, authMethod);
      setUser(userResponse);
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const presentableAuthMethod = authMethod === 'sign-in' ? 'Sign In' : 'Sign Up';

  if (user) return <Redirect to="/" />;
  return (
    <>
      <Header />
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="column"
        backgroundImage={authBackground}
        backgroundPosition="bottom-left"
        backgroundSize="cover"
      >
        <span className="brand title">ADVENTURE AWAITS!</span>
        <Box
          marginTop="50px"
          width="80%"
          maxWidth="450px"
          boxShadow="dark-lg"
          padding="20px"
          rounded="xl"
          backgroundColor="white"
        >
          <Text color="#006D77" fontSize="3xl" marginBottom="15px">
            {`Please ${presentableAuthMethod.toLocaleLowerCase()} to continue.`}
          </Text>
          <Flex direction="column" alignItems="center" gap="5px">
            <Text color="red" visibility={error ? 'visible' : 'hidden'}>
              {String(error)}
            </Text>
            <FormControl isInvalid={emailInvalid}>
              <FormLabel color="#FD9834">Email</FormLabel>
              <Input
                placeholder="name@example.com"
                ref={emailInputRef}
                type="email"
                onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              />
              {emailInvalid ? (
                <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>
              ) : (
                <FormHelperText visibility="hidden">&nbsp;</FormHelperText>
              )}
            </FormControl>
            <FormControl isInvalid={passwordInvalid}>
              <FormLabel color="#FD9834">Password</FormLabel>
              <Input
                placeholder="•••••••••"
                ref={passwordInputRef}
                type="password"
                onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              />
              {passwordInvalid ? (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              ) : (
                <FormHelperText visibility="hidden">&nbsp;</FormHelperText>
              )}
            </FormControl>
            <Button marginBottom="20px" onClick={handleSubmit} alignSelf="end" colorScheme="teal">
              {presentableAuthMethod}
            </Button>
            {authMethod === 'sign-in' ? (
              <Link as={RouterLink} to="/auth/sign-up">
                Need to create an account? Sign Up.
              </Link>
            ) : (
              <Link as={RouterLink} to="/auth/sign-in">
                Already have an account? Sign In.
              </Link>
            )}
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
