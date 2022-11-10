import React from "react";
import {
  useNavigate,
} from "react-router-dom";
import './SignUpForm.css';
import {useAuth} from '../AuthContext.js'

function SignUpForm() {
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
        <div class="form-row">
          <div class="col-md-4 mb-3">
            <label for="validationDefault01">First name</label>
            <input type="text" class="form-control" id="validationDefault01" placeholder="First name" value="Mark" required/>
          </div>
          <div class="col-md-4 mb-3">
            <label for="validationDefault02">Last name</label>
            <input type="text" class="form-control" id="validationDefault02" placeholder="Last name" value="Otto" required/>
          </div>
          <div class="col-md-4 mb-3">
            <label for="validationDefaultUsername">Username</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend2">@</span>
              </div>
              <input type="text" class="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required/>
            </div>
          </div>
        </div>
        <label for="inputPassword6">Password</label>
        <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" required/>
        <small id="passwordHelpInline" class="text-muted">
          Must be 8-20 characters long.
        </small>
        <p></p>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
            <label class="form-check-label" for="invalidCheck2">
              Agree to terms and conditions
            </label>
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Submit form</button>
      </form>
    </div>
  );
}

export default SignUpForm;