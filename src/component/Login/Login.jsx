import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../services/UserService';
import { toast } from 'react-toastify';
import { useState } from 'react';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleLogin = async () => {
        // console.log(username);
        // console.log(password);
        const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /.{8,}/;
        if (!usernameRegex.test(userName)) {
            toast.error('Invalid username', { position: "top-center" });
            return;
        }

        
        try {
            const res = await LoginApi({ email: userName, password: password });
            if (res.status === 200) {
                localStorage.setItem("AcessToken",res?.data?.id)
                toast.success('Login successful!');
                navigate('/dashboard/notes');
            } 
        } catch (error) {
            console.log(error);
                toast.error('Please check credentials');

        }

    }
    return (
        <>
            <div className="login-main-cnt">
                <div className="login-inp-main-cnt">
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
                            <TextField id="outlined-basic" onChange={(e) => setUserName(e.target.value)} label="Email or phone*" variant="outlined" />
                        </div>
                        <div className="pass-inp-cnt">
                            <TextField id="outlined-basic" onChange={(e) => setPassword(e.target.value)} label="Password*" variant="outlined" />
                            <p>Forgot password</p>
                        </div>
                        <div className='sub-cnt'>
                            <Button variant="text" onClick={() => navigate("/signup")}>Create Account</Button>
                            <Button variant="contained" onClick={handleLogin}>Login</Button>
                        </div>
                    </div>
                    <div class="login-extra-option-cnt">
                        <div>
                            <select class="mySelect-inp">
                                <option value="English (United States)">English (United States)</option>
                                <option value="English (India)">English (India)</option>
                                <option value="English (United Kingdom)">English (United Kingdom)</option>
                            </select>
                        </div>
                        <div class="extra-option-txt-cnt">
                            <p>Help</p>
                            <p>Privacy</p>
                            <p>Terms</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;