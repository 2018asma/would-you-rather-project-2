import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,Button } from "reactstrap";
import { Link , withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import React, { PureComponent, Fragment } from "react";
import User from "./User";

class NavBar extends PureComponent {
  state = {
    isOpen: false
  };

  toggle = () =>  {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { authedUser } = this.props;

    return (
      <div>
        <Navbar bg="primary" variant="dark" light expand="md">
          {authedUser &&
          <Fragment>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/add">New Question</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/leaderboard">LeaderBoard</NavLink>
                </NavItem>
                <NavItem>
                  <User id={authedUser}/>
                </NavItem>
                <NavItem>
                  <Button 
                  tag={Link} 
                  to='/logout' 
                  color='danger'
                  style={{
                    margin: '5px'
                  }}
                  >Logout</Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Fragment>
          }
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(NavBar))
