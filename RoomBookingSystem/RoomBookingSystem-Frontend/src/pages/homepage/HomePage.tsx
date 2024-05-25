import "../../css/HomePage.css";
import "../../css/Login.css";
import "../../css/Register.css";
import "../../css/ForgotPass.css";
import HomeNavbar from "./HomeNavbar.tsx";
import {useEffect, useState} from 'react';
import {FaRegWindowClose} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {MdEmail, MdOutlineSecurity} from "react-icons/md";
import {IoMdPerson} from "react-icons/io";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";


    function HomePage() {
        const [showLoginPage, setShowLoginPage] = useState(false);
        const [showRegisterPage, setShowRegisterPage] = useState(false);
        const [showForgotPage, setShowForgotPage] = useState(false);

        const [loginSuccess, setLoginSuccess] = useState(false);
        const [loginError, setLoginError] = useState<string>('');


        const toggleLoginPage = () => {
            setShowLoginPage(!showLoginPage);
            setShowRegisterPage(false);
            if (!showLoginPage) {
                document.body.classList.add('blur');
            } else {
                document.body.classList.remove('blur');
            }

        };
        const toggleRegisterPage = () => {
            setShowRegisterPage(!showRegisterPage);
            setShowLoginPage(false);
            if (!showRegisterPage) {
                document.body.classList.add('blur');
            } else {
                document.body.classList.remove('blur');
            }
        };

        const toggleForgotPage = () => {
            setShowForgotPage(!showRegisterPage);
            setShowLoginPage(false);
            if (!showForgotPage) {
                document.body.classList.add('blur');
            } else {
                document.body.classList.remove('blur');
            }
        };

        //Register api connection
        const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
            watch,
        } = useForm();

        const useApiCall=useMutation({
            mutationKey:["POST_USER_CREATE"],
            mutationFn:(payload:any)=>{
                console.log(payload)
                return axios.post("http://localhost:8080/register/register",payload)
            },
            onSuccess: () => {
                difftoast();
                reset();
            },
        })

        //login api

        const [user, setUser] = useState(null);

        const useApiCallLogin = useMutation({
            mutationKey: ["POST_USER_LOGIN"],
            mutationFn: (payload: any) => {
                console.log(payload);
                return axios.post("http://localhost:8080/register/login", payload);
            },
            onSuccess: (response) => {
                const userData = response.data;
                if (userData) {
                    console.log("User Data:", userData);

                    try {
                        localStorage.setItem("userDetails", JSON.stringify(userData));

                        handleLoginSuccess();
                        const data: any = JSON.parse(localStorage.getItem("userDetails"));
                        console.log(data);
                        console.log(typeof data);
                        setUser(data);
                        reset();

                        //ADMIN LOGIN
                        if (userData.roles === "ADMIN") {
                            // Redirect to admin page or perform admin-related actions
                            window.location.href = '/AdminDashboard'; // Assuming you have a route for the admin page
                        } else {
                            console.error("User details not found in the response");
                        }
                    } catch (error) {
                        if (axios.isAxiosError(error)) {
                            const errorMessage = error.response?.data?.message || 'Invalid email or password';
                            console.error('Failed to login:', errorMessage);
                            setLoginError((prevError) => {
                                console.log('Previous Error:', prevError);
                                console.log('New Error:', errorMessage); // Debug statement
                                return errorMessage;
                            });
                        }
                    }
                }
            },
        });

        const handleLoginSuccess = () => {
            setLoginSuccess(true);
        };


        useEffect(() => {
            // Close login popup when login success state is true
            if (loginSuccess) {
                toggleLoginPage();
                setLoginSuccess(false);  // Reset login success state
            }
        }, [loginSuccess, showLoginPage]);


        const onSubmitLogin = async (values: any) => {
            try {
                const response = await useApiCallLogin.mutate(values);
                console.log('Login API Response:', response);

                // Check if the response has data indicating a successful login
                if (response.data) {
                    // Handle successful login (if needed)
                    handleLoginSuccess();
                } else {
                    // If no data is received, consider it an unsuccessful login
                    throw new Error('Invalid email or password');
                }
            } catch (error) {
                console.error('Login Error:', error);

                // Check for specific error cases, such as 401 Unauthorized
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    setLoginError('Invalid email or password');
                } else {
                    // Handle other error cases
                    setLoginError('Invalid email or password');
                }
                setTimeout(() => {
                    setLoginError('');
                }, 2000);
            }
        };


        //forgot password api
        const [email, setEmail] = useState<string>('');
        const [securityQuestion, setSecurityQuestion] = useState<string>('');
        const [newPassword, setNewPassword] = useState<string>('');
        const [confirmPassword, setConfirmPassword] = useState<string>('');
        const [error, setError] = useState<string>('');

        const useApiforgetCall = useMutation({
            mutationKey: ['POST_RESET_PASSWORD'],
            mutationFn: async () => {
                try {
                    // Validation: Check if any field is empty
                    if (!email || !securityQuestion || !newPassword || !confirmPassword) {
                        throw new Error('Please fill in all fields');
                    }

                    // Check if new password and confirm password match
                    if (newPassword !== confirmPassword) {
                        throw new Error('New password and confirm password do not match');
                    }

                    // Make the API call to reset the password
                    const response = await axios.post('http://localhost:8080/register/resetPassword', {
                        email,
                        securityQuestion,
                        password: newPassword,
                        confirmPassword,
                    });
                    console.log('Password reset successfully:', response.data);

                    // Redirect to another page on successful password reset
                    window.location.href = '/';

                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const errorMessage = error.response?.data?.message || 'Invalid email or security question';
                        console.error('Failed to reset password:', errorMessage);
                        setError(errorMessage);
                    } else {
                        const errorMessage = error.message || 'Unknown error';
                        console.error('Failed to reset password:', errorMessage);
                        setError(errorMessage);
                    }

                }
            },
        });
        const handleResetPassword = () => {
            // Clear previous error messages
            setError('');

            // Trigger the API call only if all fields are filled
            useApiforgetCall.mutate();
        };

        const difftoast =() => {
            toast.success("wow! you just register", {position: "top-center"})
        }

        const onSubmit=(value:any)=>{
            useApiCall.mutate(value)
        }

        useEffect(() => {
            const storedData = localStorage.getItem("userDetails");
            if (storedData) {
                setUser(JSON.parse(storedData));

                console.log(user)
            }
        }, []);

        return (
            <div className={"homepage-wrapper"}>
                <HomeNavbar showLogin={toggleLoginPage} />
                <div className={"swipe-image"}>
                    <div className="background-image"></div>
                </div>
                <div className="content-container">
                    <div className={"text-over-image"}>
                        <div className={"text1"}>"Get Luxury And Comfort"</div>
                        <div className={"text2"}>Welcome To The Place Where Luxury Meets Affordability</div>
                        <div className={"text3"}>Contact No:9808347322,9812345678</div>
                        <div className={"text3"}>Email:ezzrooms@gmail.com</div>
                    </div>
                    {/*<div className="Contact">*/}
                    {/*    <h2>Contact</h2>*/}
                    {/*    <ul>*/}
                    {/*        <li>Address</li>*/}
                    {/*        <li>Contact</li>*/}
                    {/*        <li>Email</li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}

                    {showLoginPage && (
                        <div className="login-modal">
                            <div className="login-modal-content">
                                <h2>LOG IN</h2>
                                <button className="close-login-btn" onClick={() => setShowLoginPage(false)}>
                                    <FaRegWindowClose />
                                </button>

                                <form onSubmit={handleSubmit(onSubmitLogin)}>
                                    <div className={"input-box"}>
                                        <span className={"iconmail"}><MdEmail /></span>
                                        <div className={"email"}>
                                            <input
                                                type={"email"}
                                                placeholder={"Email"}
                                                {...register("email")}
                                            />
                                        </div>
                                        <span className={"iconpassword"}><RiLockPasswordFill/></span>
                                        <div className={"password"}>
                                            <input
                                                type={"password"}
                                                placeholder={"Password"}
                                                {...register("password")}
                                            />
                                        </div>
                                    </div>
                                    <div className={"Remember-forget"}>
                                        <label><input type={"checkbox"}/>Remember me</label>
                                        <a href={"#"} onClick={toggleForgotPage}>Forget passsword?</a>
                                    </div>
                                    <div className={'error-message top-error-message'}>
                                        {loginError && <p>{loginError}</p>}
                                    </div>
                                    <button type={"submit"} className={"btn-login"} >Login</button>

                                    <div className={"register-text"}>
                                        <p> Don't have an account?
                                            <a href={"#"} onClick={toggleRegisterPage}>Register</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {showRegisterPage && (
                        <div className="register-modal">
                            <div className="register-modal-content">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h2>SIGN UP</h2>
                                    <button className="close-register-btn" onClick={() => setShowRegisterPage(false)}>
                                        <FaRegWindowClose />
                                    </button>
                                    <div className={"reg-input-box"}>
                                        <div className={"email"}>
                                            <span className={"icon-fullname"}><IoMdPerson /></span>
                                            <input type={"text"} placeholder={"Full Name"} {...register("fullName",{
                                                required:"FullName is required!!"
                                            })}/>
                                            {errors.fullName && (
                                                <p className="error-message">{errors?.fullName?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className={"email"}>
                                            <span className={"icon-email"}><MdEmail /></span>
                                            <input type={"email"} placeholder={"Email"} {...register("email",
                                                {required:"Email is required!!"})}/>
                                            {errors.email && (
                                                <p className="error-message">{errors?.email?.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className={"password"}>
                                            <span className={"icon-password"}><RiLockPasswordFill/></span>
                                            <input
                                                type={"password"}
                                                placeholder={"Password"}
                                                {...register("password", {
                                                    required: "Password is required!!",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password should be at least 6 characters long",
                                                    },
                                                })}
                                            />
                                            {errors.password && (
                                                <p className="error-message">{errors?.password?.message}</p>
                                            )}
                                        </div>

                                        <div className={"password"}>
                                            <span className={"icon-confirm-password"}><RiLockPasswordFill/></span>
                                            <input type={"password"} placeholder={"Confirm Password"}
                                                   {...register("confirmPassword", {


                                                       required: "Confirm Password is required",
                                                       validate: {
                                                           matchesPassword: (value) =>
                                                               value === watch("password") || "Confirm Password does not match Password",
                                                       },
                                                   })}
                                            />
                                            {errors.confirmPassword && (
                                                <p className="error-message">{errors?.confirmPassword?.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className={"security-question"}>
                                            <div className={"header10"}>Security Question</div>
                                            <div className={"answer"}>
                                                <span className={"icon-security"}>  <MdOutlineSecurity /></span>
                                                <input type={"answer"} placeholder={"Your first school name?"} {...register("securityQuestion",
                                                    {required:"SecurityQuestion is required!!"})} />
                                                {errors.securityQuestion && (
                                                    <p className="error-message">{errors?.securityQuestion?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button type={"submit"} className={"btn-signup10"}>Sign Up</button>
                                    <ToastContainer/>

                                    <div className={"login-text"}>
                                        <p> Already have an account?
                                            <a href={"#"} onClick={toggleLoginPage}>Login</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}


                    {showForgotPage &&(
                        <div  className={"forget-modal"}>
                            <div className={"forget-modal-content"}>
                                <div className={'heading'}>
                                    <h2>FORGOT PASSWORD</h2>
                                    <h3>Please fill your crediantials</h3>
                                </div>
                                <div className={'close-button'}>
                                    <button className="close-register-btn" onClick={() => setShowForgotPage(false)}>
                                        <FaRegWindowClose />
                                    </button>
                                </div>
                                <div className={'input-section'}>
                                    <span className={'mail-icon'}><MdEmail /></span>
                                    <input
                                        className={'username_input'}
                                        type={'text'}
                                        placeholder={'Email'}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                </div>
                                <div className={'input-section'}>
                                    <span className={"security-question-icon"}>  <MdOutlineSecurity /></span>
                                    <input
                                        className={'question_input'}
                                        type={'text'}
                                        placeholder={'Security question here'}
                                        onChange={(e) => setSecurityQuestion(e.target.value)}
                                    />

                                </div>
                                <div className={"input-section"}>
                                    <span className={'iconpassword'}><RiLockPasswordFill /></span>
                                    <input
                                        className={'password_input'}
                                        type={'password'}
                                        placeholder={'New password'}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />

                                </div>
                                <div className={"input-section"}>
                                    <span className={'iconpassword'}><RiLockPasswordFill /></span>
                                    <input
                                        className={'confirm_input'}
                                        type={'password'}
                                        placeholder={'Confirm password'}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className={'error-message'}>{error && <p>{error}</p>}</div>
                                <div>
                                    <button className={'sendbtn'} onClick={handleResetPassword}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        )
    }
    export default HomePage;
