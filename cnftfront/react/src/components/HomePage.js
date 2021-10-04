import React, { Component } from "react";
import { Alert, Table } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <p>This is the home page</p>

            <Alert variant="success">
                        <Alert.Heading>Query Tip Result</Alert.Heading>
                        <Table >
                            <thead>
                                <tr>
                                    <th>Era</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Era</td>
                                </tr>
                            </tbody>
                        </Table>
                        <hr />
            </Alert>
          </Route>
         
        </Switch>
      </Router>
    );
  }
}