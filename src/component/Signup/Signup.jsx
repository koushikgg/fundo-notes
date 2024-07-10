import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import './signup.scss';
import { useNavigate } from 'react-router-dom';
import { SignupApi } from '../../services/UserService';
import { useState } from 'react';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        const nameRegex = /^[a-zA-Z]+$/;
        const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /.{8,}/;

        if (!nameRegex.test(firstName)) {
            toast.error('Invalid first name',{position:"top-center"});
            return;
        }

        if (!nameRegex.test(lastName)) {
            toast.error('Invalid last name',{position:"top-center"});
            return;
        }

        if (!usernameRegex.test(userName)) {
            toast.error('Invalid username',{position:"top-center"});
            return;
        }

        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 8 characters long',{position:"top-center"});
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match',{position:"top-center"});
            return;
        }

        const res = await SignupApi({ firstName:firstName, lastName:lastName, email: userName, password:password, service: 'advance' });
        console.log(res);
        if (res.status === 200) {
            toast.success('Signup successful!');
            navigate('/');
        } else {
            toast.error('Signup failed. Please try again.');
        }
    };
    return (
        <>

            <div className="signup-main-cnt">
                <div className="info-cnt">
                    <div className="info-details_main-cnt">
                        <span className="fundo-text-txt">Fundo</span>
                        <span className="Create-account-txt">Create your Fundo Account</span>
                        <div className="dummy">
                            <div className="inp-fname-lanme-cnt inp-div">
                                <div>
                                    <TextField id="outlined-basic" className='inp-cnt' label="First Name*" onChange={(e) => setFirstName(e.target.value)} variant="outlined" />
                                </div>
                                <div>
                                    <TextField id="outlined-basic" className='inp-cnt' label="Last Name*" onChange={(e) => setLastName(e.target.value)} variant="outlined" />
                                </div>
                            </div>
                            <div className="inp-username-cnt inp-div">
                                <div className='username-inp-cnt'>
                                    <TextField id="outlined-basic" label="Username*" onChange={(e) => setUserName(e.target.value)} variant="outlined" />
                                </div>
                                <span className="text-for-pass">You can use numbers, letters & periods</span>
                            </div>
                            <div className="password-div">
                                <div className="inp-pass_confrim-cnt inp-div">
                                    <TextField id="outlined-basic" className='inp-cnt' label="Password*" onChange={(e) => setPassword (e.target.value)} variant="outlined" />
                                    <TextField id="outlined-basic" className='inp-cnt' label="Confrim*" onChange={(e) => setConfirmPassword( e.target.value)} variant="outlined" />
                                </div>
                                <span className="pass-setup-txt">Use 8 or more characters with a mix letters, numbers &
                                    symbols</span>
                            </div>

                        </div>
                        <div className="signin-register-boton-cnt inp-div">
                            <Button variant="text" onClick={() => navigate("/")}>Sign in instead</Button>
                            <Button variant="contained" onClick={handleSignup}>Register</Button>
                        </div>

                    </div>
                    <div className="img-cnt">
                        <img src="https://lh4.googleusercontent.com/proxy/m6tdf4WP7sUYOzq7AwqGT1m6r3Abj8X0jdmpfPGgpsmQIHp5-AOvdMTtEI8Kg_B3ei2H0ETg0mLhTvsidzaWQWkNtAJhmpw2yYcq5OjyNEWDyhZ7jlTj8wy_yoZz=w1366-h603" alt="Not Available" />
                        <p>One account.All of Fundo</p>
                        <p>working for you</p>
                    </div>

                </div>
                <div className="extra-option-cnt">
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

        </>
    )
}
export default Signup;