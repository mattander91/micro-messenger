const React = require('react');
const Helpers = require('../helpers.js');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserName: '',
      newPassword: ''
    };

    this.handleNewUsername = this.handleNewUsername.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  handleNewUsername(e) {
    let newUserName = e.target.value;
    this.setState({
      newUserName: newUserName
    });
  }

  handleNewPassword(e) {
    let newPassword = e.target.value;
    this.setState({
      newPassword: newPassword
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

  signupNewUser(e) {
    e.preventDefault();
    let newUser = {
      username: this.state.newUserName,
      password: this.state.newPassword
    }
    let url = 'https://micro-messenger.herokuapp.com/signUp';
    if (this.checkInput(newUser.username) && this.checkInput(newUser.password)) {
      Helpers.ajaxCalls('POST', url, newUser, 'signupNewUser', (data) => {
        sessionStorage.setItem('user', this.state.newUserName);
        this.props.handleHome();
        this.props.setUser();
      });
    } else {
      alert('Username and password must not contain special characters');
    }
  }

  render() {
    return (
      <div className="accountForm">
        <form onSubmit={this.signupNewUser}>
          <p>Enter Username: </p>
          <input onChange={(event) => {
            this.handleNewUsername(event)}
          }/>
          <p>Enter Password</p>
          <input onChange={(event) => {
            this.handleNewPassword(event)}
          }/>
          <p></p>
          <button>Sign Up</button>
          <button onClick={this.props.handleHome}>Home</button>
        </form>
      </div>
    );
   }
}

module.exports = SignUp;