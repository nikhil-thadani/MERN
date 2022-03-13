import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "./store/index";

const Header = ({ isLoggedIn, setUser }) => {
  const dispatch = useDispatch();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography>MernStack APP</Typography>
        {isLoggedIn ? (
          <Button
            onClick={() => {
              dispatch(authActions.logout());
              setUser(null);
            }}
            variant="contained"
            component={Link}
            to="/"
            sx={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        ) : (
          <>
            {" "}
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ marginLeft: "auto" }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{ marginLeft: 1 }}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
