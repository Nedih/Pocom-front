import React, {useState} from "react";
import {
  useNavigate,
} from "react-router-dom";
import './SignUpForm.css';
import {useAuth} from '../AuthContext.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function SignUpForm() {
  const navigate = useNavigate();
  const { setAuth} = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [phone, setPhone] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    sessionStorage.setItem('is-authorized', true);
    console.log(phone);
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
            <label for="validationDefault02">Middle name</label>
            <input type="text" class="form-control" id="validationDefault02" placeholder="Last name" value="Otto" required/>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationDefaultUsername">Email</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend2">@</span>
            </div>
            <input type="text" class="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required/>
          </div>
        </div>
        <label for="validationDefault05" class="form-label">Birth</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <label for="validationDefault05" class="form-label">Phone</label>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}/>
        <div class="col-md-4 mb-3">
            <label for="validationDefault02">Username</label>
            <input type="text" class="form-control" id="validationDefault02" placeholder="Last name" value="Otto" required/>
          </div>
          <div class="row g-3 align-items-center">
          <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">Password</label>
          </div>
          <div class="col-auto">
            <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline"/>
          </div>
          <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              Must be 8-20 characters long.
            </span>
          </div>
        </div>
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