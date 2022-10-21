import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header/Header';
import background from '../../authBG.jpg';

export default function AboutPage() {
  const devs = [
    {
      name: 'David Quennoz',
      gitHubUserName: 'david-qz',
      linkedInUserName: 'david-quennoz',
    },
    {
      name: 'Dillon Brock',
      gitHubUserName: 'dillon-brock',
      linkedInUserName: 'dillon-brock'
    },
    {
      name: 'Allison Ause',
      gitHubUserName: 'Allison-Ause',
      linkedInUserName: 'allisonause'
    },
    {
      name: 'Adam Robson',
      gitHubUserName: 'Adam-Robson',
      linkedInUserName: 'adamrrobson',
      spotifyLink: 'https://open.spotify.com/artist/4NrRxIaVhlouvojuHGq62y?si=WeyC7-d_QUaTgQQafwlQ4g'
    }
  ];

  return (
    <>
      <Header navLinks={[{ text: 'Home', path: '/' }]} />
      <Box
        padding="20px"
        backgroundImage={background}
        backgroundPosition="bottom-left"
        backgroundSize="cover"
      >
        <Text
          className="brand title"
          textAlign="center"
          marginY="25px"
        >
          ABOUT US
        </Text>
        <Flex
          flexFlow="row wrap"
          justifyContent="center"
          gap="50"
        >
          {devs.map((dev, index) => <DevCard key={index} dev={dev} />)}
        </Flex>
      </Box>
    </>
  );
}

function DevCard({ dev }) {
  // set functions for inserting names into paths when mapping through and calling for the links and images
  function photoFn(dev) {
    return process.env.PUBLIC_URL + `/assets/${dev.name}.jpg`;
  }

  function gitHubFn(dev) {
    return `https://www.github.com/${dev.gitHubUserName}`;
  }

  function linkedInFn(dev) {
    return `https://www.linkedin.com/in/${dev.linkedInUserName}`;
  }

  function iconFn(icon) {
    return process.env.PUBLIC_URL + `/assets/${icon}.png`;
  }

  return (
    <Flex
      direction="column"
      backgroundColor="white"
      padding="25px"
      rounded="2xl"
      shadow="dark-lg"
      min-width="320px"
      width="400px"
    >
      <Box rounded="2xl" overflow="hidden">
        <a href={ gitHubFn(dev) } target="_blank noreferrer">
          <img src={ photoFn(dev) } />
        </a>
      </Box>

      <Box marginTop="10px" flexGrow="1">
        <Text fontSize="2rem" fontWeight="medium">
          {dev.name}
        </Text>
      </Box>

      <Flex
        marginTop="40px"
        justifyContent="center"
        gap="20px"
      >
        <a href={ gitHubFn(dev) } target="_blank noreferrer">
          <img width="42" height="42" src={ iconFn('gitHubIcon') } alt="gitHub-icon" />
        </a>

        <a href={ linkedInFn(dev) } target="_blank noreferrer">
          <img width="42" height="42" src={ iconFn('linkedInIcon') } alt="linkedIn-icon" />
        </a>

        {dev.spotifyLink &&
          <a href={dev.spotifyLink} target="_blank noreferrer">
            <img width="42" height="42" src={ iconFn('spotifyIcon') } alt="linkedIn-icon" />
          </a>
        }
      </Flex>
    </Flex>
  );
}
