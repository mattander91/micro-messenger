const React = require('react');

const About = (props) => (
  <div>
    <div className='about'>
      <button onClick={props.handleHome}>Home</button>
      <p></p>
      <h1>About</h1>
        <p>
          Micro-Messenger is a simple, micro-service based chat application consisting of an authentication, group, message, and web service and serves as a demonstration for how each service is connected together. Micro-Messenger runs on Docker for local development and each micro-service runs in a Docker container.
        </p>
      <h1>Usage</h1>
      <p>
        1.) To submit/send messages, first create a new group in the input that says 'Add new group...' and click enter.
      </p>
      <p>
        2.) Click on the group name on the left column and type a message in the input toward the bottom of the page, and click enter to submit the message.
      </p>
      <p>
        3.) If you are currently logged in, you should see your messages appear toward the right side of the page with your username tagged.
      </p>
      <p>
        4.) To delete a group, click the trash can icon next to the group name to remove the group and the group's messages.
      </p>
    </div>
  </div>
);

module.exports = About;
