import React from "react";

const LogReg = ({ label, type, change, name }) => {
  return (
    <>
      {label && <label>{label}</label>}
      <input required type={type} label={label} onChange={change} name={name} />
    </>
  );
};

export default LogReg;
