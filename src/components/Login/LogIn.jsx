import React, { useState } from "react";
import LogReg from "../ReuseComponent/LogReg";

import useStyles from "./styles";

import { app, database } from "../../firebase/firebase";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Input = () => {
  const st = useStyles();
  const auth = getAuth();
  const navigate = useNavigate();
  const [errorsMsg, setErrorsMsg] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [disableBtn, setDisableBtn] = useState(false);

  const collectionRef = collection(database, "users");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userInfo;
    setDisableBtn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        setDisableBtn(false);
        localStorage.setItem("usertk", res.user.accessToken);
        localStorage.setItem("userid", res.user.uid);
        const emailQuery = query(collectionRef, where("email", "==", email));
        onSnapshot(emailQuery, (data) => {
          data.docs.map((dc) => {
            if (!localStorage.getItem("docid"))
              localStorage.setItem("docid", dc._key.path.segments[6]);
          });
        });
        navigate("/");
      });
    } catch (err) {
      setDisableBtn(false);
      setErrorsMsg(err.message);
      setTimeout(() => {
        setErrorsMsg("");
      }, 5000);
    }
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className={st.form} onSubmit={handleSubmit}>
        <h5 className={st.errorMsg}>{errorsMsg}</h5>
        <h3>Log In</h3>
        <LogReg
          type="email"
          label={"Your Email"}
          name="email"
          change={handleChange}
        />
        <LogReg
          type="password"
          label={"Your Password"}
          name="password"
          change={handleChange}
        />
        {disableBtn ? "Loading........" : <button>Log In</button>}
      </form>
    </>
  );
};

export default Input;
