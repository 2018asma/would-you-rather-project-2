import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import User from './User'
import PropTypes from "prop-types";

function Leaderboard(props) {
  const { users } = props;
  return (
    <div className='card-container'>
      {users.map((user, index) => (
        <Card >
          <CardHeader>
      <CardTitle>
        <User id={user.id}/>
      </CardTitle>

          </CardHeader>
          <CardBody className='leader-board'>
            <div>
            <CardText>
              Asked Questions: {user.questions.length}
            </CardText>
            <CardText>
            Answered Questions: {Object.keys(user.answers).length}
            </CardText>
            </div>
            <div className='score'>
            <CardText>
              Score: {user.questions.length + Object.keys(user.answers).length}
            </CardText>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

Leaderboard.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = ({ users }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
  };
};

export default withRouter(connect(mapStateToProps)(Leaderboard));
