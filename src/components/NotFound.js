import React from "react"
import PropTypes from "prop-types"
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import CardTitle from "reactstrap/es/CardTitle";

const NotFound = ({ history }) => (
  <Card style={{width: '50%',margin: '0 auto'}}>
    <CardHeader>404</CardHeader>
    <CardBody>
      <CardTitle>Page Not Found</CardTitle>
      <Button 
      color="danger" 
      onClick={() => history.push("/")}
      style={{
        width: '100%'
      }}
      >
        Go Home
      </Button>
    </CardBody>
  </Card>
);

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default NotFound
