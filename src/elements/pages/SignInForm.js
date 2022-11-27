import './SignUpForm.css';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {useAuth} from '../../context/AuthContext.js'
import {signIn} from '../../api/axios.js';

function SignInForm() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
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
        const input = {
            email: user,
            password: pwd
        }
        const response = await signIn(input).then((response) => {
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            console.log("TOKEN: " + accessToken);

            window.sessionStorage.setItem('userToken', accessToken?.toString());
            window.sessionStorage.setItem('refreshToken', refreshToken?.toString());
            window.sessionStorage.setItem('isAuthorized', true);

            let jwtData = response?.data?.accessToken?.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            console.log(decodedJwtData); 
            const roles = decodedJwtData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            console.log(roles);
            if(Array.isArray(roles)){
                window.sessionStorage.setItem('userRoles', JSON.stringify(roles));
                const loggedUser = { loggedIn: true, token: accessToken?.toString(), refreshToken: refreshToken?.toString(), roles: roles}
                setAuth(loggedUser);
            }
            else{
                const emptyArray = [];
                const rolesArray = emptyArray.concat(roles);
                window.sessionStorage.setItem('userRoles', JSON.stringify(rolesArray));
                const loggedUser = { loggedIn: true, token: accessToken?.toString(), refreshToken: refreshToken?.toString(), roles: rolesArray}
                setAuth(loggedUser);
            } 

            navigate('/feed');
            setUser('');
            setPwd('');
            setSuccess(true);
        })
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
                    <p ref={errRef} className={errMsg ? "errmsg" : "d-none"} aria-live="assertive">{errMsg}</p>
                    <h1>{i18n.t('Sign In (header)')}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-outline mb-4'>
                            <input
                                className="form-control"
                                placeholder={i18n.t('Email')}
                                type="email"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>
                        <div className='form-outline mb-4'>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                placeholder={i18n.t('Password')}
                                required
                            />
                        </div>
                        <button className='btn btn-secondary'>{i18n.t('Sign In')}</button>
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