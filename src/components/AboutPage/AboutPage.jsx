import React from 'react';


const AboutPage = () => {

  const devs = ['David', 'Dillon', 'Allison', 'Adam'];

  const photoLink = (i) => {
    const localLink = `process.env.PUBLIC_URL/assets/${i}.png`;
    return localLink;
  };

  return (
    <section>{ devs.map((dev) => photoLink(dev)) }</section>


  );
};

export default AboutPage;