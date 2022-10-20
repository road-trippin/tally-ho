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

    const localLink = (dev) => {
      const link = `process.env.PUBLIC_URL/assets/${dev}.png`;
      return link;
    };

    const gitLink = (dev) => {
      const link = `url(www.github.com/${dev})`
      return link;
    };

    const linkedLink = (dev) => {
      const link = `url(www.linkedin.com/in/${dev})`
    }


  return (
    <section>

      <h2 className="title">TALLY-HO!</h2>
      <h4 className="mission">......</h4>
      <strong>Don&apos;t forget your trips!</strong>

      {
        devs.map((dev) => {
          <div>
            <a href={ devs.map((dev) => gitPhoto(dev.git)) } target="_blank">
              {
                photoLink(dev.local)
              }</a><br />
            <a href={ devs.map((dev) => gitPhoto(dev.git)) } target="_blank">
              {
                devs.map((dev) => dev.local)
              }</a><br />
            <a href={ devs.map((dev) => linkedLink(dev.linked))}


            }></a>
          </div>
        })
      }

    </section>
   )




}



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