import React from "react";
import {
  useNavigate,
} from "react-router-dom";
import './SignUpForm.css';
import {useAuth} from '../AuthContext.js'

function SignInForm() {
  const navigate = useNavigate();
  const { setAuth} = useAuth();

  const handleSubmit = event => {
    event.preventDefault();
    sessionStorage.setItem('is-authorized', true);
    setAuth(true);
    navigate('/feed');
  };

  return (
    <div className="SignUpForm">
      <form onSubmit={handleSubmit} method="post">
        <label for="validationDefaultUsername">Username</label>
        <div class="input-group">
            <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend2">@</span>
            </div>
            <input type="text" class="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required/>
        </div>
        <label for="inputPassword6">Password</label>
        <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" required/>
        <small id="passwordHelpInline" class="text-muted">
          Must be 8-20 characters long.
        </small>
        <p></p>        
        <button class="btn btn-primary" type="submit">Submit form</button>
      </form>
    </div>
  );
}

export default SignInForm;