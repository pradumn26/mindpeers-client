import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../stylesheets/loginpage.css';

class LoginPage extends Component {
    constructor() {
        super();

        this.userSignUpButton = this.userSignUpButton.bind(this);
        this.doctorsSignUpButton = this.doctorsSignUpButton.bind(this);
        this.userLoginButton = this.userLoginButton.bind(this);
        this.doctorsLoginButton = this.doctorsLoginButton.bind(this);
    }

    render() {
        return (
            <div id="login_page" className="row">
                <div id="users_login" className="col-sm-5">
                    <h1>
                        User Login
                    </h1>

                    <form id="f1" method="POST" action="/usersLogin">
                        <input id="f1_email" name="email" type="email" placeholder="Email"/>
                        <span id="f1_email_error" className="error_span"/>
                        <input id="f1_password" name="password" type="password" placeholder="Password"/>
                        <span id="f1_password_error" className="error_span"/>
                        <button className="login_button" onClick={this.userLoginButton}>LOG IN</button>
                        <button onClick={this.userSignUpButton}>SIGN UP</button>
                    </form>
                </div>

                <div id="doctors_login" className="col-sm-5">
                    <h1>
                        Doctor's Login
                    </h1>

                    <form method="POST" action="/doctorsLogin">
                        <input id="f2_email" name="email" type="email" placeholder="Email"/>
                        <span id="f2_email_error" className="error_span"/>
                        <input id="f2_password" name="password" type="password" placeholder="Password"/>
                        <span id="f2_password_error" className="error_span"/>
                        <button className="login_button" onClick={this.doctorsLoginButton}>LOG IN</button>
                        <button onClick={this.doctorsSignUpButton}>SIGN UP</button>
                    </form>
                </div>
            </div>
        );
    }

    userSignUpButton(event) {
        event.preventDefault();
        this.props.history.push('/usersSignUp');
    }

    doctorsSignUpButton(event) {
        event.preventDefault();
        this.props.history.push('/doctorsSignUp');
    }

    userLoginButton(event) {
        event.preventDefault();
        let email = document.getElementById('f1_email').value.trim();
        let password = document.getElementById('f1_password').value.trim();

        let emptyError = 'This field cannot be empty';
        let doSubmit = true;

        if (email == '') {
            document.getElementById('f1_email_error').innerText = emptyError;
            doSubmit = false;
        }
        if (password == '') {
            document.getElementById('f1_password_error').innerText = emptyError;
            doSubmit = false;
        }

        if (doSubmit)
            document.getElementById('f1').submit();
    }

    doctorsLoginButton(event) {

    }
}

export default withRouter(LoginPage);