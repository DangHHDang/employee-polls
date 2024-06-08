import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import "./Login.scss"

const Login = ({ users, dispatch }) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError('')
    setPasswordError('')
    setLoginError('')

    // Check if the user has entered both fields correctly
    if ('' === userName) {
      setEmailError('Please enter your UserName')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    const user = users.find(user => user.id == userName && user.password == password) || null
    if (user) {
      dispatch(setAuthedUser(user.id));
    } else {
      setLoginError("The Username or Password is Incorrect")
    }
  };

  return (
    <div className="has-text-centered">
      <div className="columns is-centered">
        <div className="column is-two-fifths">
          <h2 className="is-size-2 my-5">Login</h2>


          <form className="my-5">

            <br />
            <div className={'inputContainer'}>
              <label>
                <p>Username</p>
                <input
                  value={userName}
                  name="username"
                  placeholder="Enter your User Name here"
                  onChange={(ev) => setUserName(ev.target.value)}
                  className={'inputBox'}
                  aria-label="username"
                />
              </label>
              <p className="errorLabel">{emailError}</p>
            </div>
            <br />
            <div className={'inputContainer'}>
              <label>
                <p>Password</p>
                <input
                  value={password}
                  name="password"
                  placeholder="Enter your password here"
                  onChange={(ev) => setPassword(ev.target.value)}
                  className={'inputBox'}
                  type="password"
                  aria-label="password"
                />
              </label>
              {passwordError && (<p className="errorLabel">{passwordError}</p>)}
            </div>
            {loginError && (<p className="errorLabel">{loginError}</p>)}
            <br />
            <button name="log_in" className="button is-primary" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users: Object.values(users),
  };
};

export default connect(mapStateToProps)(Login);