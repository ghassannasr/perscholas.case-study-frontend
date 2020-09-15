import React, { useState, useEffect } from 'react';

const ServiceRequests = () => {
  
  const [users, setUsers] = useState([]);

  async function fetchData() {
    await fetch("http://localhost:8080/users/getuser/1", {
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {setUsers(data);console.log(data);})
        .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  
  return(
    <div>{users.firstName}</div>
  );

}

export default ServiceRequests;