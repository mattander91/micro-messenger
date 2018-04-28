const React = require('react');

const MessagesList = (props) => {
  return (
    <div>
      <div className="top">
      {props.user
        ? <div>Hello, {props.user}. You are viewing messages in {props.group}</div>
        : <div>You are viewing messages in {props.group}</div>
      }
      </div>
        {props.messages.map(message =>
          message.username === props.user && props.user !== ''
            ? <div className="bubble me">Message from {message.username}: {message.message}</div>
            : <div className="bubble you">Message from {message.username}: {message.message}</div>
        )}
    </div>
  );
}

module.exports = MessagesList;




