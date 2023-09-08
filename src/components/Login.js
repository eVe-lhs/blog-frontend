import { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import axios from "axios";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { ThemeContext, UserContext } from "../App";

// import { verify } from "jsonwebtoken";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(fieldsState);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { colorTheme, setTheme } = useContext(ThemeContext);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  // useEffect(() => {
  //   loading && toast.loading("Processing, Please Wait", {
  //     position: "top-center",
  //     hideProgressBar: false,
  //     theme: colorTheme === "dark" ? "light" : "dark",
  //   });
  // }, [loading,currentUser]);

  const login = async (e) => {
    // console.log(loginState)
    // setLoading(true);
    try {
      const userData = {
        username: loginState.username,
        password: loginState.password,
      };

      const response = await toast.promise(axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        userData
        // { withCredentials: true }
      ), {
        pending: "Processing, Please Wait...",
        success: "Login Successful"
        ,error:"Something Went Wrong"
      }, {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      }
      )
      // console.log(response)
      
      localStorage.setItem("token", response.data.access_token);
      setTimeout(() => {
        const logout = async () => {
          const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/logout`
          );
        };
        toast.success("Session Timed Out", {
          position: "top-center",
          hideProgressBar: false,
          pauseOnHover: true,
          theme: colorTheme === "dark" ? "light" : "dark",
        });
        localStorage.removeItem("token");
        logout().catch((err) => console.log(err));
        window.location.reload();
      }, 2 * 60 * 60 * 1000);
      await setCurrentUser(response.data.user);
    } catch (err) {
      toast.error(err.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
        theme: colorTheme === "dark" ? "dark" : "light",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
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
      {/* <FormExtra /> */}
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
