import { useRef, useState } from 'react';
import { Redirect, useParams, Link as RouterLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Link, Text } from '@chakra-ui/react';
import Header from '../Header/Header';

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

  if (user) return <Redirect to='/' />;
  return (
    <>
      <Header />
      <Flex
        justifyContent='center'
        alignItems='start'
      >
        <Box
          marginTop='75px'
          width='80%'
          maxWidth='450px'
          boxShadow='xl'
          padding='20px'
          rounded='xl'
        >
          <Text fontSize='3xl' marginBottom='30px'>
            {`Please ${presentableAuthMethod.toLocaleLowerCase()} to continue.`}
          </Text>
          <Flex direction='column' alignItems='center' gap='5px'>
            <Text color='red'>{error ? error + '.' : '\u00A0'}</Text>
            <FormControl isInvalid={emailInvalid}>
              <FormLabel>Email</FormLabel>
              <Input
                ref={emailInputRef}
                type="email"
                onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              />
              {emailInvalid
                ? <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>
                : <FormHelperText>&nbsp;</FormHelperText>}
            </FormControl>
            <FormControl isInvalid={passwordInvalid}>
              <FormLabel>Password</FormLabel>
              <Input
                ref={passwordInputRef}
                type="password"
                onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              />
              {passwordInvalid
                ? <FormErrorMessage>Password is required.</FormErrorMessage>
                : <FormHelperText>&nbsp;</FormHelperText>}
            </FormControl>
            <Button
              marginY='20px'
              onClick={handleSubmit}
              alignSelf="end"
            >
              {presentableAuthMethod}
            </Button>
            {authMethod === 'sign-in'
              ?
              <Link as={RouterLink} to='/auth/sign-up'>
                Need to create an account? Sign Up.
              </Link>
              :
              <Link as={RouterLink} to='/auth/sign-in'>
                Already have an account? Sign In.
              </Link>}
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
