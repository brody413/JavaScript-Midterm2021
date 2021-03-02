import React, {useMemo, useState, useEffect} from 'react';
import Header from '../shared/Header';
import axios from 'axios'; 

const Data = () => {
  const APILINK = 'https://jsonplaceholder.typicode.com/posts';

  const [data, setData] = useState([]);
  const students = useMemo(() => data, [data]);

  useEffect(() => {
    axios.get(APILINK)
    .then(resp => {
      setData(resp.data);
    });
  }, []);


  // did filter over sort
  const filter = event => {
    
    event.persist();
    const value = event.target.value;
    
    if (value.length === 0) {
        axios.get(APILINK)
        .then(resp => {
          setData(resp.data);
        });
    } else if (isNaN(value)) {
      const regex = new RegExp(value);
      setData([...data.filter(datum => (regex.test(datum.title) || regex.test(datum.body)))]);
    } else {
      const num = Number(value);
      setData([...data.filter(datum => (Number(datum.userId) === num || Number(datum.id) === num))]);
    }
  };


  return (
    <>
      <div className="container-fluid">
        <Header title="Your Data"/>
      </div>
      <div className="container">
        <h2>
          Data Table
        </h2>
        <hr/>
          <div className="row my-3 align-items-center justify-content-end">
            <div className="col-auto">
              <label htmlFor="filter" className="col-form-label">Filter</label>
            </div>
            <div className="col-auto">
              <input type="text" name="filter" className="form-control" onChange ={filter}/>
            </div>
          </div>
          <table className="table">
              <tr>
                <td>userId</td>
                <td>Id</td>
                <td>Title</td>
                <td>Body</td>
              </tr>
            {students.map((student, i) => (
            <tbody>
              <td>{student.userId}</td>
              <td>{student.id}</td>
              <td>{student.title}</td>
              <td>{student.body}</td>
            </tbody>
            ))}

          </table>
      </div>
    </>
  );
}
 
export default Data;