import React, { Component } from 'react';
import Header from './Header';

class Prereqcheck extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    }
    this.doPreRequestCheck = this.doPreRequestCheck.bind(this);
  }

  // Fetch the list on first mount
  componentDidMount() {}

  doPreRequestCheck = () => {
    this.setState({
      isLoading: true,
      data: []
    })
    fetch('/api/prereqcheck')
      .then(res => res.json())
      .then(output => this.setState({ data: output ? output.data.data : [], isLoading: false }))
  }

  render() {
    const { data, isLoading } = this.state;
    console.log(data)
    return (
      <div className="App">
        <Header />
        <div class="container container-header">
          <div class="jumbotron">
            { !isLoading ? (
              <div class="container py-3 refresh-button-view">
                  <button onClick={() => this.doPreRequestCheck()} type="button" class="btn btn-primary btn-lg" id="load2" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Fetching results...this may take a couple of minutes">
                    Get My Results
                  </button>
              </div>
            ) : (
              <div>
                <h6 style={{ paddingTop: '50px'}}>Fetching results...this may take a couple of minutes</h6>
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            )}
          
          {data && data.length > 0 && (
              <div class = "container results-table-view" >
                <table class="table table-striped table-bordered table-expandable mydatatable" style={{width: '100%' }}>
                    <thead>
                        <tr>
                          <th scope="col">Event ID</th>
                          <th scope="col">Enrollment ID</th>
                          <th scope="col">Email</th>
                          <th scope="col">Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">F3</th>
                          <th scope="col">ASnR</th>
                              <th scope="col">CD</th>
                          <th scope="col">CCLabs</th>
                          <th scope="col">ArchCert</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => {
                        return (
                          <tr>
                              <td>{item.event_id}</td>
                              <td>{item.enrollment_id}</td>
                              <td>{item.email}</td>
                              <td>{item.full_name}</td>
                              <td>{item.status}</td>
                              <td>{item.F3 || ''}</td>
                              <td>{item.ASnR}</td>
                              <td>{item.CD}</td>
                              <td>{item.CCLabs}</td>
                              <td>{item.ArchCert}</td>
                          </tr>
                        )
                      }
                    )}
                    </tbody>
                </table>    
              </div>  
          )}   
        </div>
      </div>
    </div>
    );
  }
}

export default Prereqcheck;