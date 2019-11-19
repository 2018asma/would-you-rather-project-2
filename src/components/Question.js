import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Button
} from "reactstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import User from "./User";

class Question extends React.Component {
  constuctor() {
    this.loadQuestionDetails = this.routeChange.bind(this);
  }
  loadQuestionDetails(e, questionId) {
    let path = `/questions/` + questionId;
    this.props.history.push(path);
  }
  render() {
    const { question, auth } = this.props;
    return (
      <Card style={{ width: "100%", marginBottom: "15px" }}>
        <CardHeader>
          <User id={question.author} />
        </CardHeader>

        <CardBody>
          <ul>
            <li style={{display: 'flex', justifyContent: 'space-between'}}
            >
              <div>
              {question.optionOne.text}
              </div>
              <div>
              {
                question.optionOne.votes.includes(auth) ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUomMCRZprTkiLqoTvNrSa9n_yq5isqH5XtAyErjzm4ZW2Bznz' alt='your answer'
                style={{
                  width: '25px',
                  
                }}
                /> : ""
              }
              </div>
            </li>
            <li style={{display: 'flex', justifyContent: 'space-between'}}
              
            >
              <div>
              {question.optionTwo.text}
              </div>
              <div>
              {
                question.optionTwo.votes.includes(auth) ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUomMCRZprTkiLqoTvNrSa9n_yq5isqH5XtAyErjzm4ZW2Bznz' alt='your answer'
                style={{
                  width: '25px',
                  
                }}
                /> : ""
              }
              </div>
            </li>
          </ul>
          <Button
            onClick={e => this.loadQuestionDetails(e, question.id)}
            color="danger"
            style={{
              width: "100%",
              margin: "10px"
            }}
          >
            Submit
          </Button>
        </CardBody>
      </Card>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, { id }) {
  return {
    question: state.questions[id],
    auth: state.authedUser
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Question)
);
