import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import {
  checkTime,
  decreasTen,
  resetTime,
  startTime,
  updateScores,
  zeroTime,
} from "../../Redux/questionsSlice";

import { FcRefresh } from "react-icons/fc";

import useStyles from "./styles";

const Questions = () => {
  const st = useStyles();
  const navigate = useNavigate();
  const { Questions } = useSelector((state) => state.questionsSlice);
  const { time } = useSelector((state) => state.questionsSlice);
  const { scores } = useSelector((state) => state.questionsSlice);
  const [quesNumber, setQuesNumber] = useState(0);
  const [btns, setBtns] = useState([]);
  const [answerVal, setAnswerVal] = useState("");
  const [disableBtn, setDisableBtn] = useState("");
  const [scoreVal, setScoreVal] = useState(0);
  const [endgame, setEndgame] = useState("");

  const dispatch = useDispatch();

  const setButtons = () => {
    let allBtns = [...Questions[quesNumber].incorrect_answers];
    allBtns.push(Questions[quesNumber].correct_answer);
    setBtns(allBtns.sort(() => (Math.random() > 0.5 ? 1 : -1)));
  };

  useEffect(() => {
    setButtons();
    if (time == 0) {
      setEndgame("Game End");
    }
    if (quesNumber === 10) {
      setEndgame("Game End");
      dispatch(checkTime());
      setQuesNumber(0);
    }
    if (endgame !== "") {
      dispatch(resetTime());
    }
  }, [quesNumber]);

  useEffect(() => {
    if (endgame !== "" || time < 1) {
      dispatch(resetTime());
      setEndgame("Game End");
      setQuesNumber(0);
    }
  }, [time]);

  const nextQu = () => {
    setQuesNumber(quesNumber + 1);
  };

  const checkAnswer = (e, answer) => {
    if (time < 1) {
      dispatch(checkTime());
      setEndgame("Game End");
    }

    if (endgame !== "") {
      setEndgame("Game End");
    }

    const correct = Questions[quesNumber].correct_answer;
    if (correct === answer) {
      setAnswerVal("Corrrect");
      e.target.style.backgroundColor = "green";
      setScoreVal(scoreVal + 10);
    } else {
      dispatch(decreasTen());
      e.target.style.backgroundColor = "red";
      setAnswerVal("Wrong");
      setScoreVal(scoreVal - 10);
    }
    if (quesNumber !== 9) {
      setDisableBtn("disableBtn");

      if (quesNumber !== 9) {
        setTimeout(() => {
          setAnswerVal("");
          setDisableBtn("");
          e.target.style.backgroundColor = "";
          nextQu();
        }, 1000);
      } else {
        setDisableBtn("disableBtn");
      }
    } else {
      setDisableBtn("disableBtn");
      setEndgame("Game End");
    }
  };

  const saveScores = async (e) => {
    // try
    let uid = await localStorage.getItem("docid");
    const tasksRef = doc(database, "users", uid);
    let date = `${new Date().getDate()} - ${new Date().getDay()} - ${new Date().getFullYear()} | ${new Date().getHours()} : ${new Date().getMinutes()}`;
    const scoreValue = { scoreTime: date, scoreNumber: scoreVal };
    let newScores = [...scores, scoreValue];
    e.target.style.display = "none";
    await updateDoc(tasksRef, {
      scores: newScores,
    }).then(() => {
      navigate("/scores");
    });
    setScoreVal(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(startTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {localStorage.getItem("usertk") && (
        <div className={st.questionContainer}>
          {endgame == "" && (
            <div>
              <h5 style={{ marginTop: "20px" }}>
                {Questions[quesNumber]?.question
                  .replaceAll("&#039;", " ")
                  .replaceAll("&quot;", " ")}
              </h5>
              {Questions && (
                <div className={st.btnsContainer}>
                  {btns &&
                    btns.map((btn, i) => (
                      <button
                        className={`${disableBtn !== "" && st.disableBtn}`}
                        onClick={(e) => checkAnswer(e, btn)}
                        key={i}
                      >
                        {btn.replaceAll("&amp;", "-").replaceAll("&#039;", "")}
                      </button>
                    ))}
                </div>
              )}
            </div>
          )}
          <p>{answerVal} </p>
        </div>
      )}
      {endgame !== "" && (
        <div className={st.endgameDiv}>
          <h5>
            {endgame} .... Your Score Is: {scoreVal}
          </h5>
          {scoreVal < 10 ? <p>Nice Try ..... Good luck next time</p> : "Nice"}
          <p>
            Are You Want To Save Your Score?
            <button onClick={saveScores}> Yes</button>
          </p>
        </div>
      )}
      {endgame !== "" && (
        <button
          className={st.tryAgainbtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Try Again <FcRefresh style={{ fontSize: "35px" }} />
        </button>
      )}
    </>
  );
};

export default Questions;
