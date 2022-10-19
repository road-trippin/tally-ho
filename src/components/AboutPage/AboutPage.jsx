import React from 'react';


const AboutPage = () => {

  const devs = [
    {
      local: 'David Quennoz',
      git: 'david-qz',
      linked: 'david-quennoz'
    },
    {
      local: 'Dillon',
      git: 'dillon-brock'
    },
    {
      local: 'Allison',
      git: 'Allison-Ause',
      linked: 'allisonause'
    },
    {
      local: 'Adam',
      git: 'Adam-Robson',
      linked: 'adamrrobson'
    }];

  const photoLink = (i) => {
    const localLink = `process.env.PUBLIC_URL/assets/${i}.png`;
    return localLink;
  };

  const gitPhoto = (devGit) => {
    const gitLink = `https://github.com/${devGit}.png`;
    return gitLink;
  };

  const linkedInPhoto = (devLinkedIn) => {
    const linkedLink = `https://www.linkedin.com/in/${devLinkedIn}`;
    return linkedLink;
  };

  return (
    <section className="wrapper">
      <div className="mission">
        <h2 className="title">TALLY-HO!</h2>
        <h4 className="mission">......</h4>
        <strong>Don&apos;t forget your trips!</strong>
      </div>
      { devs.map((dev) => {
        <div>
          <a href={ devs.map(
            (dev) => gitPhoto(
              dev.git)) }>{
              photoLink(
                dev.local) }</a>
          { gitPhoto(dev.git) }
          { linkedInPhoto(dev.linked) }
        </div>;
      })
      };

    </section>


  );
};

export default AboutPage;