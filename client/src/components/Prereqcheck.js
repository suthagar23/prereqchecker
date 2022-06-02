import React, { useState, useEffect } from 'react';
import Header from './Header';
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Highlighter from "react-highlight-words";

const Prereqcheck = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const countPerPage = 6;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState([]);

  const doPreRequestCheck = () => {
    setData([]);
    setValue("");
    setIsLoading(true);
    setCollection([]);
    fetch('/api/prereqcheck')
      .then(res => res.json())
      .then(output => {
        if (output && output.data) {
          setData(output.data.data);
        }
        setIsLoading(false)
      })
  }

  const searchData = throttle(val => {
    const query = val.toLowerCase();
    setCurrentPage(1);
    const collectionData = cloneDeep(
      data
        .filter(item => item.full_name.toLowerCase().indexOf(query) > -1)
        .slice(0, countPerPage)
    );
    setCollection(collectionData);
  }, 400)

  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData(value);
    }
  }, [value, data]);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(data.slice(from, to)));
  };

  return (
    <div className="App">
      <Header />
      <div class="container container-header">
        <div class="jumbotron">
          <div class="container py-3 refresh-button-view">
            <button onClick={() => doPreRequestCheck()} disabled={isLoading} type="button" class="btn btn-primary btn-lg get-my-results-button" id="load2" style={{ width: "600px"}}>
              { !isLoading ? (
                <p style={{ paddingTop: "13px"}}> Get My Results </p>
            ) : (
              <div>
                <div style={{marginTop: "13px"}} class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <p style={{ float: "right", paddingRight: "20px", paddingTop: "13px" }}>Fetching results...this may take a couple of minutes</p>
              </div>
            )}
            </button>
          </div>

        {data && data.length > 0 && (
          <div class="search-container">
            <input
              placeholder="Search by fullname"
              class="search-box"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
        )}
        {collection && collection.length > 0 ? (
            <div class = "container results-table-view" >
                  
              <p className='table-showing'>Showing {currentPage} of {Math.ceil(data.length / countPerPage)} pages</p>
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
                  {collection.map((item) => {
                      return (
                        <tr>
                            <td>{item.event_id}</td>
                            <td>{item.enrollment_id}</td>
                            <td>{item.email}</td>
                            <td>{(<Highlighter highlightClassName="table-search-highlight" searchWords={[value]} textToHighlight={item.full_name} />)}</td>
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
              <Pagination
                pageSize={countPerPage}
                onChange={updatePage}
                current={currentPage}
                total={data.length}
              />
            </div>  
        ) : (
          <h4 style={{padding: '10px'}}> No results</h4>
        )}   
      </div>
    </div>
  </div>
  );
}

export default Prereqcheck;