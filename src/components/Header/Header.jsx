import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import useStyles from "./styles";

import { FcNext } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { useSelector } from "react-redux";

const Header = () => {
  const { time } = useSelector((state) => state.questionsSlice);
  const [colortime, setColortime] = useState(false);

  const st = useStyles();
  const navigate = useNavigate();

  const isUser = localStorage.getItem("usertk");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutFunc = () => {
    localStorage.removeItem("usertk");
    localStorage.removeItem("docid");
    localStorage.removeItem("userid");
    navigate("/");
  };

  useEffect(() => {
    setColortime(!colortime);
  }, [time]);

  return (
    <AppBar position="relative">
      <Toolbar className={st.toolbar}>
        <Link className={st.score} to={"/scores"}>
          Your Scores
          <FcNext />
        </Link>
        <Typography className={""} variant="h4">
          <Link style={{ color: "white" }} to={"/"}>
            <FcHome /> Questions Game
          </Link>
        </Typography>
        <Typography
          className={!colortime ? st.colortimest : ""}
          variant="body1"
          style={{ padding: "5px" }}
        >
          Time: {time}
        </Typography>
      </Toolbar>
      <div
        className={st.userState}
        style={{ fontSize: "25px", margin: "2px auto" }}
      >
        <Button
          id="basic-button"
          variant="contained"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FcPortraitMode style={{ fontSize: "25px", background: "white" }} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            {!isUser && <Link to={"/login"}>Log In</Link>}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {!isUser && <Link to={"/register"}>Register</Link>}
          </MenuItem>
          {isUser && (
            <Button onClick={logoutFunc} variant="outlined">
              Log Out
            </Button>
          )}
        </Menu>
      </div>
    </AppBar>
  );
};

export default Header;
