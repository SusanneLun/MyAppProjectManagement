import React from 'react';
import { Link } from 'react-router-dom'

// Step 1. Import react-router functions



const Home = () => {
  return (

    <div className='welcome_page'>
    <p></p>
    <p></p>
      <h1>Welcome to PM Influence!</h1>
      <p>We help you manage your stakeholders with ease.
      </p>

      <div>
      <h3>How it works</h3>
      <p>
      <ul>
      <ol>1. Register with a username and password.</ol>
      <ol>2. Name your project and give it a description.</ol>
      <ol>3. Start registering your stakeholders with power,
      interest and support ratings,
      <br/>watching them appear
      live at the Power/Interest chart.</ol>
      <ol>4. Change ratings or any other stakeholder information as your project progresses.</ol>
      </ul>
      </p>
      <h3>You will find some more information about Stakeholder Rating
      <Link to="/how_to_rate"> here.</Link></h3>

      </div>
    </div>
  );
};

export default Home;
