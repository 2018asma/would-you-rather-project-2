import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import Question from './Question';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class DashBoard extends PureComponent {
  state = {
    activeTab: '1'
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    return (
      <div >
        <Nav tabs style={{ width: '460px', margin: '0 auto'}} >
          <NavItem >
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
             
            >
              Unanswered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Answered
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}  >
          <TabPane tabId="1" >
            <Row style={{display: 'block', width: '500px',margin: '0 auto'}} >
              {unansweredQuestions.map(qid =>
                <Col key={qid} >
                  <Question id={qid}/>
                </Col>
              )}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row style={{display: 'block', width: '500px', margin: '0 auto'}}>
              {answeredQuestions.map(qid =>
                <Col key={qid} >
                  <Question id={qid}/>
                </Col>
              )}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

DashBoard.propTypes = {
  answeredPolls : PropTypes.array,
  unansweredPolls : PropTypes.array
};

function mapStateToProps ({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unansweredQuestions : Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions
  }
}

export default withRouter(connect(mapStateToProps)(DashBoard))
