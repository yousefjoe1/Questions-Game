import React, { useState } from "react";
import { app, database } from "../../firebase/firebase";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

import LogReg from "../ReuseComponent/LogReg";

import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [reloading, setReloading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [userInfo, setUserinfo] = useState({
    email: "",
    password: "",
    playerName: "",
  });

  const [errores, setErrores] = useState("");

  const st = useStyles();

  const collectionRef = collection(database, "users");

  const handleSubmit = (e) => {
    e.preventDefault();
    setReloading(true);
    const { email, password, playerName } = userInfo;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        await addDoc(collectionRef, {
          email: email,
          password: password,
          displayName: playerName,
          scores: [],
        }).then((res) => {
          setReloading(false);
          localStorage.setItem("docid", res._key.path.segments[1]);
        });
        // save token to localstrg
        localStorage.setItem("usertk", res.user.accessToken);
        // navigate to the intro and questions
        navigate("/");
      })
      .catch((er) => {
        setReloading(false);
        setErrores(er.message);
        setTimeout(() => {
          setErrores("");
        }, 5000);
      });
  };
  const handleChange = (e) => {
    setUserinfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <form className={st.form} onSubmit={handleSubmit}>
      <div className={st.error_msg}>{errores}</div>
      <h3>Register</h3>
      <LogReg
        type="text"
        name="playerName"
        label={"Player Name"}
        change={handleChange}
      />
      <LogReg
        type="text"
        name="email"
        label={"User Email"}
        change={handleChange}
      />
      <LogReg
        type="password"
        name="password"
        label={"User Password"}
        change={handleChange}
      />
      {!reloading && <button>Register</button>}
      <p>
        Do You Have An Account ? <Link to={"/login"}>Log In</Link>{" "}
      </p>
    </form>
  );
};

export default Register;
