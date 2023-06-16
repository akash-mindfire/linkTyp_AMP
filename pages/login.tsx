import { useContext, useEffect, useState } from "react";
import axios from "axios";
import router, { useRouter } from "next/router";
import { BsGoogle, BsArrowRight, BsPhoneFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";

import { auth } from "./firebase";
import Loader from "@/components/Loader";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { GetServerSideProps } from "next";

// gradient-to-r from-pink-500 to-red-500

export default function Home(props: any) {
  const [user, setUser] = useAuthState(auth);
  let [error, setError] = useState({
    otp: "",
    email: "",
    ConfirmOtp: "",
    password: "",
    registeredEmailverify: "",
    emailTaken: "",
    emailNotverifiedErr: "",
    loginEmailverifyOtpErr: "",
    loginModalOtpVerifyErr: "",
  });
  let [success,setSuccess] =useState({
    loginEmailVerifyOtpSuccess:""
  })
  const googleAuth = new GoogleAuthProvider();
  // google signin

  const googleLogin = async () => {
    try {
      googleAuth.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, googleAuth);

      // Extract the user's email ID from the authentication result
      const email = result.user.email;

      // Send a request to check if the user is registered with the backend
      const response = await axios.post(
        "https://api.linktyp.com/api/google/register",
        {
          email,
        }
      );

      if (response.status === 200) {
        // If the user is registered, extract the access token from the response
        const accessToken = response.data.access_token;

        // Store the access token in a cookie
        Cookies.set("access_token", accessToken);

        router.push("/dashBoard");
      } else {
        // If the user is not registered, show an error message

        toast.error("User Not Registered");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // google signup

  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      const res = await axios.post(
        "https://api.linktyp.com/api/google/register",
        {
          email: userEmail,
        }
      );

      if (res.status === 200) {
        const token = res.data.access_token;

        if (!token) {
          throw new Error("Invalid token");
        }

        Cookies.set("access_token", token);

        router.push("/dashBoard");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error signing up with Google");
    }
  };

  //signup end

  // const { setUserData } = useContext(UserContext);

  //Show Tosat Message on login error message "invalid email or password"
  //Show Tosat Message on login error message "invalid email or password"
  const LoginSuccessNotification = () => {
    toast("Login Successful", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
    });
  };

  const LoginErrorNotification = () => {
    toast("Wrong Email or Password", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "error",
    });
  };

  //Login Form Validation and Error Handling Code Declaration Start Here
  const [successfulEmailVerification, setSuccessfulEmailVerification] =
    useState(false);
  const [Loginemail, setLoginEmail] = useState("");
  const [Loginpassword, setLoginPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const [loginEmailVerifyModal, setLoginEmailVerifyModal] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState("");
  const [loginVerificationOtp, setLoginVerificationOtp] = useState("");

  const [otpEmail, setOtpEmail] = useState("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyEmailOtpModal, setVerifyEmailOtoModal] = useState(false);
  const [verifyEmailOtp, setVerifyEmailOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loader,setLoader]=useState(false)

  const handleEmailClick = () => {
    setEmailError("");
  };

  const handlePasswordClick = () => {
    setPasswordError("");
  };

  const validateLoginEmail = (Loginemail: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Loginemail);
  };

  const loginFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    if (Loginemail == "") setEmailError("Please Enter Your Email Address");
    else {
      if (validateLoginEmail(Loginemail)) {
        setEmailError("");
        if (Loginpassword === "") {
          setPasswordError("Please enter your password");
          setLoading(false);
          return;
        } else {
          setPasswordError("");
        }
        const data = {
          email: Loginemail,
          password: Loginpassword,
        };

        axios
          .post("https://api.linktyp.com/api/login", data)
          .then((res) => {
            if (res.data.status === true) {
            
              setLoginError("");
              setLoginEmail("");
              setLoginPassword("");
              setError({
                ...error,
                emailNotverifiedErr: "",
              });
              Cookies.set("access_token", res.data.access_token, {
                expires: 7,
              });
              axios
                .get("https://api.linktyp.com/api/getdata", {
                  headers: {
                    Authorization: `Bearer ${res.data.access_token}`,
                  },
                })
                .then((res) => {
                  setLoader(true)
                  router.push("/dashBoard");
                })
                .catch((err) => {
                  console.log(err);
                });

             
              LoginSuccessNotification();
            }
            if (res.status === 202) {
              setError({
                ...error,
                emailNotverifiedErr: "User is not verified. Please verify your",
              });
              setLoading(false);
            }

            if (res.status === 201) {
              setLoginError("Invalid email or password");
              setEmailError("Invalid Email Address or password");
              setLoading(false);
            }
          })
          .catch((err) => {
            // setError({...error,emailNotverifiedErr:"User is not verified. Please verify your"})
            if (err.response.data.message === 'Please set your password or login with google.'){
              setPasswordError("Please set your password or login with google.")
             }
            if (err.response.data.message === '"email" must be a valid email')
              setLoginError("Invalid Email.");
            // LoginErrorNotification();
            setLoading(false);
          });
      } else {
        // console.log("Invalid Address");
        setEmailError("Invalid Email Address");
        setLoading(false);
      }
    }
  };

  


  //Register Form Validation and Error Handling Code Declaration Start Here
  const [Registerusername, setRegisterUsername] = useState("");
  const [Registeremail, setRegisterEmail] = useState("");
  const [Registerpassword, setRegisterPassword] = useState("");
  const [RegisterConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [RegisterError, setRegisterError] = useState({});
  //Toast for registration
  // const existingUsererror = () => {
  //   toast("Email Is Allready Taken", {
  //     hideProgressBar: true,
  //     autoClose: 1000,
  //     type: "error",
  //   });
  // };
  //Toast Notification For Successuful Registration
  const successfulRegistration = () => {
    toast("Registration Successful", {
      hideProgressBar: true,
      autoClose: 1000,
      type: "success",
    });
  };
  const validateRegisterEmail = (Registeremail: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Registeremail);
  };

  const validateRegisterPassword = (Registerpassword: any) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(Registerpassword);
  };

  const handleRegistrationSubmit = (e: any) => {
    e.preventDefault();

    if (
      validateRegisterEmail(Registeremail) ||
      validateRegisterPassword(Registerpassword)
    ) {
      const data = {
        name: Registerusername,
        email: Registeremail,
        password: Registerpassword,
      };
      
      axios
        .post("https://api.linktyp.com/api/register", data)
        .then((res) => {
          
          if (res.data.status === true) {
            setVerifyEmailOtoModal(true);
            // alert("Registration Successuful");
            // successfulRegistration();
             
          }
          if (res.data.message === "This email is already taken.") {
            setError({ ...error, emailTaken: "Email is already taken" });
            // alert("Email is Already taken");
            // existingUsererror();
          }
        })
        .catch((err) => {
          console.log("error");
        });
    } else {
      // display error message for invalid email
      setRegisterError({ email: "Invalid Email" });
    }
  };

  //Code to change the Login and Register Form
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  //registration Otp check

  const handleOtpVerify = () => { 
    const data = { otp: verifyEmailOtp };
   
    axios
      .post("https://api.linktyp.com/api/registeredEmailVerify", data)
      .then((res) => {
       
        if (res.data.status === true) {
        
          setVerifyEmailOtoModal(false);
          setSuccessfulEmailVerification(true);
          setShowRegisterForm(false)
          setError({
            ...error,
            registeredEmailverify: "",
          });
        }
      
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError({
            ...error,
            registeredEmailverify: "Please Enter Correct Otp",
          });
        } else {
          console.log("Error:", err.response.data);
        }
      });
  };

  const handleDiv = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  //show password hide password in login signup field

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleOtpSend = (e: any) => {
    e.preventDefault();
 
    if (validateLoginEmail(Loginemail)) {
      const data = {
        email: Loginemail,
      };

      axios
        .post("https://api.linktyp.com/api/forgot-password", data)
        .then((res) => {
          if (res.status === 200) {
            setForgotPasswordModal(true);
          }
          if (res.status === 404) {
            toast.success("User Not Found");
          }
        })
        .catch((err) => {
          setError({ ...error, otp: "User Not Found! " });
        
        });
    } else {
      setError({ ...error, otp: "Enter Email Address!" });
    }
  };

  const handleResetPssword = (e: any) => {
    e.preventDefault();

    if (validateLoginEmail(Loginemail)) {
      const data = {
        email: Loginemail,
        otp: resetOtp,
        password: newPassword,
      };
      if (resetOtp) setError({ ...error, ConfirmOtp: "" });

      axios
        .post("https://api.linktyp.com/api/reset-password", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Password Changed Successfully");
            window.location.reload()
          }
        })
        .catch((err) => {
          if (!newPassword) {
            setError({ ...error, password: "Password cannot be empty!" });
            if (resetOtp.length > 0) setError({ ...error, ConfirmOtp: "" });
          } else if (resetOtp.length == 0)
            setError({ ...error, ConfirmOtp: "OTP cannot be empty!" });
          else setError({ ...error, ConfirmOtp: "Please enter correct OTP!" });
          console.log(err);
          // LoginErrorNotification();
        });
    } else {
      setError({ ...error, email: "Invalid Email Address" });
      // console.log("Invalid Address");
      // setEmailError("Invalid Email Address");
    }
  };

  const handleEmailVerificationOtpSend = (e: any) => {
    e.preventDefault();
  
    if (validateLoginEmail(Loginemail)) {
      const data = {
        email: Loginemail,
      };

      axios
        .post("https://api.linktyp.com/api/login/verifyEmail", data)
        .then((res) => {

          if (res.status === 200) {
            setLoginEmailVerifyModal(true);
          }
          if (res.status === 404) {
            toast.success("User Not Found");
          }
        })
        .catch((err) => {
          setError({ ...error, otp: "User Not Found! " });
         
        });
    } else {
      setError({ ...error, otp: "Enter Email Address!" });
    }
  };

  const handleEmailAndOtpVerify = (e: any) => {
    e.preventDefault();

    if (validateLoginEmail(Loginemail)) {
      const data = {
        email: Loginemail,
        otp: loginVerificationOtp,
      };

      axios
        .post("https://api.linktyp.com/api/login/otpverify", data)
        .then((res) => {
         
          if (res.data.status === true) {
            setSuccess({ ...success, loginEmailVerifyOtpSuccess: "Otp verified,Please wait!" });
            setError({ ...error, loginModalOtpVerifyErr: "" });
            
            Cookies.set("access_token", res.data.access_token, { expires: 7 });
            axios
              .get("https://api.linktyp.com/api/getdata", {
                headers: {
                  Authorization: `Bearer ${res.data.access_token}`,
                },
              })
              .then((res) => {
                
                router.push("/dashBoard");
              })
              .catch((err) => {
              
              });

            // console.log("Login Successful");
            LoginSuccessNotification();
          }
          if (res.status === 404) {
            // toast.success("User Not Found");
          }
        })
        .catch((err) => {
          setError({ ...error, loginModalOtpVerifyErr: "Enter valid otp!" });
         
        });
    } else {
      setError({ ...error, otp: "Enter Email Address!" });
    }
  };

  //Main Return Declaration
  return (
    <>
    {
      loader?
      <Loader/>:
      <>
      <input type="checkbox" id="verifyemail-modal" className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label
            htmlFor="verifyemail-modal"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>
          {loginEmailVerifyModal ? (
            <div className="w-full form-control">
              <span
                className="flex justify-center font-bold"
                style={{ color: "blue" }}
              >
                Otp has sent to your email address.
              </span>
              <label className="label">
                <span className="label-text">Your Registered Email</span>
              </label>
              <input
                type="email"
                value={Loginemail}
                readOnly
                placeholder="Email"
                className="w-full input input-bordered"
              />

              <label className="label">
                <span className="label-text">OTP</span>
              </label>
              <input
                type="password"
                value={loginVerificationOtp}
                onChange={(e) => setLoginVerificationOtp(e.target.value)}
                placeholder="OTP"
                maxLength={6}
                className="w-full input input-bordered"
                style={
                  error.loginEmailverifyOtpErr
                    ? {
                        border: "1px solid red",
                        outline: "none",
                      }
                    : {}
                }
              />
              {error.loginModalOtpVerifyErr ? (
                <span className="font-semibold" style={{ color: "red" }}>
                  {error.loginModalOtpVerifyErr}
                </span>
              ) : (
                ""
              )}
              {success.loginEmailVerifyOtpSuccess ? (
                <span className="font-semibold" style={{ color: "green" }}>
                  {success.loginEmailVerifyOtpSuccess}
                </span>
              ) : (
                ""
              )}
              <button
                className="w-full mt-10 rounded-lg btn modal-open"
                onClick={handleEmailAndOtpVerify}
              >
                Confirm
              </button>
            </div>
          ) : (
            <main
              id="content"
              role="main"
              className="w-full max-w-md p-6 mx-auto"
            >
              {/* <div className="bg-white shadow-lg mt-7 rounded-xl dark:bg-gray-800 dark:border-gray-700"> */}
              <div className="">
                <div className="text-center">
                  {error.otp ? (
                    <span
                      className="flex justify-center font-bold"
                      style={{ color: "red" }}
                    >
                      {error.otp}
                    </span>
                  ) : (
                    ""
                  )}
                  <h1 className="block text-2xl font-bold text-gray-800">
                    User verification
                  </h1>
                </div>{" "}
                <div className="mt-5">
                  <div>
                    <div className="grid gap-y-4">
                      <div>
                        <label
                          htmlFor="emailForVerify"
                          className="block mb-2 ml-1 text-sm font-bold"
                        >
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="emailForVerify"
                            value={Loginemail}
                            name="email"
                            className="block w-full px-4 py-3 text-sm border-2 border-gray-200 shadow-sm rounded-3xl focus:border-blue-500 focus:ring-blue-500"
                            required
                            aria-describedby="email-error"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-3xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        onClick={handleEmailVerificationOtpSend}
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </main>
          )}{" "}
        </div>
      </div>
      <section className="flex flex-col items-center h-screen md:flex-row">
        <ToastContainer />
        <div className="hidden w-1/2 h-screen bg-blue-600 lg:block md:block">
          <div className="flex flex-col h-[100%] justify-center items-center px-3">
            <img src="final.svg" alt="" className="w-4/5" />
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-screen px-5 bg-white sm:py-6 md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-2/3 lg:px-16 xl:px-12">
          <div className="flex items-center justify-center w-full h-screen md:max-w-md lg:max-w-full md:mx-0 sm:w-full md:w-full xl:w-2/3 xl:px-10">
            {showRegisterForm ? (
              // Register Form
              <>
                <div className="w-full h-100">
                  <h1 className="text-xl font-bold">Create your account</h1>
                  <h1 className="mt-12 text-xl font-bold leading-tight md:text-2xl">
                    Welcome to our platform!
                  </h1>
                  <form
                    className="mt-6"
                    action="#"
                    method="POST"
                    onSubmit={handleRegistrationSubmit}
                  >
                    <div>
                      <label
                        className="block text-gray-700"
                        htmlFor="Registerusername"
                      >
                        Enter Username
                      </label>
                      <input
                        value={Registerusername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        type="text"
                        name="Registerusername"
                        id="Registerusername"
                        placeholder="Enter Your Username"
                        className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-600 focus:bg-white focus:outline-none"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700"
                        htmlFor="Registeremail"
                      >
                        Email Address
                      </label>
                      <input
                        value={Registeremail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        type="email"
                        name="Registeremail"
                        id="Registeremail"
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700"
                        htmlFor="Registerpassword"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          value={Registerpassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          name="Registerpassword"
                          id="Registerpassword"
                          placeholder="Enter Password"
                          className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                          required
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="absolute top-0 bottom-0 right-0 flex items-center px-3"
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-4 py-3 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:bg-blue-600"
                    >
                      <label
                        htmlFor="my-modal-3"
                        className="flex items-center justify-center w-full cursor-pointer"
                      >
                        Signup
                        <BsArrowRight className="ml-1" />
                      </label>

                      {/* icons arrow */}
                    </button>
                    {error.emailTaken ? (
                      <span className="font-bold" style={{ color: "red" }}>
                        {error.emailTaken}
                      </span>
                    ) : (
                      ""
                    )}

                    <input
                      type="checkbox"
                      id="my-modal-3"
                      className="modal-toggle"
                    />
                    {verifyEmailOtpModal ? (
                      <div className="modal">
                        <div className="relative modal-box">
                          <label
                            htmlFor="my-modal-3"
                            className="absolute btn btn-sm btn-circle right-2 top-2"
                          >
                            ✕
                          </label>

                          <div className="flex flex-col w-full max-w-md mx-auto space-y-6">
                            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                              <div className="text-3xl font-semibold">
                                <p className="text-xl md:text-3xl">
                                  Email Verification
                                </p>
                              </div>
                              <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email</p>
                              </div>
                            </div>
                            {/* <label className="text-gray-700 " htmlFor="otp">
                        
                      </label> */}
                            <input
                              value={verifyEmailOtp}
                              onChange={(e) =>
                                setVerifyEmailOtp(e.target.value)
                              }
                              type="password"
                              name="otp"
                              id="otp"
                              placeholder=""
                              className="w-full px-4 py-3 mt-2 text-center border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                              autoFocus
                              required
                            />
                            {error.registeredEmailverify ? (
                              <span
                                className="font-bold"
                                style={{ color: "red" }}
                              >
                                {error.registeredEmailverify}
                              </span>
                            ) : (
                              ""
                            )}
                            <button onClick={handleOtpVerify} type="button" className="btn">
                              Verify
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </form>

                  <hr className="w-full my-6 border-gray-300" />

                  <button
                    type="button"
                    onClick={googleSignUp}
                    className="block w-full px-4 py-3 font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <div className="flex items-center justify-center">
                      {/* svg icon google */}
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <path
                          fill="#EA4335 "
                          d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                        />
                        <path
                          fill="#4A90E2"
                          d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                        />
                      </svg>
                      <span className="ml-4">Signup with Google</span>
                    </div>
                  </button>

                  <div className="w-full my-6 border-gray-300"></div>

                  <p className="mt-8">
                    Already have an Account?
                    <a
                      href="#"
                      className="pl-2 font-semibold tracking-wider text-blue-500 hover:text-blue-600"
                      onClick={handleDiv}
                    >
                      Login
                    </a>
                  </p>
                  <p className="mt-12 text-sm text-gray-500">
                    &copy; 2023 Typof - All Rights Reserved.
                  </p>
                </div>
              </>
            ) : (
              // Login Form
              <>
                <div className="w-full h-100">
                <h1 className="mt-12 text-xl font-bold leading-tight md:text-2xl">
                    Welcome back
                  </h1>
                  {/* {loginError ? (
                    <h4
                      className="flex justify-center "
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      {loginError}
                    </h4>
                  ) : (
                    ""
                  )} */}
                  <h1 className="mt-6 text-base text-gray-600 capitalizer">
                    Log in to your Linktyp
                  </h1>
                  <form
                    className="mt-6"
                    action="#"
                    method="POST"
                    onSubmit={loginFormSubmit}
                  >
                    <div>
                      <label className="block text-gray-700" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        value={Loginemail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        type="email"
                        name="Loginemail"
                        id="Loginemail"
                        style={
                          emailError
                            ? { border: "1px solid red", outline: "none" }
                            : {}
                        }
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        required
                      />
                      <p className="text-red-600">{emailError}</p>
                    </div>

                    <div className="relative mt-4 ">
                    <label className="block text-gray-700" htmlFor="Loginpassword">
                        Password
                      </label>
                      <input
                        value={Loginpassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        name="Loginpassword"
                        id="Loginpassword"
                        placeholder="Enter Password"
                        className="w-full px-4 py-3 mt-2 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                        required
                        onClick={handlePasswordClick}
                      />
                      <span
                        className="absolute inset-y-0 right-0 flex items-center px-2 pt-6"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {passwordError ? (
                      <p className="text-red-600">{passwordError}</p>
                    ) : (
                      ""
                    )}

                    <div className="mt-2 ">
                      <label
                        htmlFor="my-modal-3"
                        className="cursor-pointer hover:text-blue-600 focus:text-blue-600"
                      >
                        Forgot/Set Password
                      </label>
                     
                      <input
                        type="checkbox"
                        id="my-modal-3"
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="relative modal-box">
                          <label
                            htmlFor="my-modal-3"
                            className="absolute btn btn-sm btn-circle right-2 top-2"
                          >
                            ✕
                          </label>{" "}
                          {forgotPasswordModal ? (
                            <div className="w-full form-control">
                              <span
                                className="flex justify-center font-bold"
                                style={{ color: "blue" }}
                              >
                                Otp has sent to your email address.
                              </span>
                              <label className="label">
                                <span className="label-text">
                                  Your Registered Email
                                </span>
                              </label>
                              <input
                                type="email"
                                value={Loginemail}
                                readOnly
                                onChange={(e) =>
                                  setResetPasswordEmail(e.target.value)
                                }
                                placeholder="Email"
                                className="w-full input input-bordered"
                              />

                              <label className="label">
                                <span className="label-text">OTP</span>
                              </label>
                              <input
                                type="password"
                                value={resetOtp}
                                onChange={(e) => setResetOtp(e.target.value)}
                                placeholder="OTP"
                                maxLength={6}
                                className="w-full input input-bordered"
                                style={
                                  error.ConfirmOtp
                                    ? {
                                        border: "1px solid red",
                                        outline: "none",
                                      }
                                    : {}
                                }
                              />
                              {error.ConfirmOtp ? (
                                <span
                                  className="font-bold"
                                  style={{ color: "red" }}
                                >
                                  {error.ConfirmOtp}
                                </span>
                              ) : (
                                ""
                              )}
                              <label className="label">
                                <span className="label-text">New Password</span>
                              </label>
                              <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                  setNewPassword(e.target.value);
                                  if (newPassword)
                                    setError({ ...error, password: "" });
                                }}
                                placeholder="Password"
                                className="w-full input input-bordered"
                                style={
                                  error.password
                                    ? {
                                        border: "1px solid red",
                                        outline: "none",
                                      }
                                    : {}
                                }
                              />
                              {error.password ? (
                                <span
                                  className="font-bold"
                                  style={{ color: "red" }}
                                >
                                  {error.password}
                                </span>
                              ) : (
                                ""
                              )}
                              <button
                                className="w-full mt-10 rounded-lg btn"
                                onClick={handleResetPssword}
                              >
                                Confirm
                              </button>
                            </div>
                          ) : (
                            <main
                              id="content"
                              role="main"
                              className="w-full max-w-md p-6 mx-auto"
                            >
                              {/* <div className="bg-white shadow-lg mt-7 rounded-xl dark:bg-gray-800 dark:border-gray-700"> */}
                              <div className="">
                                <div className="text-center">
                                  {error.otp ? (
                                    <span
                                      className="flex justify-center font-bold"
                                      style={{ color: "red" }}
                                    >
                                      {error.otp}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <h1 className="block text-2xl font-bold text-gray-800">
                                    Forgot/set password?
                                  </h1>
                                </div>{" "}
                                <div className="mt-5">
                                  <div>
                                    <div className="grid gap-y-4">
                                      <div>
                                        <label
                                          htmlFor="email"
                                          className="block mb-2 ml-1 text-sm font-bold"
                                        >
                                          Email address
                                        </label>
                                        <div className="relative">
                                          <input
                                            type="email"
                                            id="email"
                                            value={otpEmail}
                                            onChange={(e) =>
                                              setOtpEmail(e.target.value)
                                            }
                                            name="email"
                                            className="block w-full px-4 py-3 text-sm border-2 border-gray-200 shadow-sm rounded-3xl focus:border-blue-500 focus:ring-blue-500"
                                            required
                                            aria-describedby="email-error"
                                          />
                                        </div>

                                        <p
                                          className="hidden mt-2 text-xs text-red-600"
                                          id="email-error"
                                        >
                                          Please include a valid email address
                                          so we can get back to you
                                        </p>
                                      </div>
                                      <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-3xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                        onClick={handleOtpSend}
                                      >
                                        send otp
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* </div> */}
                            </main>
                          )}{" "}
                        </div>
                      </div>{" "}
                    </div>
                    <button
                      onClick={loginFormSubmit}
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center w-full px-4 py-3 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:bg-blue-600"
                    >
                      Login
                      {/* icons arrow */}
                      <BsArrowRight className="ml-2" />
                    </button>
                  </form>
                  

                  {error.emailNotverifiedErr ? (
                    <span className="block font-bold" style={{ color: "red" }}>
                      {error.emailNotverifiedErr},
                      <label
                        htmlFor="verifyemail-modal"
                        className="text-gray-600 cursor-pointer hover:text-blue-600 focus:text-blue-600"
                      >
                        email id
                      </label>
                    </span>
                  ) : (
                    ""
                  )}

                  <hr className="w-full my-6 border-gray-300" />

                  <button
                    type="button"
                    onClick={googleLogin}
                    className="block w-full px-4 py-3 font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <div className="flex items-center justify-center">
                      {/* svg icon google */}
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <path
                          fill="#EA4335 "
                          d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                        />
                        <path
                          fill="#4A90E2"
                          d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                        />
                      </svg>
                      <span className="ml-4">Log in with Google</span>
                    </div>
                  </button>

                  <div className="w-full my-6 border-gray-300"></div>
                  {/* <button
                    type="button"
                    className="block w-full px-4 py-3 font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <div className="flex items-center justify-center">
                      <span className="flex ml-4">
                        <BsPhoneFill className="w-6 h-6 mr-1" />
                        Log in with Phone Number
                      </span>
                    </div>
                  </button> */}

                  <p className="mt-8 font-base">
                    New To LinkTyp ?
                    <a
                      href="#"
                      className="pl-2 font-semibold text-blue-500 hover:text-blue-500"
                      onClick={handleDiv}
                    >
                      Create an account
                    </a>
                  </p>

                  <p className="mt-12 text-sm text-gray-600">
                    &copy; 2023 Typof - All Rights Reserved.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
    }
    
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const cookies = req.cookies;

  if (cookies.access_token) {
    // Redirect to login page if user is not authenticated
    return {
      redirect: {
        destination: "/dashBoard",
        permanent: false,
      },
    };
  }
  return {
    props: { cookies },
  };
};
