import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header/Header';
import background from '../../authBG.jpg';

export default function AboutPage() {
  const devs = [
    {
      name: 'David Quennoz',
      blurb: 'loves listening to The Mountain Goats until my passengers kick me out.',
      gitHubUserName: 'david-qz',
      linkedInUserName: 'david-quennoz',
    },
    {
      name: 'Dillon Brock',
      blurb: 'loves listening to music with their partner.',
      gitHubUserName: 'dillon-brock',
      linkedInUserName: 'dillon-brock'
    },
    {
      name: 'Allison Ause',
      blurb: 'loves finding roadside fruit stands and local textiles.',
      gitHubUserName: 'Allison-Ause',
      linkedInUserName: 'allisonause'
    },
    {
      name: 'Adam Robson',
      blurb: 'loves open windows, the music up, and hwy 1!',
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
          marginY="40px"
        >
          About Us
        </Text>
        <Flex
          flexFlow="row wrap"
          justifyContent="center"
          // alignItems="flex-start"
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
    <VStack
      backgroundColor="white"
      padding="25px"
      rounded="2xl"
      shadow="dark-lg"
      min-width="320px"
      width="400px"
      spacing="30px"
    >
      <Box rounded="2xl" overflow="hidden">
        <a href={ gitHubFn(dev) } target="_blank noreferrer">
          <img src={ photoFn(dev) } />
        </a>
      </Box>

      <Text
        fontSize="1.4rem"
        textAlign="center"
        fontStyle="italic"
        flexGrow="1"
      >
        {`${dev.name} ${dev.blurb}`}
      </Text>

      <HStack spacing="20px">
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
      </HStack>
    </VStack>
  );
}
