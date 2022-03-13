import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Welcome = () => {
  const userId = useParams().id;
  const [user, setUser] = useState();
  const getUser = async () => {
    const res = await axios
      .get(`user/${userId}`, {
        withCredentials: true,
      })
      .catch((err) => new Error(err.toString()));
    const data = await res.data;
    console.log(data);
  };
  useEffect(() => {
    getUser().then((res) => console.log(res));
  }, [userId]);
  return (
    <div>
      {user && <Typography variant="h1">WELCOME {user.name} </Typography>}
    </div>
  );
};

export default Welcome;
