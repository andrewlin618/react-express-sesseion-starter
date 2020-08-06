import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/use-auth";

import Nav from "../../components/Nav";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    document.title = 'Dashboard';
    if (!auth.user) {
      setTimeout(() => history.push('/login'), 2000)
    }
  })

  return (
    <>
      {!auth.user && <Loading />}
      {auth.user &&
        <>
          <Nav active="dashboard" />
          <h1>{`${auth.user.username}`}</h1>
          <h3>{`Nationality:  ${auth.user.nationality}`}</h3>
          <img src={`${auth.user.avatar_url}`} alt='hello' />
        </>
      }
    </>
  );
}

export default Dashboard;