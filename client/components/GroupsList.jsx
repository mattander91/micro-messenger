const React = require('react');

const GroupsList = (props) => {
  return (
    <div className="groupList">
      {props.groups.map(group =>
        <div className="group" onClick={() => {
          props.fetchMessagesFromClick(group.groupName)}}>{group.groupName}
          <button className="btn" onClick={(event) => {
          props.deleteGroup(group.groupName)
          props.deleteMessages(group.groupName)
          event.stopPropagation()}}><i className="fa fa-trash"></i></button>
      </div>
      )}
    </div>
  );
}

module.exports = GroupsList;