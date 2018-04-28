const React = require('react');
const Helpers = require('../helpers.js');
const GroupsList = require('./GroupsList.jsx');


class HandleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroup: ''
    }
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.addNewGroup = this.addNewGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  handleAddGroup(e) {
    let newGroup = e.target.value;
    this.setState({
      newGroup: newGroup
    });
  }

  addNewGroup(e) {
    e.preventDefault();
    let newGroup = { groupName: this.state.newGroup }
    let url = 'https://micro-messenger.herokuapp.com/group';
    Helpers.ajaxCalls('POST', url, newGroup, 'addNewGroup', (data) => {
      this.props.fetchGroups();
    });
  }

  deleteGroup(groupName) {
    let data = {groupName: groupName};
    let url = 'https://micro-messenger.herokuapp.com/deleteGroup';
    Helpers.ajaxCalls('DELETE', url, data, 'deleteGroup', (data) => {
      this.props.fetchGroups();
    });
  }

  resetForm() {
    document.getElementById("group").reset();
  }

  render() {
    return (
      <div>
        <form className="top" id="group" onSubmit={(event) => {
          this.addNewGroup(event)
          this.resetForm(event)}}>
          <input type="text" placeholder="Add new group..." onChange={(event) => {
            this.handleAddGroup(event)}
          }/>
        </form>
        <GroupsList
          groups={this.props.groups}
          fetchMessagesFromClick={this.props.fetchMessagesFromClick}
          deleteGroup={this.deleteGroup}
          deleteMessages={this.props.deleteMessages}
        />
      </div>
    );
  }

}

module.exports = HandleGroup;