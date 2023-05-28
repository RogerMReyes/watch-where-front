import React from 'react';
import Roger from '../imgs/Profilepicture.jpg'
import '../css/About.css';
import { Button } from 'react-bootstrap';

class About extends React.Component {
  render() {
    return (
      <div className='about'>
        <img src={Roger} alt='Roger' height={500} />
        <p>Hi, my name is Roger Reyes.
          I am a Software Developer based in the Greater Seattle Area with a focus in Java Development. I am a Code Fellows graduate with a certificate in Advanced Software Development with Java. Prior to this I was in the Army for 7 years as a satellite communications technician. A majority of this time was spent overseas in Okinawa, Japan where I planned and serviced hundreds of large scale telecommunication operations across the Pacific region. After completing my contract with the US Army I decided to continue my education and went on to pursue a degree in Computer Science. It was during this time I had the opportunity to focus solely on programming by attending the Coding Bootcamp Code Fellows. After graduating I am now ready to take my ambitions and passions to a company that I can grow with and push past their goals and visions.</p>
        <div>
          <Button type="button" variant='outline-warning'> <a href='https://www.linkedin.com/in/rogermreyes/'>
            <i class="devicon-linkedin-plain"></i>
            LinkedIn</a></Button>
          <Button type="button" variant='outline-warning'> <a href='https://github.com/RogerMReyes'><i class="devicon-github-original colored"></i> GitHub</a></Button>
        </div>
      </div>
    );
  }
}

export default About;