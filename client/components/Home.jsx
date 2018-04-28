const React = require('react');

const Home= (props) => {
  return (
    <div className="header">
      {props.user
        ? <div className='buttons'>
            <button onClick={props.handleAbout}>About</button>
            <button onClick={props.handleLogout}>Log out</button>
          </div>
        : <div className='buttons'>
            <button onClick={props.handleAbout}>About</button>
            <button onClick={props.handleSignupClick}>Sign Up</button>
            <button onClick={props.handleLoginClick}>Log in</button>
          </div>
      }
    </div>
  );
}

module.exports = Home;