import React from 'react';
import Header from '../Header/Header';

export default function AboutPage() {
  const devs = [
    { name: 'David Quennoz', gitHubUserName: 'david-qz', linkedInUserName: 'david-quennoz' },
    { name: 'Dillon Brock', gitHubUserName: 'dillon-brock', linkedInUserName: 'dillon-brock' },
    { name: 'Allison Ause', gitHubUserName: 'Allison-Ause', linkedInUserName: 'allisonause' },
    { name: 'Adam Robson', gitHubUserName: 'Adam-Robson', linkedInUserName: 'adamrrobson' }
  ];

  // set functions for inserting names into paths when mapping through and calling for the links and images
  function photoFn(dev) {
    return process.env.PUBLIC_URL + `/assets/${dev.name}.png`;
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
    <>
      <Header
        navLinks={[{ text: 'Home', path: '/' }]}
      />
      <section>
        <h2 className="title">TALLY-HO!</h2>
        <h4 className="subtitle">ABOUT US</h4>
        {
          devs.map((dev, index) => (
            <div key={ index }>
              <a href={ gitHubFn(dev) } target="_blank noreferrer">
                <img src={ photoFn(dev) } />
                <p>{ dev.name }</p>
                <p>this is for something about me</p>
              </a>

              <a href={ gitHubFn(dev) } target="_blank noreferrer">
                <img width={ '32'} src={ iconFn('gitHubIcon') } alt="gitHub-icon" />
              </a>

              <a href={ linkedInFn(dev) } target="_blank noreferrer">
                <img width={ '32'} src={ iconFn('linkedInIcon') } alt="linkedIn-icon" />
              </a>
            </div>
          ))
        }
      </section>
    </>
  );
}
