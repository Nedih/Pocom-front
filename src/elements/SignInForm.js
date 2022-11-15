import './SignUpForm.css';
import { useRef, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {useAuth} from '../AuthContext.js'
import axios from '../api/axios.js';

const LOGIN_URL = '/auth';

function SignInForm() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { setAuth} = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        /*const response = await axios.post(LOGIN_URL,
            JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;*/
        //setAuth({ user, pwd, roles, accessToken });
        sessionStorage.setItem('is-authorized', true);
        setAuth(true);
        navigate('/feed');
        setUser('');
        setPwd('');
        setSuccess(true);
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
}

  return (
    <div className="SignUpForm">
       <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>{i18n.t('Sign In (header)')}</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">{i18n.t('Username:')}</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">{i18n.t('Password')}:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>{i18n.t('Sign In')}</button>
                    </form>
                    <p>
                        {i18n.t('Need an Account?')}
                        <br />
                        <span className="line">
                        <NavLink to='/sign_up'>{i18n.t('Sign Up')}</NavLink>
                        </span>
                    </p>
                </section>
            )}
        </>
    </div>
  );
}

export default SignInForm;