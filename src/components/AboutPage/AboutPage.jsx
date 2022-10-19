import React from 'react';


const AboutPage = () => {

  const devs = ['David', 'Dillon', 'Allison', 'Adam'];

  const photoLink = (i) => {
    const localLink = `process.env.PUBLIC_URL/assets/${i}.png`;
    return localLink;
  };

  return (
    <section className="wrapper">
            <div className="mission">
                <h2 className="title">TALLY-HO!</h2><!-- need mission statement -->
                <h4 className="mission">......</h4>
                <strong>Don't forget your trips!</strong>
            </div>
      { devs.map((dev) => photoLink(dev)) }
    </section>


  );
};

export default AboutPage;