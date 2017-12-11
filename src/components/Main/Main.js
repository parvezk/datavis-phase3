import React from "react";
import { Switch, Route } from 'react-router-dom';

import Landing from './../Landing/Landing';
import List from './../Link/Link';

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
        <div className="title-area">
        </div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/list" component={List} />
        </Switch>
      </main>

  );
    

  }
}

export default Main;
