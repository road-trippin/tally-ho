import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider
} from '@chakra-ui/react';

export default function Header() {

  const { user, setUser } = useUserContext();

  const firstName =
    user?.email.split('@')[0].charAt(0).toUpperCase() + user?.email.split('@')[0].slice(1);


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
            <MenuButton>
              <HamburgerIcon w={8} h={8}></HamburgerIcon>
            </MenuButton>
            <MenuList color="teal">
              <MenuItem>{`You are signed in as ${firstName}`}</MenuItem>
              <MenuItem onClick={ handleSignOut }>Sign Out</MenuItem>
            </MenuList>
          </Menu>

        )}
      </Flex>
    </header>
  );
}
