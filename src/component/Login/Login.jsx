import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { LoginApi, resetPasswordApi } from '../../services/UserService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setuserNameSlice } from '../../store/userNameSlice';



function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [openPassReset, setOpenPassReset] = useState('login');
    const [confrimPassReset, setConfrimPassReset] = useState('passreset');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /.{8,}/;
        if (!usernameRegex.test(userName)) {
            toast.error('Invalid username', { position: "top-center" });
            return;
        }

        try {
            const res = await LoginApi({ email: userName, password });
            if (res.status === 200) {
                localStorage.setItem("AcessToken", res?.data?.id);
                localStorage.setItem('userFName', res?.data?.firstName);
                localStorage.setItem('userLName', res?.data?.lastName);
                localStorage.setItem('userEmail', res?.data?.email);
                toast.success('Login successful!');
                navigate('/dashboard/notes');
            }
        } catch (error) {
            console.log(error);
            toast.error('Please check credentials');
        }
    };

    async function handleClick(action){
        if (action==='emailEntered'){
            const res = await resetPasswordApi({email:email});
            if (res?.success==true){
                setConfrimPassReset('')
            }else{
                toast.error('Please Enter Valid Email');

            }
        }
        if (action==='passwordSent'){
            const res = await resetPasswordApi({password:password});
            if (res?.success==true){
                setOpenPassReset('login')
            }else{
                toast.error('Please Enter Valid Password');
            }
        }
    }

    return (
        <div className="login-main-cnt">
            <div className="login-inp-main-cnt">
                {openPassReset === 'passreset' ? (confrimPassReset === 'passreset' ? (
                    <div className="inp-txt-main-cnt">
                        <div className="user-txt-cnt">
                            <p>To reset password </p>
                        </div>
                        <div className="email-inp-cnt">
                            <TextField id="reset-email" onChange={(e) => setEmail(e.target.value)} label=" Valid Enter Email Id " variant="outlined" />
                        </div>
                        <div className="pass-inp-cnt">
                            <Button variant="contained" onClick={handleClick('emailEntered')}>Send</Button>
                        </div>
                    </div>) : (
                    <div className="inp-txt-main-cnt">
                        <div className="user-txt-cnt">
                            <p>Please Enter Password</p>
                        </div>
                        <div className="email-inp-cnt">
                            <TextField id="reset-email"  label="Password" variant="outlined" />
                        </div>
                        <div className="email-inp-cnt">
                            <TextField id="reset-email"  label="Confrim" variant="outlined" />
                        </div>
                        <div className="pass-inp-cnt">
                            <Button variant="contained" onClick={handleClick('passwordSent')}>Reset</Button>
                        </div>
                    </div>
                )) :
                (
                <div className="inp-txt-main-cnt">
                    <div className="fundo-txt-cnt">
                        <p>Fundo</p>
                    </div>
                    <div className="signin-txt-cnt">
                        <p>Sign in</p>
                    </div>
                    <div className="user-txt-cnt">
                        <p>Use your Fundo Account</p>
                    </div>
                    <div className="email-inp-cnt">
                        <TextField id="email" onChange={(e) => setUserName(e.target.value)} label="Email or phone*" variant="outlined" />
                    </div>
                    <div className="pass-inp-cnt">
                        <TextField id="password" onChange={(e) => setPassword(e.target.value)} label="Password*" variant="outlined" />
                        <p onClick={() => setOpenPassReset('passreset')} id='forgot-pass-btn'>Forgot password</p>
                    </div>
                    <div className='sub-cnt'>
                        <Button variant="text" onClick={() => navigate("/signup")}>Create Account</Button>
                        <Button variant="contained" onClick={handleLogin}>Login</Button>
                    </div>
                </div>
                )}
                <div className="login-extra-option-cnt">
                    <div>
                        <select className="mySelect-inp">
                            <option value="English (United States)">English (United States)</option>
                            <option value="English (India)">English (India)</option>
                            <option value="English (United Kingdom)">English (United Kingdom)</option>
                        </select>
                    </div>
                    <div className="extra-option-txt-cnt">
                        <p>Help</p>
                        <p>Privacy</p>
                        <p>Terms</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
