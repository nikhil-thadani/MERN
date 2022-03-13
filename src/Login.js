import React, { useState } from "react";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/index";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const sendLoginRequest = async () => {
    const res = await axios
      .post("login", {
        email,
        password,
      })
      .catch((err) => new Error(err.toString()));
    const data = await res.data;
    if (data.auth) {
      history(`/user/${data.user._id}`);
    }

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLoginRequest();
  };

  return (
    <Box marginLeft={"auto"} marginRight={"auto"} width={250}>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography textAlign={"left"} variant="h2">
            Login
          </Typography>

          <FormLabel>Email</FormLabel>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <FormLabel>Password</FormLabel>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            margin="normal"
            variant="outlined"
          />
          <Button type="submit">Login</Button>
        </Box>
      </form>

      <Button>Switch to Signup</Button>
    </Box>
  );
};

export default Login;
