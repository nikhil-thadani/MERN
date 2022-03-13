import React, { useState } from "react";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import axios from "axios";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .catch((err) => setError("Please try later"));
    if (res.status !== 200) {
      return setError("Invalid Credentials");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
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
          <FormLabel sx={{}}>Name</FormLabel>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <FormLabel>Email</FormLabel>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type={"email"}
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
    </Box>
  );
};

export default Form;
