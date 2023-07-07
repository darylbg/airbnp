import React from 'react';

function LoginForm({ handleTogglePassword, passwordVisible}) {
  return (
    <form>
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="emailLoginInput" placeholder="name@example.com"></input>
            <label for="emailLoginInput">Email address</label>
        </div>
        <div className="input-group mb-3">
            <div className="form-floating">
                <input type={passwordVisible ? 'text' : 'password'} className="form-control" id="passwordLoginInput" placeholder="Password"></input>
                <label for="passwordLoginInput">Password</label>
            </div>
            <span className="input-group-text password-toggle" id="password-toggle" onClick={handleTogglePassword}><i className={passwordVisible ? 'bi-eye-fill' : 'bi-eye-slash-fill'} id="passwordIcon"></i></span>
        </div>
        <div className="mb-3">
            <button type="submit" className="btn btn-primary">Login</button>
        </div>
    </form>
  )
};

export default LoginForm;
