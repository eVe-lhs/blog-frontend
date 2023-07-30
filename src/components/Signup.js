import { useState,useEffect } from "react";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

let goodPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);

export default function Signup() {
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(false)
  const [signupState, setSignupState] = useState(fieldsState);
  useEffect(() => {

      if (goodPassword.test(signupState["password"]) === true) {
      setPasswordStrength(true);
    } else if (goodPassword.test(signupState["password"]) === false) {
      setPasswordMatch(false);
      }
      if (signupState["password"] !== signupState["confirm-password"]) {
        document.getElementById("password").classList.add("border-red-500");
        document
          .getElementById("confirm-password")
          .classList.add("border-red-500");
        setPasswordMatch(false);
      } else if (signupState["password"] === signupState["confirm-password"]) {
        document.getElementById("password").classList.remove("border-red-500");
        document
          .getElementById("confirm-password")
          .classList.remove("border-red-500");
        setPasswordMatch(true);
      }
}, [signupState,passwordStrength]);

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  }
    

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  const navigate = useNavigate();
  //handle Signup API Integration here
  const createAccount = () => {
    navigate('/auth/chooseinterest')
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        {signupState["password"] === "" ? (
          <></>
        ) : passwordStrength ? (
          <></>
        ) : (
          <div className="mt-2 text-red-500">
            Password must contain at least 8 letters: at least a capital letter,
            a small letter and a symbol.
          </div>
        )}
        {signupState["confirm-password"] === "" ? ( <></> ):passwordMatch ? (
          <div className="mt-2 text-green-500">Passwords are OK &#9989;</div>
        ) : (
          <div className="mt-2 text-red-500">Passwords Do Not Match</div>
        )}
        <FormAction handleSubmit={handleSubmit} text="Next" />
      </div>
    </form>
  );
}
