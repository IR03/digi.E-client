import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { USerContext } from '../../App';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';
import './Login.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { setLoggedInUser } = useContext(USerContext);
    const [newUser, setNewUser] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const { register, handleSubmit } = useForm();

    const [user, setUser] = useState({
        isSignedIn: false,
        userName: '',
        email: '',
        userPhoto: ''
    });

    setLoggedInUser(user);
    initializeLoginFramework();

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                history.replace(from);
            });
    }
    const onSubmit = data => {
        const { name, email, password } = data;

        if (newUser && name && email && password) {
            createUserWithEmailAndPassword(name, email, password)
                .then(res => {
                    res.userName = name;
                    setUser(res);
                    history.replace(from);

                })
        }

        if (!newUser && email && password) {
            signInWithEmailAndPassword(email, password)
                .then(res => {
                    setUser(res);
                    history.replace(from);

                })
        }
    };
    return (
        <div className="login-contain">
            <div className={newUser ? "login-container right-panel-active" : "login-container "} id="container">
                <div className={newUser ? "form-container sign-up-container" : "form-container sign-in-container"}>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <h1>{newUser ? "Create Account" : "Sign in"}</h1>
                        <div className="social-container">
                            <Link onClick={googleSignIn} className="social">
                                <FaGoogle />
                            </Link>
                        </div>
                        <span>{newUser ? "or use your email for registration" : "or use your account"}</span>
                        {newUser &&
                            <input
                                name="name"
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Name"
                                required />}
                        <input
                            name="email"
                            type="email"
                            {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
                            placeholder="Email"
                            required />
                        <input
                            name="password"
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters."
                                }
                            })}
                            placeholder="Password"
                            required />
                        {!newUser && <Link>Forgot your password?</Link>}
                        <button type="submit">{newUser ? "Sign Up" : "Sign In"}</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={() => setNewUser(false)}>Sign In</button>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => setNewUser(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;