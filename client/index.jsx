const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const HandleMessages = require('./components/HandleMessages.jsx');
const SignUp = require('./components/SignUp.jsx');
const Home = require('./components/Home.jsx');
const HandleGroup = require('./components/HandleGroup.jsx');
const Login = require('./components/Login.jsx');
const About = require('./components/About.jsx');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentState: 'Home',
      loggedIn: false,
      currentUser: false,
      currentGroup: '',
      messages: [],
      groups: []
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.setUser = this.setUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.fetchMessagesFromClick = this.fetchMessagesFromClick.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
  }

/*###################################*/

  componentDidMount() {
    this.setUser();
    this.fetchGroups();
  }

  fetchMessagesFromClick(groupName) {
    $.ajax({
      type: 'GET',
      url: 'https://micro-messenger.herokuapp.com/getMessages',
      data: {groupName: groupName},
      success: (fetchedMessages) => {
        this.setState({
          messages: fetchedMessages,
          currentGroup: groupName
        });
      },
      failure: (err) => {
        console.log(err);
      }
    });
  }

  fetchGroups() {
    $.ajax({
      type: 'GET',
      url: 'https://micro-messenger.herokuapp.com/getGroups',
      success: (data) => {
        this.setState({
          groups: data
        });
      },
      failure: (err) => {
        console.log('error: ', err);
      }
    });
  }

  deleteMessages(groupName) {
    $.ajax({
      type: 'DELETE',
      url: 'https://micro-messenger.herokuapp.com/deleteMessages',
      data: {groupName: groupName},
      success: () => {
        this.setState({
          currentGroup: ''
        });
      }
    });
  }

  setUser() {
    this.setState({
      currentUser: sessionStorage.getItem('user')
    });
  }


/*###################################*/

  handleLogout() {
    sessionStorage.removeItem('user');
    this.setState({
      currentUser: ''
    });
  }

  handleSignupClick() {
    this.setState({
      currentState: 'signup'
    });
  }

  handleLoginClick() {
    this.setState({
      currentState: 'login'
    });
  }

  handleHome() {
    this.setState({
      currentState: 'Home'
    });
  }

  handleAbout() {
    this.setState({
      currentState: 'about'
    });
  }

/*###################################*/

  render () {
    if (this.state.currentState === 'Home') {
      return (
        <div>
          <div>
            <Home
              handleSignupClick={this.handleSignupClick}
              handleLoginClick={this.handleLoginClick}
              handleLogout={this.handleLogout}
              handleAbout={this.handleAbout}
              user={this.state.currentUser}
            />
          </div>
          <div className="left">
            <HandleGroup
              fetchMessagesFromClick={this.fetchMessagesFromClick}
              fetchGroups={this.fetchGroups}
              groups={this.state.groups}
              deleteMessages={this.deleteMessages}
            />
          </div>
          <div className="right">
            <HandleMessages
              user={this.state.currentUser}
              group={this.state.currentGroup}
              messages={this.state.messages}
              fetchMessagesFromClick={this.fetchMessagesFromClick}
              numberOfGroups={this.state.groups.length}
            />
          </div>
        </div>
      )
    }
    if (this.state.currentState === 'signup') {
      return (
        <div>
          <SignUp
            handleHome={this.handleHome}
            setUser={this.setUser}
          />
        </div>
      )
    }
    if (this.state.currentState === 'login') {
      return (
        <div>
          <Login
            handleHome={this.handleHome}
            setUser={this.setUser}
          />
        </div>
      )
    }
    if (this.state.currentState === 'about') {
      return (
        <div>
          <About
            handleAbout={this.handleAbout}
            handleHome={this.handleHome}
          />
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));