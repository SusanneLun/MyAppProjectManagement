import React from 'react';

/* Add NavLink to importer */
import { NavLink } from 'react-router-dom';

/* Add basic styling for NavLinks */
const link = {
  width: '100px',
  height: '80px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'purple',
  textDecoration: 'none',
  color: 'white',
}

/* add the navbar component */
const Navbar = () =>
  <div className='navbar'>
    <NavLink
      to="/"
      /* set exact so it knows to only set activeStyle when route is deeply equal to link */
      exact
      /* add styling to Navlink */
      style={link}
      /* add prop for activeStyle */
      activeStyle={{
        background: 'purple'
      }}
    >PM Influence</NavLink>
    <NavLink
    to="/signin"
    exact
    style={link}
    activeStyle={{
      background: 'purple'
    }}>Sign in</NavLink>
    <NavLink
    to="/signup"
    exact
    style={link}
    activeStyle={{
      background: 'purple'
    }}>Sign up</NavLink>
    <NavLink
    to="/projects"
    exact
    style={link}
    activeStyle={{
      background: 'purple'
    }}>My Projects</NavLink>
    <NavLink
      to="/how_to_rate"
      exact
      style={link}
      activeStyle={{
        background: 'purple'
      }}
    >How To Rate</NavLink>
  </div>;



export default Navbar;
