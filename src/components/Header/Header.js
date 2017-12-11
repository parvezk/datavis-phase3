import React from "react";
import { Link } from "react-router-dom";

import './styles.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="header">
        <div className="banner">
          <h2>Measuring media immersion:</h2>
          <h4>AP and Multimer study</h4>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
          </ul>
        </nav>
        </div>
        
      </div>
    );
  }
}

export default Header;
