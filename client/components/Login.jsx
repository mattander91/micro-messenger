const React = require('react');
const Helpers = require('../helpers.js');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: '',
      loginPassword: ''
    }
    this.handleLoginUsername = this.handleLoginUsername.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }


  handleLoginUsername(e) {
    var username = e.target.value;
    this.setState({
      loginUsername: username
    });
  }

  handleLoginPassword(e) {
    var password = e.target.value;
    this.setState({
      loginPassword: password
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

  loginUser(e) {
    e.preventDefault();
    let user = {
      loginUsername: this.state.loginUsername,
      loginPassword: this.state.loginPassword
    }
    let url = 'https://micro-messenger.herokuapp.com/login';
    if (this.checkInput(user.loginUsername) && this.checkInput(user.loginPassword)) {
      Helpers.ajaxCalls('POST', url, user, 'loginUser', (data) => {
        sessionStorage.setItem('user', this.state.loginUsername);
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
        <form onSubmit={this.loginUser}>
          <p>Enter Username: </p>
          <input onChange={(event) => {
            this.handleLoginUsername(event)}
          }/>
          <p>Enter Password</p>
          <input onChange={(event) => {
            this.handleLoginPassword(event)}
          }/>
          <p></p>
          <button>Sign In</button>
          <button onClick={this.props.handleHome}>Home</button>
        </form>
      </div>
    );
  }

}


module.exports = Login;