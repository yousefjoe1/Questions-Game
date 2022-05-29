import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../firebase/firebase";
import { updateScores } from "../../Redux/questionsSlice";

import useStyles from "./styles.js";

const Scores = () => {
  const st = useStyles();
  const { scores } = useSelector((state) => state.questionsSlice);
  const collectionRef = collection(database, "users");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("usertk")) {
      getDocs(collectionRef).then((res) => {
        let myUser = res.docs.find((users) => {
          return users.id === localStorage.getItem("docid");
        });
        const { scores } = { ...myUser?.data() };
        dispatch(updateScores(scores));
      });
    }
  }, []);

  return (
    <div>
      {scores !== undefined && (
        <div style={{ marginTop: "50px" }}>
          {scores &&
            scores.map((score, i) => (
              <div className={st.scoreDiv} key={i}>
                <p>Your Score: {score.scoreNumber}</p>
                <p>Score Time: {score.scoreTime}</p>
              </div>
            ))}
        </div>
      )}
      <h5>{!localStorage.getItem("usertk") && "You Need To Login First"}</h5>
      <h5>{!scores.length > 0 && "No Scores Yet"}</h5>
    </div>
  );
};

export default Scores;
