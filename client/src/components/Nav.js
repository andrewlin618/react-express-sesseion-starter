import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/use-auth";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const auth = useAuth();
  const history = useHistory();
  return (
    <>
      <div>
        <ul>
          {auth.user && <p style={{ color: "green" }}>{`Welcome, ${auth.user.username}`}</p>}
          <Link to="/" style={{ marginRight: '30px' }}>Home</Link>
          <Link to="/dashboard" style={{ marginRight: '30px' }}>Dashboard</Link>
          <Link to="/admin" style={{ marginRight: '30px' }}>Admin</Link>
          <Link to={`/profile/lucas`} style={{ marginRight: '90px' }}>Lucas's Profile</Link>
          {auth.user &&
            <button onClick={() => {
              auth.logout();
              history.push("/");
            }}>Log out</button>
          }
          {!auth.user &&
            <Link to="/login" style={{ marginRight: '30px' }}>Login/Signup</Link>
          }
        </ul>
        <br />
      </div>
    </>
  );
};

export default Nav;
