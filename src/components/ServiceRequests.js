import React, { useState, useEffect } from 'react';

const ServiceRequests = () => {
  
  const [blogposts, setBlogposts] = useState([]);

  async function fetchData() {
    await fetch("http://localhost:8080/blogposts/get-blogpost/4", {
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {setBlogposts(data);console.log(data);})
        .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  
  return(
    <div>
      <h1>{blogposts.title}</h1>
      
      <h3>{blogposts.date}</h3>
      <p> {blogposts.body} </p>
      
    </div>
  );

}

export default ServiceRequests;