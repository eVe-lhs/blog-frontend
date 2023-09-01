import { useState,useContext, useEffect } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import axios from "axios";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
// import { verify } from "jsonwebtoken";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const navigate = useNavigate()
  const [loginState, setLoginState] = useState(fieldsState);
  const { currentUser, setCurrentUser } = useContext(UserContext)
  
  useEffect(() => {
    if (currentUser) {
      navigate('/home')
    }
  },[currentUser])

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const login = async (e) => {
    // console.log(loginState)
    try {
      const userData = {
        username: loginState.username,
        password: loginState.password,
      };
      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        userData,
        // { withCredentials: true }
      );
      localStorage.setItem('token', data.access_token)
      setTimeout(() => {
        alert("The session has expired.Please log in again");
        localStorage.removeItem('token')
        window.location.reload();
      }, 1 * 60 * 60 * 1000);
      await setCurrentUser(data.user)
      alert(data.message)
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login()
  };



  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
