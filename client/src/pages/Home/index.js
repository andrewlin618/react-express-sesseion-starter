import React, {useEffect} from "react";
import Nav from "../../components/Nav";

const Home = () => {
  useEffect(() => {
    document.title = 'Homepage'
  })
  return (
    <>
      <Nav />
      <h1>This is public page</h1>
      <p style={{color:'green'}}>You can see this page no matter weath you are logged in or not.</p>
      <img src='https://earthsky.org/upl/2018/06/ocean-apr27-2020-Cidy-Chai-North-Pacific-scaled-e1591491800783.jpeg' alt='hello'/>
    </>
  );
}

export default Home;
