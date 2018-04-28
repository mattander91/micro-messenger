const React = require('react');
const $ = require('jquery');

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

  signupNewUser(e) {
    e.preventDefault();
    let newUser = {
      username: this.state.newUserName,
      password: this.state.newPassword
    }
    $.ajax({
      type: 'POST',
      url: 'https://micro-messenger.herokuapp.com/signUp',
      data: newUser,
      success: () => {
        sessionStorage.setItem('user', this.state.newUserName);
        this.props.handleHome();
        this.props.setUser();
      },
      error: (err) => {
        // console.log('Signup failed: ', err);
      }
    });
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