const React = require('react');
const Helpers = require('../helpers.js');
const MessagesList = require('./MessagesList.jsx');

class HandleMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }


  handleMessageChange(e) {
    e.preventDefault();
    let message = e.target.value;
    this.setState({
      message: message
    });
  }

  //Prevents HTML injection to form inputs
  checkInput(input) {
    const forbidden = ['>', '<', '}', '{', '.', ',', '|'];
    for (let i = 0; i < forbidden.length; i++) {
      if (input.includes(forbidden[i])) {
        return false;
      }
    }
    return true;
  }

  submitMessage(e) {
    e.preventDefault();
    let messageObj = {
      message: this.state.message,
      username: this.props.user,
      group: this.props.group
    }
    let url = 'https://micro-messenger.herokuapp.com/message';
    if (this.checkInput(messageObj.message)) {
      Helpers.ajaxCalls('POST', url, messageObj, 'submitMessage', (data) => {
        this.props.fetchMessagesFromClick(this.props.group);
      });
    } else {
      alert('Message must not contain special characters');
    }
  }

  resetForm() {
    document.getElementById("message").reset();
  }

  render() {
    if (this.props.group.length > 0) {
      return (
        <div>
          <div>
            <MessagesList
              messages={this.props.messages}
              group={this.props.group}
              user={this.props.user}
            />
          </div>
          <div>
            <form id="message" onSubmit={ (event) => {
              this.submitMessage(event);
              this.resetForm(event)}}>
              <input className="write" type="text" placeholder={'Type a message in ' + this.props.group} onChange={(event) => {this.handleMessageChange(event)}}/>
            </form>
          </div>
        </div>
      )
    } else if (this.props.numberOfGroups === 0) {
        return (
          <div className="top">Create a new group!</div>
        )
      }
      else if (this.props.group.length === 0) {
        return (
          <div className="top">
          {this.props.user
            ? <div>Hello, {this.props.user}. Click a group to see messages</div>
            : <div>Click a group to see messages</div>
          }
          </div>
        )
      }
  }
}




module.exports = HandleMessages;




