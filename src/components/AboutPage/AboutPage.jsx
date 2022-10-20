import React from 'react';
import { Link } from 'react-router-dom';


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

  const localDriveFn = (dev) => {
    const localDriveLink = `process.env.PUBLIC_URL/assets/${dev}.png`;
    return localDriveLink;
  };

  const gitHubFn = (dev) => {
    const gitHubLink = `url(www.github.com/${dev})`;
    return gitHubLink;
  };

  const linkedInFn = (dev) => {
    const linkedInLink = `url(www.linkedin.com/in/${dev})`;
    return linkedInLink;
  };

  return (
    <section>

      <h2 className="title">TALLY-HO!</h2>
      <h4 className="mission">......</h4>
      <strong>Don&apos;t forget your trips!</strong>

      {
        devs.map((dev) => {
          <div>
            <Link to={ gitHubFn(dev.git) } target="_blank">{ localDriveFn(dev.local) }</Link>
            <br />
            <Link to={ gitHubFn(dev.git) } target="_blank">{ dev.local }</Link>
            <br />
            <Link to={ linkedInFn(dev.linked) } target="_blank">this is something about me</Link>
            <br />
          </div>;
        })
      }
    </section>
  );
};

export default AboutPage;