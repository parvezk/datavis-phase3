import React from "react";
import { Switch, Route } from 'react-router-dom';

import Landing from './../Landing/Landing';
import StaticPage from './../StaticPage/StaticPage';

import './styles.scss';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <main className="main" >
        
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/list" component={StaticPage} />
        </Switch>
      </main>

  );

  }
}

export default Main;
