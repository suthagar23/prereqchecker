import React, { Component } from 'react';


class Header extends Component {
  render() {
    return (
        <div>
            <header id="navbar">
                <nav class="navbar navbar-expand-lg navbar-light bg-light nav-true-legacy">
                <div class="container-fluid" style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', padding: '0 2em'}}>
                    <div>
                    <a class="navbar-brand" href="/" style={{color: '#EF6020'}}>
                        Splunk
                    </a>
                    </div>
                </div>
                </nav>
            </header>
            
            <div class="container container-header" style={{ borderBottom: "4px solid #343a40"}}>
                <div class = "container py-5">
                    <div class="container-fluid">
                        <h1 class="display-1">Splunk Prerequisite Checker</h1>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default Header;