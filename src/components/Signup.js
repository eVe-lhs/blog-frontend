import { useState,useEffect, useContext } from "react";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext)
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
    

  const register = async (e) => {
    
    // console.log(loginState)
    try {
      const userData = {
        username: signupState["username"],
        password: signupState["password"],
        email:signupState["email"]
      };
      const response = toast.promise(
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/register`,
          userData
          // { withCredentials: true }
        ),
        {
          pending: "Processing, Please Wait...",
          success: "Registered Successfully",
          error: "Something Went Wrong",
        },
        {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          hideProgressBar: true,
          theme: colorTheme === "dark" ? "dark" : "light",
        }
      );
      // alert(data.message)
      const login_data  = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          username: signupState["username"],
          password: signupState["password"],
        }
        // { withCredentials: true }
      );
      localStorage.setItem('token', login_data.data.access_token)
      setTimeout(() => {
        alert("The session has expired.Please log in again");
        localStorage.removeItem('token')
        window.location.reload();
      }, 1 * 60 * 60 * 1000);
      await setCurrentUser(login_data.data.user)
      navigate('/auth/chooseinterest')
    } catch (err) {
      if(err.response)
        alert(err.response.data.message);
      else
        console.log(err)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register()
  };

  //handle Signup API Integration here
  // const createAccount = () => {
  //   navigate('/auth/chooseinterest')
  // };

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
        {signupState["confirm-password"] === "" ? (
          <></>
        ) : passwordMatch ? (
          <div className="mt-2 text-green-500">Passwords are OK &#9989;</div>
        ) : (
          <div className="mt-2 text-red-500">Passwords Do Not Match</div>
        )}

        {/* Action Button */}
      
        {passwordMatch && passwordStrength ? (
          <div className="mt-2 text-green-500">
            <FormAction handleSubmit={handleSubmit} text="Next" />
          </div>
        ) : (
          <div className="mt-2 text-red-500">
                <button
                  
              className="cursor-default font-body group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 mt-10"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
