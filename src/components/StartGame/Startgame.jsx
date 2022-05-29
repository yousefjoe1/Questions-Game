import React, { useEffect, useState } from "react";

import useStyles from "./styles";

import { getQuestions } from "../../api";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Questions from "../Questions/Questions";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions, setTime } from "../../Redux/questionsSlice";

const Startgame = () => {
  const st = useStyles();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const dispatch = useDispatch();
  const [isStart, setIsStart] = useState(false);
  const { time } = useSelector((state) => state.questionsSlice);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const startQuestions = async (e) => {
    if (category != "" && difficulty.length != "") {
      dispatch(setTime());
      e.target.style.display = "none";
      const results = await getQuestions(category, difficulty);
      dispatch(setQuestions(results));
      setIsStart(true);
    }
  };

  return (
    <>
      {localStorage.getItem("usertk") && (
        <div className={st.qnContainer}>
          {!isStart && (
            <div className={st.chooseDiv}>
              <FormControl
                size="small"
                style={{ width: "200px", margin: "10px" }}
              >
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="select-category"
                  value={category}
                  label="category"
                  onChange={handleChange}
                >
                  <MenuItem value={21}>Sport</MenuItem>
                  <MenuItem value={20}>Mythology</MenuItem>
                  <MenuItem value={19}>Science: Mathematics</MenuItem>
                  <MenuItem value={18}>Science: Computers</MenuItem>
                  <MenuItem value={17}>Science & Nature</MenuItem>
                  <MenuItem value={16}>Entertainment: Board Games</MenuItem>
                  <MenuItem value={15}>Entertainment: Video Games</MenuItem>
                  <MenuItem value={14}>Entertainment: Television</MenuItem>
                  <MenuItem value={13}>
                    Entertainment: Musicals & Theatres
                  </MenuItem>
                  <MenuItem value={11}>Entertainment: Film</MenuItem>
                  <MenuItem value={10}>Entertainment: Books</MenuItem>
                  <MenuItem value={27}>Animals</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          {!isStart && (
            <div className={st.chooseDiv}>
              <FormControl
                size="small"
                style={{ width: "200px", margin: "10px" }}
              >
                <InputLabel id="difficulty">Difficulty</InputLabel>
                <Select
                  labelId="difficulty"
                  id="difficulty"
                  value={difficulty}
                  label="difficulty"
                  onChange={handleDifficulty}
                >
                  <MenuItem value={"easy"}>Easy</MenuItem>
                  {/* <MenuItem value={"meduim"}>Meduim</MenuItem> */}
                  <MenuItem value={"hard"}>Hard</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          {!isStart && <button onClick={startQuestions}>Start Now</button>}
        </div>
      )}
      {isStart && <Questions />}
      {!localStorage.getItem("usertk") && "You Have To Be A User To Play"}
    </>
  );
};

export default Startgame;
