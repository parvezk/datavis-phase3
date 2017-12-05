import React from "react";
import { Switch, Route } from 'react-router-dom';

import Landing from './../Landing/Landing';
import List from './../Link/Link';

import './app.css';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div className="home">Main page</div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/list" component={List} />
        </Switch>
      </div>

  );
    

  }
}

export default Main;
