import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider
} from '@chakra-ui/react';

export default function Header({ navLinks = [] }) {

  const history = useHistory();

  const { user, setUser } = useUserContext();

  const firstName =
    user?.email.split('@')[0].charAt(0).toUpperCase() + user?.email.split('@')[0].slice(1);


  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    history.push('/auth/sign-in');
  };

  return (
    <header>
      <Flex
        backgroundColor="#319795"
        justifyContent="space-between"
        alignItems="center"
        color="white"
      >
        <Link to='/'>
          <span className="header-container">
            <img id="logo" src={ process.env.PUBLIC_URL + '/logo192.png' } style={ {
              height: '10',
              width: '10'
            } } alt="logo" />
            <Text fontSize="3xl" className="brand" id="tally-ho" fontWeight="bold">TALLYHO!</Text>
          </span>
        </Link>

        { user && (

          <Menu>
            <MenuButton>
              <HamburgerIcon marginRight="25px" w={35} h={35}></HamburgerIcon>
            </MenuButton>
            <MenuList color="teal">
              <MenuGroup title="Navigation">
                {
                  navLinks.map((link, index) => <MenuItem key={ index } onClick={() => history.push(link.path)}>{ link.text }</MenuItem>)
                }
              </MenuGroup>
              <MenuDivider></MenuDivider>
              <MenuGroup title={`You are signed in as ${firstName}`}>
                <MenuItem onClick={ handleSignOut }>Sign Out</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>

        )}
      </Flex>
    </header>
  );
}
