import React from "react";
import "./SignUpIntro.css";
import logo from './images/twitter.png';
import twitter from "./images/twitter-logo.png";
import google from "./images/google-icon.png";
import logoapple from "./images/logo-apple.png";
import { Link } from "react-router-dom";



function SignUpIntro() {
    return (
        <div className="signup-intro-main-container">
            <div className="signup-main-container">
                <div className="signup-intro-image-container">
                    <img className="twitter-image" src={logo} alt="logo" style={{ width: 836, height: 771 }} />
                </div>
                <div className="signup-intro-text-container">
                    <img src={twitter} alt="twitter" style={{ width: 50, height: 41 }} />
                    <h1 className="signup-intro-header">Happening now</h1>
                    <p className="signup-intro-paragraph">Join Twitter Today</p>
                    <div className="signup-intro-google-container">
                        <img src={google} alt="google" style={{ width: 31, height: 32 }} />
                        <p className="signup-intro-google-paragraph">Sign up with Google</p>
                    </div>
                    <div className="signup-intro-apple-container">
                        <img src={logoapple} alt="apple" style={{ width: 31, height: 32 }} />
                        <p className="signup-intro-apple-paragraph">Sign up with Apple</p>
                    </div>

                    <Link to="/signup">
                    <div className="signup-intro-phone-email-container">
                    <p>Sign up with phone or email</p>
                    </div>
                    </Link>
                    
                    <div className="signup-intro-terms-service-container">
                        <p>By singing up you agree to the <span className="terms-of-service">Terms of Service</span> and <span className="privacy-policy">Privacy<br className="nomob" />Policy</span>, including <span className="cookie-use">Cookie Use</span>.</p>
                    </div>
                    <div className="signup-intro-already-account-container">
                       <p>Already have an account? <Link to="/login"><span className="signup-intro-log-in">Log in</span></Link></p>
                    </div>
                </div>
            </div>
            <div className="sign-up-intro-footer-container">
                <p>About</p>
                <p>Help Center</p>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Cookie Policy</p>
                <p>Ads info</p>
                <p>Blog</p>
                <p>Status</p>
                <p>Carres</p>
                <p>Brand Resources</p>
                <p>Advertsing</p>
                <p>Marketing</p>
                <p>Twitter for Business</p>
                <p>Developers</p>
                <p>Directory</p>
                <p>Settings</p>
                <p>© 2021 Twitter, Inc.</p>
            </div>
        </div>
    )
};

export default SignUpIntro;