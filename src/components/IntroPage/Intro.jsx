import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";

const Intro = () => {
  const navigate = useNavigate();
  const st = useStyles();

  const startGame = () => {
    if (localStorage.getItem("usertk")) {
      navigate("/startGame");
    } else {
      navigate("/register");
    }
  };

  return (
    // <div>
    <Card className={st.cardContainer}>
      <CardContent>
        <Typography variant="h4">Questions Challenge</Typography>
        <Typography variant="p">
          Try to answer within the limit time.
        </Typography>
        <hr />
        <Typography style={{ fontWeight: "bold" }} variant="p">
          Keep in mind that incorrect answer will penalize your score/time by
          ten seconds.
        </Typography>
        <CardActions>
          <Button onClick={startGame} variant="contained">
            Start
          </Button>
        </CardActions>
      </CardContent>
    </Card>
    // </div>
  );
};

export default Intro;
