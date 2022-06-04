import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
    <div className="App">
      <Header />
      <div className="container container-header">
          <div className="row">
            <div className="col-lg-12 py-4">
              <div className="btn-group" style={{ backgroundColor: "#343a40", color: "#00000", borderRadius: '10px' }}>
                <button type="button" style={{ color: "white" }} className="btn btn-select-action">Select an Action</button>
                <button type="button" style={{ color: "white" }} id="action-dropdown" className="btn btn-select-action dropdown-toggle" data-bs-toggle="dropdown">
                <span className="caret"></span>
                <span className="sr-only"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="action-dropdown">
                <li><Link to={'./enrollments'} className="dropdown-item"><a href="#" className="dropdown-item">Enrollments</a></Link></li>
                <li><Link to={'./learndot_enrollments'} className="dropdown-item"><a href="#" className="dropdown-item">Learndot Enrollments</a></Link></li>
                <li><Link to={'./prereqcheck'} className="dropdown-item"><a href="#" className="dropdown-item">Prerequisite Checker</a></Link></li>
                <li role="separator" className="divider"></li>
                <li><Link to={'./#'} className="dropdown-item"><a href="#" className="dropdown-item">Admin</a></Link></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
    );
  }
}
export default Home;