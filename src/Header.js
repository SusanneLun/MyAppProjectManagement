import React from 'react'
import { Link } from 'react-router-dom'


const button = {
  color: 'purple'
}


const Header = ({ username, signout }) =>
<header className="header">
<h5>
{
  username ? `Welcome, ${username}!` : 'Welcome to PM Influence!'
}
<p></p>
{
  username
  ? <Link to='/home'> <button style={button} onClick={signout}>Sign Out</button> </Link>
  : <Link to='/signin'><button>Sign In</button></Link>
}
</h5>
</header>

export default Header;
