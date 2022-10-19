import { Box, Flex, Menu, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';

export default function Header() {
  const { user, setUser } = useUserContext();

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <header>
      <Flex
        padding="10px"
        backgroundColor="#319795"
        justifyContent="space-between"
        alignItems="center"
        color="white"
      >
        <Link to="/">
          <Text fontSize="3xl" fontWeight="bold">Tally Ho!</Text>
        </Link>
        { user && (
          <Menu>
            <HamburgerIcon w={8} h={8}></HamburgerIcon>
          </Menu>
        )}
      </Flex>
    </header>
  );
}
