import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/use-auth";

import Nav from "../../components/Nav";
import Loading from "../../components/Loading";

const Admin = () => {
  const [data, setData] = useState();
  const history = useHistory();
  const auth = useAuth();

  const getAllUsers = async () => {
    if (auth.user) {
      await axios.get('/api/users')
        .then(res => setData(res.data))
        .catch(e => setData(e.response.data))
    }
    return;
  }
  useEffect(() => {
    document.title = "Admin";
    if (!auth.user) {
      setTimeout(() => history.push('/login'), 2000)
    }
  })

  return (
    <>
      {!auth.user && <Loading />}
      {auth.user &&
        <>
          <Nav active="admin" />
          <h1>This is Admin</h1>
          <button onClick={getAllUsers}>Get All Users</button>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      }
    </>
  );
}

export default Admin;
