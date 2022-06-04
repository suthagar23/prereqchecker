import React, { Component } from 'react';


class Header extends Component {
  render() {
    return (
        <div>
            <header id="navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light nav-true-legacy">
                <div className="container-fluid" style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', padding: '0 2em'}}>
                    <div>
                    <a className="navbar-brand" href="/" style={{color: '#EF6020'}}>
                        Splunk
                    </a>
                    </div>
                </div>
                </nav>
            </header>
            
            <div className="container container-header" style={{ borderBottom: "4px solid #343a40"}}>
                <div className = "container py-5">
                    <div className="container-fluid">
                        <h1 className="display-1">Splunk Prerequisite Checker</h1>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default Header;