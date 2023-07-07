import React from 'react';


function RegisterForm({ handleTogglePassword, passwordVisible}) {
    return (
        <form>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="firstNameInput" placeholder="John"></input>
                <label for="firstNameInput">First Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="lastNameInput" placeholder="Doe"></input>
                <label for="lastNameInput">Last Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="usernameInput" placeholder="username"></input>
                <label for="usernameInput">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="emailInput" placeholder="example@example.com"></input>
                <label for="emailInput">Email</label>
            </div>
            <div className="input-group mb-3">
                <div className="form-floating">
                    <input type={passwordVisible ? 'text' : 'password'} className="form-control" id="passwordRegisterInput" placeholder="Password"></input>
                    <label for="passwordLoginInput">Password</label>
                </div>
                <span className="input-group-text password-toggle" id="password-toggle" onClick={handleTogglePassword}><i className={passwordVisible ? 'bi-eye-fill' : 'bi-eye-slash-fill'} id="passwordIcon"></i></span>
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary">Register</button>
            </div>
        </form>
    )
};

export default RegisterForm;


