import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import '../stylesheets/userssignup.css';

class UsersSignup extends Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        switch (this.props.auth) {
            case null:
                return null;
            case false:
                return (
                    <div id="users_signup">
                        <div id="user_signup_card">
                            <h1>
                                User Signup
                            </h1>

                            <form id="f4" method="POST" action="/usersSignup">
                                <span id="f4_error" className="error_span"/>
                                <input id="f4_name" name="name" type="text" placeholder="Full Name"/>
                                <input id="f4_email" name="email" type="email" placeholder="Email"/>
                                <input id="f4_phone" name="phone" type="tel" placeholder="Contact"/>
                                <input id="f4_city" name="city" type="text" placeholder="Enter city"/>
                                <input id="f4_password" name="password" type="password"
                                       placeholder="Choose a password"/>
                                <textarea id="f4_medical_condition" name="medicalCondition"
                                          placeholder="Please describe your medical condition in brief."/>
                                <button className="login_button" onClick={this.onSubmit}>SUBMIT</button>
                            </form>
                        </div>
                    </div>
                );
            default:
                return <Redirect to="/"/>;
        }
    }

    onSubmit(event) {
        event.preventDefault();
        let name = document.getElementById('f4_name').value.trim();
        let email = document.getElementById('f4_email').value.trim();
        let phone = document.getElementById('f4_phone').value.trim();
        let city = document.getElementById('f4_city').value.trim();
        let medicalCondition = document.getElementById('f4_medical_condition').value.trim();

        if (!name || !email || !phone || !city || !medicalCondition)
            document.getElementById('f4_error').innerText = 'Some of the fields are empty!!';
        else
            document.getElementById('f4').submit();
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(UsersSignup);