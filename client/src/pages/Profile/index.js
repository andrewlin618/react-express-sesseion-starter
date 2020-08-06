import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { useAuth } from "../../utils/use-auth";
import { Redirect } from "react-router";

const Profile = ({ username }) => {
  const [data, setData] = useState();
  const auth = useAuth();
  useEffect(() => {
    async function fetchData(param) {
      await axios.get('/api/user/' + param)
        .then(res => {
          setData(res.data);
        })
        .catch(e => {
          console.log(e.response);
          setData({ error: e.response.data });
        })
    }
    fetchData(username);
  }, [username]);

  useEffect(() => {
    if (!data) {
      document.title = "loading";
    } else if (data && data.error) {
      document.title = "user doesn't exist";
    }
    else document.title = `${data.username}'s homepage`;
  });


  return (
    <>
      <Nav />
      {!data && <h1>Loading</h1>
      }
      {data && !data.error &&
        <>
          <h1>{`This is ${data.username}'s homepage`}</h1>
          <h3>{`Nationality: ${data.nationality}`}</h3>
          <h3>{`Birthday: ${data.birthday}`}</h3>
          <img src={`${data.avatar_url}`} alt='hello' />
        </>
      }
      {data && data.error &&
        <h1>{data.error}</h1>
      }
      {data && auth.user && data.username === auth.user.username &&
        <Redirect to='/dashboard' />
      }
    </>
  );
}

export default Profile;
